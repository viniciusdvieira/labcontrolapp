import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeOut, FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroAdm() {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');





    const formatarTelefone = (value) => {
        const numTelefone = value.replace(/\D/g, '');
        setTelefone(numTelefone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4'));
    };
    

    const handleSignupAdm = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('http://18.206.68.106:8080/auth/registro/adm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    login: usuario,
                    pass: senha,
                    pessoa: {
                        nome: nome,
                        email: email,
                        telefone: telefone,
                    }
                })
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Cadastro realizado com sucesso!');
            } else {
                Alert.alert('Erro ao fazer cadastro aqui1', data.message);
            }
        } catch (error) {
            console.error('Erro ao fazer cadastro: aqui3', error);
            Alert.alert('Erro ao fazer cadastro aqui2');
        }
    };

    return (
        <View className="bg-white h-full w-full">
            <StatusBar style="light" />
            

            {/* lampada */}
            

            {/* titulo e form */}
            <View className="h-full w-full flex justify-around pb-1 pt-60">
                {/* titulo */}
                <View className="flex items-center">
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
                        Cadastro Adm
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
                                onPress={handleSignupAdm}
                                className="w-full bg-sky-400 p-1 rounded-2xl mb-2">
                                <Text className="text-xl font-bold text-white text-center">SingUp</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </View>

        </View>
    )
}
