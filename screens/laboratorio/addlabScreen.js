import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function AddLab() {
    const navigation = useNavigation(); // Correct usage of useNavigation
    const [nome, setNome] = useState('');
    const [enderecoIp, setEnderecoIp] = useState('');

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'No token found');
                return;
            }

            const response = await fetch('https://e535-2804-28c8-51f-f790-dd38-8be0-fdd7-4497.ngrok-free.app/espaco/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nome: nome,
                    EnderecoIp: enderecoIp,
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Laboratório adicionado com sucesso');
                // Navegar para outra tela ou fazer outra ação
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Erro ao adicionar laboratório');
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
                        addLab
                    </Text>
                </View>

                {/* Formulário */}
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 20 }}
                        placeholder="Nome do laboratório"
                        value={nome}
                        onChangeText={setNome}
                    />
                    <TextInput
                        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 20 }}
                        placeholder="Endereço IP"
                        value={enderecoIp}
                        onChangeText={setEnderecoIp}
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
