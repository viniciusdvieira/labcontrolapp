import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function CadastroAdm() {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [role, setRole] = useState('');

    const formatarTelefone = (value) => {
        const numTelefone = value.replace(/\D/g, '');
        setTelefone(numTelefone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4'));
    };

    const handleSignupAdm = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('https://cc4b-2804-28c8-51f-f790-a945-8bc3-2a87-5032.ngrok-free.app/auth/registro/all', {
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
                        cpf: cpf
                    },
                    role: parseInt(role)
                })
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Cadastro realizado com sucesso!');
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

            {/* Título e formulário */}
            <View className="h-full w-full flex justify-around pb-1 pt-60">
                {/* Título */}
                <View className="flex items-center">
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
                        Cadastro Adm
                    </Animated.Text>
                </View>

                {/* Formulário */}
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
                        <TextInput placeholder='CPF' placeholderTextColor={'gray'} onChangeText={setCpf} />
                    </Animated.View>
                    {/* Usuário */}
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-2 rounded-2xl w-full">
                        <TextInput placeholder='Usuário' placeholderTextColor={'gray'} onChangeText={setUsuario} />
                    </Animated.View>
                    {/* Senha */}
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-2 rounded-2xl w-full mb-0">
                        <TextInput placeholder='Senha' placeholderTextColor={'gray'} secureTextEntry onChangeText={setSenha} />
                    </Animated.View>
                    {/* Role */}
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-2 rounded-2xl w-full mb-0">
                        <Picker
                            selectedValue={role}
                            onValueChange={(itemValue) => setRole(itemValue)}
                            style={{ color: 'gray' }}
                        >
                            <Picker.Item label="Selecione o role" value="" />
                            <Picker.Item label="Adm" value="1" />
                            <Picker.Item label="Server" value="2" />
                            <Picker.Item label="Aluno" value="3" />
                        </Picker>
                    </Animated.View>
                    {/* Botão */}
                    <View className="w-full ">
                        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full">
                            <TouchableOpacity
                                onPress={handleSignupAdm}
                                className="w-full bg-sky-400 p-1 rounded-2xl mb-20">
                                <Text className="text-xl font-bold text-white text-center">Sign Up</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </View>
        </View>
    );
}
