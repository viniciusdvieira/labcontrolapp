import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function LabAdm() {
    const navigation = useNavigation(); // Correct usage of useNavigation
    const handleaddlab = () => {
        navigation.navigate('addlabScreen');
    };
    const handleaddpessoa = () => {
        navigation.navigate('addpessoaScreen');
    };
    const handleaddResponsavel = () => {
        navigation.navigate('addResponsavelScreen');
    };
    const handlecadastrodigital = () => {
        navigation.navigate('cadastrarDigitalScreen');
    };
    const handlelog = () => {
        navigation.navigate('EspacoLogScreen');
    };


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="auto" />

            <Animated.View
                style={{ flex: 1, justifyContent: 'space-around', paddingBottom: 4, paddingTop: 60 }}
                entering={FadeIn}
                exiting={FadeOut}
            >


                {/* Buttons */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity
                        style={{ borderWidth: 1, borderColor: 'black', padding: 10, width: 150, alignItems: 'center' }}
                        onPress={handleaddpessoa}
                    >
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>Adicionar pessoa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ borderWidth: 1, borderColor: 'black', padding: 10, width: 150, alignItems: 'center' }}
                        onPress={handleaddlab}
                    >
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>Adicionar laboratorio</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity
                        style={{ borderWidth: 1, borderColor: 'black', padding: 10, width: 150, alignItems: 'center' }}
                        onPress={handlecadastrodigital}
                    >
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>Cadastrar digital</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ borderWidth: 1, borderColor: 'black', padding: 10, width: 150, alignItems: 'center' }}
                        onPress={handleaddResponsavel}
                    >
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>Cadastrar Responsavel</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ borderWidth: 1, borderColor: 'black', padding: 10, width: 300, alignItems: 'center', marginBottom: 50 }}
                        onPress={handlelog}
                    >
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>Log</Text>
                    </TouchableOpacity>
                </View>

            </Animated.View>
        </View>
    );
}
