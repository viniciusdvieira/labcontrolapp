import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

export default function CadastroDigital() {
    const navigation = useNavigation(); // Correct usage of useNavigation
    const [pessoaId, setPessoaId] = useState('');
    const [servidorId, setServidorId] = useState('');
    const [labId, setLabId] = useState('');
    const [laboratorios, setLaboratorios] = useState([]);
    const [pessoas, setPessoas] = useState([]);
    const [servidores, setServidores] = useState([]);
    const [loadingLabs, setLoadingLabs] = useState(true);
    const [loadingPessoas, setLoadingPessoas] = useState(true);
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

                const response = await fetch('http://18.206.68.106:8080/espaco/listAll', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                const labs = data.map(lab => ({
                    label: lab.nome,
                    value: lab.endercoIp,
                    id: lab.id,
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

                const response = await fetch('http://18.206.68.106:8080/usuario/listAlunos', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                const pessoasList = data.map(pessoa => ({
                    label: pessoa.login,
                    value: pessoa.id,
                }));
                setPessoas(pessoasList);
                setLoadingPessoas(false);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch pessoas');
                setLoadingPessoas(false);
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

                const response = await fetch('http://18.206.68.106:8080/usuario/listServidor', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                const servidoresList = data.map(servidor => ({
                    label: servidor.login,
                    value: servidor.id,
                }));
                setServidores(servidoresList);
                setLoadingServidores(false);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch servidores');
                setLoadingServidores(false);
            }
        };

        fetchLaboratorios();
        fetchPessoas();
        fetchServidores();
    }, []);

    const handlePessoaChange = value => {
        setPessoaId(value);
        if (value) {
            setServidorId('');
        }
    };

    const handleServidorChange = value => {
        setServidorId(value);
        if (value) {
            setPessoaId('');
        }
    };

    const handleSubmit = async () => {
        if (!labId || (!pessoaId && !servidorId)) {
            Alert.alert('Error', 'Please select a lab and at least one pessoa or servidor');
            return;
        }

        const url = `http://${labId}/CadastroDigital/PessoaId${pessoaId || servidorId}`;
        console.log('Formatted URL:', url);

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'No token found');
                return;
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
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
                    {loadingLabs || loadingPessoas || loadingServidores ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <>
                            <RNPickerSelect
                                placeholder={{ label: "Selecione um laboratório", value: null }}
                                items={laboratorios}
                                onValueChange={value => setLabId(value)}
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
                                onValueChange={handlePessoaChange}
                                value={pessoaId}
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
                                onValueChange={handleServidorChange}
                                value={servidorId}
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
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
}
