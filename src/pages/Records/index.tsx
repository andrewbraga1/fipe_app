import React,{ useEffect } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    } from 'react-native';
import{ Feather as Icon } from '@expo/vector-icons';
import  { useNavigation } from '@react-navigation/native';
import api from '../../services/api';



const Records = () =>{
    const navigation = useNavigation();
    
    useEffect(()=>{
     // chamada
    },[]);

    const handleNavigateBack = () =>{
        navigation.goBack();
    }

    
    return (
      <>
        <View >
            <TouchableOpacity onPress={handleNavigateBack}>
                <Icon name="arrow-left" color="#34cb79" size={20}/>
            </TouchableOpacity>
                
            <Text > Estrutura records </Text>
           
            
        </View>
      </>
    )
}


export default Records;