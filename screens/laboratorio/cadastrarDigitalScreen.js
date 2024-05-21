import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function CadastroDigital() {
    const navigation = useNavigation(); // Correct usage of useNavigation
    const [pessoaId, setPessoaId] = useState('');
    const [digitalId, setDigitalId] = useState('');
    const [labId, setLabId] = useState('');

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'No token found');
                return;
            }

            const response = await fetch('http://192.168.3.15:8080/pessoa/cadastrarDigital', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    pessoaId: parseInt(pessoaId),
                    digitalId: parseInt(digitalId),
                    labId: parseInt(labId),
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Digital cadastrada com sucesso');
                // Navegar para outra tela ou fazer outra ação
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Erro ao cadastrar digital');
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
                        cadastrodigital
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
                        placeholder="Digital ID"
                        keyboardType="numeric"
                        value={digitalId}
                        onChangeText={setDigitalId}
                    />
                    <TextInput
                        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 20 }}
                        placeholder="Lab ID"
                        keyboardType="numeric"
                        value={labId}
                        onChangeText={setLabId}
                    />
                </View>

                {/* Botão de Envio */}
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ borderWidth: 1, borderColor: 'black', padding: 10, width: 150, alignItems: 'center' }}
                        onPress={handleSubmit}
                    >
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
}
