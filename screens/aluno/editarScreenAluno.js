import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeOut, FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarAluno() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [acesso, setAcesso] = useState('');
    const [rg, setRg] = useState('');

    const navigation = useNavigation();

    const handleEditarPerfil = async () => {
        try {
            // Obter dados do usuário do AsyncStorage
            const userId = await AsyncStorage.getItem('id');
            const token = await AsyncStorage.getItem('token');

            // Construir o objeto de dados para a solicitação PUT
            const userData = {
                id: userId,
                login: usuario,
                pass: senha,
                pessoa: {
                    id: userId,
                    nome: nome,
                    email: email,
                    telefone: telefone,
                    acesso: acesso,
                    cpf: cpf, // Atualize com o CPF do usuário, se disponível
                    rg: rg // Atualize com o RG do usuário, se disponível
                }
            };

            // Fazer a solicitação PUT para a API
            const response = await fetch('http://192.168.3.15:8080/usuario/atualizar/aluno', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            // Verificar se a solicitação foi bem-sucedida
            if (response.ok) {
                // Exibir mensagem de sucesso
                Alert.alert('Sucesso', 'Perfil editado com sucesso!');
                // Navegar de volta para a tela anterior ou para onde desejar
                navigation.goBack();
            } else {
                // Se houver erro na solicitação, exibir mensagem de erro
                Alert.alert('Erro', 'Ocorreu um erro ao editar o perfil. Por favor, tente novamente mais tarde.');
            }
        } catch (error) {
            console.error('Erro ao editar perfil:', error);
        }
    };
    
    return (
        <View className="bg-white h-full w-full">


            {/* titulo e form */}
            <View className="h-full w-full flex justify-around pb-1 pt-60">
                {/* titulo */}
                <View className="flex items-center">
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-black font-bold tracking-wider text-5xl">
                        editar perfil
                    </Animated.Text>
                </View>

                {/* form */}
                <View className="flex items-center mx-4 space-y-4 mt-40 mb-5">
                    {/* Nome */}
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-2 rounded-2xl w-full">
                        <TextInput placeholder='Nome completo *' placeholderTextColor={'gray'} onChangeText={setNome} />
                    </Animated.View>
                    {/* Email */}
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-2 rounded-2xl w-full">
                        <TextInput placeholder='Email' placeholderTextColor={'gray'} onChangeText={setEmail} />
                    </Animated.View>
                    {/* Telefone */}
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-2 rounded-2xl w-full">
                        <TextInput 
                            placeholder='Telefone' 
                            placeholderTextColor={'gray'} 
                            onChangeText={setTelefone}
                            keyboardType='numeric' 
                        />
                    </Animated.View>
                    {/* Usuário */}
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-2 rounded-2xl w-full">
                        <TextInput placeholder='Usuário' placeholderTextColor={'gray'} onChangeText={setUsuario} />
                    </Animated.View>
                    {/* Senha */}
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-2 rounded-2xl w-full mb-0">
                        <TextInput placeholder='Senha' placeholderTextColor={'gray'} secureTextEntry onChangeText={setSenha} />
                    </Animated.View>
                    {/* Botão */}
                    <View className="w-full ">
                        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full">
                            <TouchableOpacity
                                onPress={handleEditarPerfil}
                                className="w-full bg-sky-400 p-1 rounded-2xl mb-2">
                                <Text className="text-xl font-bold text-white text-center">confirmar</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </View>

        </View>
    )
}
