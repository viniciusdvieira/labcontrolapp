import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeOut, FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function SingupScreen() {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');


    /*const formatarCpf = (value) => {    
        const numCpf = value.replace(/\D/g, '');
        setCpf(numCpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'));
    };*/


    const formatarTelefone = (value) => {
        const numTelefone = value.replace(/\D/g, '');
        setTelefone(numTelefone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4'));
    };


    const handleSignup = async () => {
        try {
            const response = await fetch('https://4d1e-2804-28c8-51f-f790-a945-8bc3-2a87-5032.ngrok-free.app/auth/registro/aluno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: usuario,
                    pass: senha,
                    pessoa: {
                        nome: nome,
                        email: email,
                        telefone: telefone
                    }
                })
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Cadastro realizado com sucesso!');
                navigation.navigate('Login'); // Navegar de volta para a tela de login após o cadastro
            } else {
                Alert.alert('Erro ao fazer cadastro', data.message);
            }
        } catch (error) {
            console.error('Erro ao fazer cadastro:', error);
            Alert.alert('Erro ao fazer cadastro');
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
            <View className="h-full w-full flex justify-around pb-1 pt-60">
                {/* titulo */}
                <View className="flex items-center">
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
                        Sing Up
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
                            onChangeText={formatarTelefone} 
                            value={telefone} 
                            keyboardType='numeric' 
                        />
                    </Animated.View>
                    {/* CPF */}
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-2 rounded-2xl w-full">
                        <TextInput 
                            placeholder='CPF' 
                            placeholderTextColor={'gray'} 
                           /* onChangeText={formatarCpf} 
                            value={cpf} */
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
                                onPress={handleSignup}
                                className="w-full bg-sky-400 p-1 rounded-2xl mb-2">
                                <Text className="text-xl font-bold text-white text-center">SingUp</Text>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View entering={FadeInDown.duration(1000).delay(600).springify()} className="flex-row justify-center">
                            <Text>Já possui conta? </Text>
                            <TouchableOpacity onPress={() => navigation.push('Login')}>
                                <Text className="text-sky-600 underline">Login</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </View>

        </View>
    )
}
