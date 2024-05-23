import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function HomeAluno() {
    const [labs, setLabs] = useState([]);
    const [expandedLab, setExpandedLab] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchLabs = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const userId = await AsyncStorage.getItem('id');
                if (!token || !userId) {
                    Alert.alert('Error', 'No token or user ID found');
                    return;
                }

                const response = await fetch(`https://e535-2804-28c8-51f-f790-dd38-8be0-fdd7-4497.ngrok-free.app/pessoa/listEspaco${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setLabs(data);
                } else {
                    const errorData = await response.json();
                    Alert.alert('Error', errorData.message || 'Erro ao carregar laboratórios');
                }
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        };

        fetchLabs();
    }, []);

    const handleExpand = (labId) => {
        if (expandedLab === labId) {
            setExpandedLab(null);
        } else {
            setExpandedLab(labId);
        }
    };

    return (
        <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
            <StatusBar style="auto" />
            <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 24 }}>Home Page</Text>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                {labs.map((lab) => (
                    <Animated.View
                        key={lab.id}
                        entering={FadeIn}
                        exiting={FadeOut}
                        style={{
                            backgroundColor: '#f0f0f0',
                            padding: 15,
                            marginBottom: 15,
                            borderRadius: 8,
                            borderColor: 'black',
                            borderWidth: 1,
                        }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{lab.nome}</Text>
                        <Text style={{ fontWeight: 'bold' }}>Responsável: <Text style={{ fontWeight: 'normal' }}>{lab.responsavel.nome}</Text></Text>
                        <Text style={{ fontWeight: 'bold' }}>Alunos:</Text>
                        {expandedLab === lab.id ? (
                            lab.pessoas.map((pessoa) => (
                                <Text key={pessoa.id} style={{ paddingLeft: 10 }}>- {pessoa.nome}</Text>
                            ))
                        ) : (
                            lab.pessoas.slice(0, 3).map((pessoa) => (
                                <Text key={pessoa.id} style={{ paddingLeft: 10 }}>- {pessoa.nome}</Text>
                            ))
                        )}
                        {lab.pessoas.length > 3 && (
                            <TouchableOpacity onPress={() => handleExpand(lab.id)}>
                                <Text style={{ color: 'blue', marginTop: 10 }}>{expandedLab === lab.id ? 'Ver menos' : 'Veja mais >'}</Text>
                            </TouchableOpacity>
                        )}
                    </Animated.View>
                ))}
            </View>
        </ScrollView>
    );
}
