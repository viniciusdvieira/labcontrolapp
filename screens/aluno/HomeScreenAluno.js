import { View, Text, Image,TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated,{ FadeIn, FadeOut, FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';




export default function HomeAluno(navigation){

    return (
        <View className="bg-white h-full w-full">

            {/* titulo e form */}
            <View className="h-full w-full flex justify-around pb-1 pt-60">
                {/* titulo */}
                <View className="flex items-center">
                    <Text className="text-black font-bold tracking-wider text-5xl">
                        Home page
                    </Text>
                </View>
            </View>

        </View>
    )
}