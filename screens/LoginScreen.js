import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeOut, FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.3.15:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    pass: senha
                })
            });
            const data = await response.json();
            // Verifica se a resposta foi bem-sucedida
            if (response.ok) {
                // Armazena o token no AsyncStorage
                await AsyncStorage.setItem('token', data.token);
                await AsyncStorage.setItem('id', String(data.id));
                // Verifica a role do usuário
                switch (data.role) {
                    case 'ALUNO':
                        navigation.navigate('HomeAluno');
                        break;
                    case 'ADMIN':
                        navigation.navigate('HomeAdm');
                        break;
                    case 'SERVIDOR':
                        navigation.navigate('HomeServer');
                        break;
                    default:
                        // Se a role não for reconhecida, você pode navegar para uma tela de erro ou fazer outra coisa
                        Alert.alert('Erro', 'Role não reconhecida');
                        break;
                }
            } else {
                // Se a resposta da API não for bem-sucedida, exibe uma mensagem de erro
                Alert.alert('Erro ao fazer login', data.message);
            }
        } catch (error) {
            // Se houver algum erro de rede ou outro erro, exibe uma mensagem de erro genérica
            console.error('Erro ao fazer login:', error);
            Alert.alert('Erro ao fazer login');
        }
    };

    return (
        <View className="bg-white h-full w-full">
            <StatusBar style="light" />
            <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />

            {/* lampada */}
            <View className="flex-row justify-around w-full absolute">
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-[225] w-[90]" source={require('../assets/images/light.png')} />
                <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} className="h-[160] w-[65]" source={require('../assets/images/light.png')} />
            </View>

            {/* titulo e form */}
            <View className="h-full w-full flex justify-around pb-10 pt-40">
                {/* titulo */}
                <View className="flex items-center">
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
                        Login
                    </Animated.Text>
                </View>

                {/* form */}
                <View className="flex items-center mx-4 space-y-4">
                    {/* login */}
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
                        <TextInput placeholder='Login' placeholderTextColor={'gray'} onChangeText={setLogin} />
                    </Animated.View>
                    {/* senha */}
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                        <TextInput placeholder='Senha' placeholderTextColor={'gray'} secureTextEntry onChangeText={setSenha} />
                    </Animated.View>
                    {/* Botão */}
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full">
                        <TouchableOpacity
                            onPress={handleLogin}
                            className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                            <Text className="text-xl font-bold text-white text-center">Login</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.duration(1000).delay(600).springify()} className="flex-row justify-center">
                        <Text>Não possui conta? </Text>
                        <TouchableOpacity onPress={() => navigation.push('SingUp')}>
                            <Text className="text-sky-600 underline">CADASTRE-SE</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>

        </View>
    )
}
