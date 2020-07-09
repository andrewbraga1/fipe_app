import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    SafeAreaView } from 'react-native';

import{ Feather as Icon } from '@expo/vector-icons';
import  { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';



const Stored = () =>{
    const navigation = useNavigation();
   


    useEffect(()=>{
       
    },[]);


    const handleNavigateBack = () =>{
        navigation.goBack();
    }

   
    return (
      <SafeAreaView style={{ flex:1 }}>
        <View >
            <TouchableOpacity onPress={handleNavigateBack}>
                <Icon name="arrow-left" color="#34cb79" size={20}/>
            </TouchableOpacity>

            
            
            <Text > Estrutura stored </Text>
           
        </View>
        
      </SafeAreaView>   
    )
}
export default Stored;

