import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function EspacoLog({ navigation }) {
    const [labId, setLabId] = useState('');
    const [labs, setLabs] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchLabs();
    }, []);

    const fetchLabs = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('https://cc4b-2804-28c8-51f-f790-a945-8bc3-2a87-5032.ngrok-free.app/espaco/listAll', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setLabs(data);
        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('https://cc4b-2804-28c8-51f-f790-a945-8bc3-2a87-5032.ngrok-free.app/espacoLog/logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ espacoId: labId }),
            });
            const data = await response.json();
            setLogs(data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
        setLoading(false);
    };

    return (
        <View className="bg-white h-full w-full">
            <StatusBar style="auto" />

            {/* Título e Formulário */}
            <View className="h-full w-full flex justify-around pb-1 pt-60">
                {/* Título */}
                <View className="flex items-center mb-10">
                    <Text className="text-black font-bold tracking-wider text-5xl">
                        Log
                    </Text>
                </View>

                {/* Dropdown para selecionar o laboratório */}
                <View className="flex items-center mb-5">
                    <Picker
                        selectedValue={labId}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue) => setLabId(itemValue)}
                    >
                        <Picker.Item label="Selecione um laboratório" value="" />
                        {labs.map((lab) => (
                            <Picker.Item key={lab.id} label={lab.nome} value={lab.id} />
                        ))}
                    </Picker>
                </View>

                {/* Botão para buscar os logs */}
                <View className="flex items-center mb-5">
                    <TouchableOpacity
                        className="bg-blue-500 p-4 rounded"
                        onPress={fetchLogs}
                        disabled={loading || !labId}
                    >
                        <Text className="text-white text-lg">
                            {loading ? 'Carregando...' : 'Buscar Logs'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Lista de Logs */}
                <View className="flex-1 w-full">
                    <FlatList
                        data={logs}
                        keyExtractor={(item) => item.logId.toString()}
                        renderItem={({ item }) => (
                            <View className="border-b p-4">
                                <Text className="text-lg font-bold">{item.espaco}</Text>
                                <Text className="text-gray-600">Status: {item.statusLog}</Text>
                                <Text className="text-gray-600">Data e Hora: {item.dataHora}</Text>
                                <Text className="text-gray-600">Usuário: {item.nome} ({item.role})</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    );
}
