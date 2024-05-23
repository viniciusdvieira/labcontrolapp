import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeOut, FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function EditarAll() {

    const [nome, setNome] = useState('');
    const [Id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [acesso, setAcesso] = useState('');
    const [rg, setRg] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [servidores, setServidores] = useState([]);
    const [alunos, setAlunos] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        fetchUserLists();
    }, []);

    const fetchUserLists = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            // Fetching Admins
            const responseAdmins = await fetch('https://e535-2804-28c8-51f-f790-dd38-8be0-fdd7-4497.ngrok-free.app/usuario/listAdm', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (responseAdmins.ok) {
                const data = await responseAdmins.json();
                setUsers(data);
            } else {
                Alert.alert('Erro', 'Ocorreu um erro ao obter a lista de administradores.');
            }

            // Fetching Servidores
            const responseServidores = await fetch('https://e535-2804-28c8-51f-f790-dd38-8be0-fdd7-4497.ngrok-free.app/usuario/listServidor', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (responseServidores.ok) {
                const data = await responseServidores.json();
                setServidores(data);
            } else {
                Alert.alert('Erro', 'Ocorreu um erro ao obter a lista de servidores.');
            }

            // Fetching Alunos
            const responseAlunos = await fetch('https://e535-2804-28c8-51f-f790-dd38-8be0-fdd7-4497.ngrok-free.app/usuario/listAlunos', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (responseAlunos.ok) {
                const data = await responseAlunos.json();
                setAlunos(data);
            } else {
                Alert.alert('Erro', 'Ocorreu um erro ao obter a lista de alunos.');
            }
        } catch (error) {
            console.error('Erro ao obter listas de usuários:', error);
        }
    };

    const handleEditarPerfil = async () => {
        try {
            // Obter dados do usuário do AsyncStorage
            const token = await AsyncStorage.getItem('token');

            // Construir o objeto de dados para a solicitação PUT
            const userData = {
                id: Id,
                login: usuario,
                pass: senha,
                pessoa: {
                    id: selectedUser, // Usando o ID do usuário selecionado
                    nome: nome,
                    email: email,
                    telefone: telefone,
                    acesso: acesso,
                    cpf: cpf, // Atualize com o CPF do usuário, se disponível
                    rg: rg // Atualize com o RG do usuário, se disponível
                }
            };

            // Fazer a solicitação PUT para a API
            const response = await fetch('https://e535-2804-28c8-51f-f790-dd38-8be0-fdd7-4497.ngrok-free.app/usuario/atualizar/all', {
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

    const handleUserSelect = (userId, userType) => {
        let selectedUserData;
        switch (userType) {
            case 'admin':
                selectedUserData = users.find(user => user.id === userId);
                break;
            case 'servidor':
                selectedUserData = servidores.find(servidor => servidor.id === userId);
                break;
            case 'aluno':
                selectedUserData = alunos.find(aluno => aluno.id === userId);
                break;
            default:
                break;
        }
        if (selectedUserData) {
            setId(selectedUserData.id.toString());
            setNome(selectedUserData.pessoa.nome);
            setEmail(selectedUserData.pessoa.email);
            setTelefone(selectedUserData.pessoa.telefone);
            setUsuario(selectedUserData.login);
        }
        setSelectedUser(userId);
    };

    return (
        <View className="bg-white h-full w-full">
            <View className="h-full w-full flex justify-around pb-1 pt-10">
                <View className="flex items-center mx-4 space-y-4 mt-40 mb-5">
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-2 rounded-2xl w-full">
                        <TextInput placeholder='Nome completo *' placeholderTextColor={'gray'} onChangeText={setNome} value={nome} />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-2 rounded-2xl w-full">
                        <TextInput placeholder='Email' placeholderTextColor={'gray'} onChangeText={setEmail} value={email} />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-2 rounded-2xl w-full">
                        <TextInput 
                            placeholder='Telefone' 
                            placeholderTextColor={'gray'} 
                            onChangeText={setTelefone}
                            keyboardType='numeric' 
                            value={telefone} 
                        />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-2 rounded-2xl w-full">
                        <TextInput placeholder='Usuário' placeholderTextColor={'gray'} onChangeText={setUsuario} value={usuario} />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-2 rounded-2xl w-full mb-0">
                        <TextInput placeholder='Senha' placeholderTextColor={'gray'} secureTextEntry onChangeText={setSenha} />
                    </Animated.View>
                    <View className="w-full ">
                        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full">
                            {/* Dropdown para Administradores */}
                            <Picker
                                selectedValue={selectedUser}
                                style={{ height: 50, width: '100%', backgroundColor: 'rgba(0,0,0,0.1)', marginBottom: 10 }}
                                onValueChange={(itemValue, itemIndex) => handleUserSelect(itemValue, 'admin')}
                            >
                                <Picker.Item label="Selecione um administrador" value={null} />
                                {users.map(user => (
                                    <Picker.Item key={user.id} label={`${user.login}`} value={user.id} />
                                ))}
                            </Picker>
                            {/* Dropdown para Servidores */}
                            <Picker
                                selectedValue={selectedUser}
                                style={{ height: 50, width: '100%', backgroundColor: 'rgba(0,0,0,0.1)', marginBottom: 10 }}
                                onValueChange={(itemValue, itemIndex) => handleUserSelect(itemValue, 'servidor')}
                            >
                                <Picker.Item label="Selecione um servidor" value={null} />
                                {servidores.map(servidor => (
                                    <Picker.Item key={servidor.id} label={`${servidor.login}`} value={servidor.id} />
                                ))}
                            </Picker>
                            {/* Dropdown para Alunos */}
                            <Picker
                                selectedValue={selectedUser}
                                style={{ height: 50, width: '100%', backgroundColor: 'rgba(0,0,0,0.1)', marginBottom: 10 }}
                                onValueChange={(itemValue, itemIndex) => handleUserSelect(itemValue, 'aluno')}
                            >
                                <Picker.Item label="Selecione um aluno" value={null} />
                                {alunos.map(aluno => (
                                    <Picker.Item key={aluno.id} label={`${aluno.login}`} value={aluno.id} />
                                ))}
                            </Picker>
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