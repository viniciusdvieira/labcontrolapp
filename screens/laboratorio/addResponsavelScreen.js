import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function AddResponsavelLab() {
    const navigation = useNavigation(); // Correct usage of useNavigation
    const [pessoaId, setPessoaId] = useState('');
    const [espacoId, setEspacoId] = useState('');

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'No token found');
                return;
            }

            const response = await fetch('http://192.168.3.15:8080/espaco/adicionarResponsavel', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    pessoaId: parseInt(pessoaId),
                    espacoId: parseInt(espacoId),
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Responsável adicionado com sucesso');
                // Navegar para outra tela ou fazer outra ação
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.erro || 'Erro ao adicionar responsável');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="auto" />

            <Animated.View
                style={{ flex: 1, justifyContent: 'space-around', paddingBottom: 4, paddingTop: 60 }}
                entering={FadeIn}
                exiting={FadeOut}
            >
                {/* Título */}
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', letterSpacing: 2, fontSize: 24 }}>
                        addresponsavellab
                    </Text>
                </View>

                {/* Formulário */}
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 20 }}
                        placeholder="Pessoa ID"
                        keyboardType="numeric"
                        value={pessoaId}
                        onChangeText={setPessoaId}
                    />
                    <TextInput
                        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 20 }}
                        placeholder="Espaço ID"
                        keyboardType="numeric"
                        value={espacoId}
                        onChangeText={setEspacoId}
                    />
                </View>

                {/* Botão de Envio */}
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ borderWidth: 1, borderColor: 'black', padding: 10, width: 150, alignItems: 'center' }}
                        onPress={handleSubmit}
                    >
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
}
