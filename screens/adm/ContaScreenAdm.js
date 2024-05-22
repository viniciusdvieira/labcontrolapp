import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Button  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ContaAdm({ navigation }) {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const userId = await AsyncStorage.getItem('id');
                const token = await AsyncStorage.getItem('token');

                if (userId && token) {
                    const response = await fetch(`http://18.206.68.106:8080/usuario/get${userId}`, {
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
        navigation.navigate('editarScreenAdm');
    };
    const handleEditAllProfile = () => {
        navigation.navigate('editarAllScreenAdm');
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
                    <TouchableOpacity onPress={handleEditProfile}>
                        <Text style={{ color: 'blue', marginTop: 10 }}>Editar Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleEditAllProfile}>
                        <Text style={{ color: 'blue', marginTop: 10 }}>Editar Todos Perfis</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
