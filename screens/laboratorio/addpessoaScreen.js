import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

export default function AddPessoaLab() {
    const navigation = useNavigation();
    const [pessoaId, setPessoaId] = useState('');
    const [espacoId, setEspacoId] = useState('');
    const [laboratorios, setLaboratorios] = useState([]);
    const [pessoas, setPessoas] = useState([]);
    const [loadingLabs, setLoadingLabs] = useState(true);
    const [loadingPessoas, setLoadingPessoas] = useState(true);

    useEffect(() => {
        const fetchLaboratorios = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert('Error', 'No token found');
                    setLoadingLabs(false);
                    return;
                }

                const response = await fetch('https://e535-2804-28c8-51f-f790-dd38-8be0-fdd7-4497.ngrok-free.app/espaco/listAll', {
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

        const fetchPessoas = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert('Error', 'No token found');
                    setLoadingPessoas(false);
                    return;
                }

                const response = await fetch('https://e535-2804-28c8-51f-f790-dd38-8be0-fdd7-4497.ngrok-free.app/usuario/listAlunos', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                const pessoasList = data.map(pessoa => ({
                    label: pessoa.login,
                    value: pessoa.pessoa.id,
                }));
                setPessoas(pessoasList);
                setLoadingPessoas(false);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch pessoas');
                setLoadingPessoas(false);
            }
        };

        fetchLaboratorios();
        fetchPessoas();
    }, []);

    const handleSubmit = async () => {
        if (!espacoId || !pessoaId) {
            Alert.alert('Error', 'Please select a lab and a pessoa');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'No token found');
                return;
            }

            const response = await fetch('https://e535-2804-28c8-51f-f790-dd38-8be0-fdd7-4497.ngrok-free.app/espaco/adicionarPessoa', {
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
                Alert.alert('Success', 'Pessoa adicionada ao laboratório com sucesso');
                // Navegar para outra tela ou fazer outra ação
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Erro ao adicionar pessoa');
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
                        addpessoalab
                    </Text>
                </View>

                {/* Formulário */}
                <View style={{ paddingHorizontal: 20 }}>
                    {loadingLabs || loadingPessoas ? (
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
                                placeholder={{ label: "Selecione um aluno", value: null }}
                                items={pessoas}
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
