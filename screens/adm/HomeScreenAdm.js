import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// token com problema arrumar depois
export default function HomeAdm() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Bem-vindo à página do Administrador</Text>
            <TouchableOpacity onPress={() => navigation.push('CadastroAdm')} style={{ backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>cadastrar ADM</Text>
            </TouchableOpacity>


        </View>
        
    );
}
