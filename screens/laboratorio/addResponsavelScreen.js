import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

export default function AddResponsavelLab() {
    const navigation = useNavigation();
    const [pessoaId, setPessoaId] = useState('');
    const [espacoId, setEspacoId] = useState('');
    const [laboratorios, setLaboratorios] = useState([]);
    const [servidores, setServidores] = useState([]);
    const [loadingLabs, setLoadingLabs] = useState(true);
    const [loadingServidores, setLoadingServidores] = useState(true);

    useEffect(() => {
        const fetchLaboratorios = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert('Error', 'No token found');
                    setLoadingLabs(false);
                    return;
                }

                const response = await fetch('https://cc4b-2804-28c8-51f-f790-a945-8bc3-2a87-5032.ngrok-free.app/espaco/listAll', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                const labs = data.map(lab => ({
                    label: lab.nome,
                    value: lab.id,
                }));
                setLaboratorios(labs);
                setLoadingLabs(false);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch laboratorios');
                setLoadingLabs(false);
            }
        };

        const fetchServidores = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert('Error', 'No token found');
                    setLoadingServidores(false);
                    return;
                }

                const response = await fetch('https://cc4b-2804-28c8-51f-f790-a945-8bc3-2a87-5032.ngrok-free.app/usuario/listServidor', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                const servidoresList = data.map(servidor => ({
                    label: servidor.login,
                    value: servidor.pessoa.id,
                }));
                setServidores(servidoresList);
                setLoadingServidores(false);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch servidores');
                setLoadingServidores(false);
            }
        };

        fetchLaboratorios();
        fetchServidores();
    }, []);

    const handleSubmit = async () => {
        if (!espacoId || !pessoaId) {
            Alert.alert('Error', 'Please select a lab and a servidor');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'No token found');
                return;
            }

            const response = await fetch('https://cc4b-2804-28c8-51f-f790-a945-8bc3-2a87-5032.ngrok-free.app/espaco/adicionarResponsavel', {
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
                    {loadingLabs || loadingServidores ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <>
                            <RNPickerSelect
                                placeholder={{ label: "Selecione um laboratório", value: null }}
                                items={laboratorios}
                                onValueChange={value => setEspacoId(value)}
                                style={{
                                    inputIOS: {
                                        borderColor: 'gray',
                                        borderWidth: 1,
                                        padding: 10,
                                        marginBottom: 20,
                                        backgroundColor: '#f0f0f0',
                                    },
                                    inputAndroid: {
                                        borderColor: 'gray',
                                        borderWidth: 1,
                                        padding: 10,
                                        marginBottom: 20,
                                        backgroundColor: '#f0f0f0',
                                    },
                                }}
                            />
                            <RNPickerSelect
                                placeholder={{ label: "Selecione um servidor", value: null }}
                                items={servidores}
                                onValueChange={value => setPessoaId(value)}
                                style={{
                                    inputIOS: {
                                        borderColor: 'gray',
                                        borderWidth: 1,
                                        padding: 10,
                                        marginBottom: 20,
                                        backgroundColor: '#f0f0f0',
                                    },
                                    inputAndroid: {
                                        borderColor: 'gray',
                                        borderWidth: 1,
                                        padding: 10,
                                        marginBottom: 20,
                                        backgroundColor: '#f0f0f0',
                                    },
                                }}
                            />
                        </>
                    )}
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
