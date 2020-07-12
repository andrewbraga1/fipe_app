import React,{ useEffect } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    TextInput,
    Platform,
      KeyboardAvoidingView,
    } from 'react-native';
import{ Feather as Icon } from '@expo/vector-icons';
import  { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Dropdown from '../../components/Dropdown';
import Constants from 'expo-constants';

const Records = () =>{

    let inputRefs = {
        firstTextInput: '',
        favSport0: '',
        favSport1: '',
        lastTextInput: '',
        favSport5: '',
      };

    const vehicles = [
        {
          label: 'Moto',
          value: 'motos',
          key: 'motos',
        },
        {
          label: 'Carro',
          value: 'carros',
          key: 'carros',
        },
        {
          label: 'Caminhão',
          value: 'caminhoes',
          key: 'caminhoes',
        },
      ];
    const navigation = useNavigation();
    
    useEffect(()=>{
     // chamada
    },[]);

    const handleNavigateBack = () =>{
        navigation.goBack();
    }

            
    return (
        <>
        
        <View style={styles.container} >
            <TouchableOpacity onPress={handleNavigateBack}>
                <Icon name="arrow-left" color="#34cb79" size={20}/>
            </TouchableOpacity>
                
            <Text style={styles.title}>
                Bem vindo.
            </Text>
            <Text style={styles.description}>
                Cadastre um novo veículo.
            </Text>

            <View style={styles.itemsContainer}>
                <Text style={styles.description_item}>
                    Tipo de veículo
                </Text>
                <Dropdown itemsList = {vehicles} />
            </View>
            <View style={styles.itemsContainer}>
                <Text style={styles.description_item}>
                Marca
                </Text>
                <Dropdown itemsList = {vehicles} />
            </View>
            <View style={styles.itemsContainer}>
                <Text style={styles.description_item}>
                Modelo
                </Text>
                <Dropdown itemsList = {vehicles} />
            </View>
            <View style={styles.itemsContainer}>
                <Text style={styles.description_item}>
                    Ano
                </Text>
                <Dropdown itemsList = {vehicles} />
            </View>
            <View style={styles.itemsContainer}>
                <Text style={styles.description_item}>
                    Placa
                </Text>
                <TextInput
                    ref={el => {
                    inputRefs.firstTextInput = String(el);
                    }}
                    placeholder='XXX-0000'
                    returnKeyType="next"
                    enablesReturnKeyAutomatically
                    onSubmitEditing={() => {
                    inputRefs.favSport0;
                    }}
                    style={
                    Platform.OS === 'ios'
                        ? styles.inputIOS
                        : styles.inputAndroid
                    }
                    blurOnSubmit={false}
                />
            </View>
            
        </View>
                
            
     
      </>
    )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    title: {
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      fontFamily: 'Roboto_400Regular',
    },
    description_item: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      marginBottom: 6,
      fontFamily: 'Roboto_400Regular',
    }, 
    itemsContainer: {
      marginTop: 8,
      marginBottom: 8,
      
    },
    
        inputIOS: {
          height: 60,
          fontSize: 16,
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: '#6C6C80',
          borderRadius: 4,
          color: 'black',
          paddingRight: 30, // to ensure the text is never behind the icon
        },
        inputAndroid: {
          height: 60,
          fontSize: 16,
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderWidth: 1.5,
          borderColor: '#6C6C80',
          borderRadius: 8,
          color: '#6C6C80',
          paddingRight: 30, // to ensure the text is never behind the icon
        },
   
  });

export default Records;