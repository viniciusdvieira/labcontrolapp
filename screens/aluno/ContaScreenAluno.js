import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Button  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ContaAluno({ navigation }) {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const userId = await AsyncStorage.getItem('id');
                const token = await AsyncStorage.getItem('token');

                if (userId && token) {
                    const response = await fetch(`https://e40f-2804-28c8-51f-f790-dd38-8be0-fdd7-4497.ngrok-free.app/usuario/get${userId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUserData(data.pessoa);
                    } else {
                        console.error('Erro ao buscar dados do usuário:', response.status);
                    }
                } else {
                    console.error('ID do usuário ou token não encontrados');
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleEditProfile = () => {
        navigation.navigate('editarScreenAluno');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View>
                    <Text>Nome: {userData ? userData.nome : 'Não disponível'}</Text>
                    <Text>Email: {userData ? userData.email : 'Não disponível'}</Text>
                    <Text>Telefone: {userData ? (userData.telefone || 'Não disponível') : 'Não disponível'}</Text>
                    <Text>acesso: {userData ? userData.acesso : 'Não disponível'}</Text>
                    <Text>cpf: {userData ? userData.cpf : 'Não disponível'}</Text>
                    <Text>rg: {userData ? userData.rg : 'Não disponível'}</Text>
                    <TouchableOpacity onPress={handleEditProfile}>
                        <Text style={{ color: 'blue', marginTop: 10 }}>Editar Perfil</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
