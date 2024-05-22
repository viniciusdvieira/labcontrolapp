import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://18.206.68.106:8080/auth/login', {
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
            if (response.ok) {
                await AsyncStorage.setItem('token', data.token);
                await AsyncStorage.setItem('id', String(data.id));
                Toast.show({
                    type: 'success',
                    text1: 'Login bem-sucedido',
                });
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
                        Toast.show({
                            type: 'error',
                            text1: 'Erro',
                            text2: 'Role não reconhecida',
                        });
                        break;
                }
            } else {
                // Display the error message from the API response
                const errorMessage = data.erro || 'Erro ao fazer login';
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao fazer login',
                    text2: errorMessage,
                });
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            Toast.show({
                type: 'error',
                text1: 'Erro ao fazer login',
                text2: 'Erro de rede ou outro erro.',
            });
        }
    };

    const toastConfig = {
        error: (props) => (
            <ErrorToast
                {...props}
                text1Style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                }}
                text2Style={{
                    fontSize: 14,
                }}
                style={{ borderLeftColor: 'red' }}
            />
        ),
        success: (props) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: 'green' }}
                text1Style={{
                    fontSize: 16,
                    fontWeight: 'bold'
                }}
                text2Style={{
                    fontSize: 14,
                }}
            />
        ),
    };

    return (
        <View className="bg-white h-full w-full">
            <StatusBar style="light" />
            <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />
            <View className="flex-row justify-around w-full absolute">
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-[225] w-[90]" source={require('../assets/images/light.png')} />
                <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} className="h-[160] w-[65]" source={require('../assets/images/light.png')} />
            </View>
            <View className="h-full w-full flex justify-around pb-10 pt-40">
                <View className="flex items-center">
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
                        Login
                    </Animated.Text>
                </View>
                <View className="flex items-center mx-4 space-y-4">
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
                        <TextInput placeholder='Login' placeholderTextColor={'gray'} onChangeText={setLogin} />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                        <TextInput placeholder='Senha' placeholderTextColor={'gray'} secureTextEntry onChangeText={setSenha} />
                    </Animated.View>
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
            <Toast config={toastConfig} position='bottom' />
        </View>
    );
}
