import React,{ useEffect, useState } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    TextInput,
    Platform,
      KeyboardAvoidingView,
      NativeSyntheticEvent,
      TextInputChangeEventData,
      
    } from 'react-native';
import{ Feather as Icon } from '@expo/vector-icons';
import  { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Dropdown from '../../components/Dropdown';
import Constants from 'expo-constants';
import { TextInputMask } from 'react-native-masked-text';
import { RectButton } from 'react-native-gesture-handler';
import CameraC from '../../components/CameraC';

interface Item  {
  label: string,
  value: any,
  key: any,
}

interface VehicleData  {
  name: string,
  fipe_name: string,
  order: number,
  key: string,
  id: number
}

interface Data {
  type:string,
  brand:string,
  model:string,
  year:string,
  plate:string
}


const Records = () =>{

  const vehicles:Item[] = [
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

  const [selectedVehicleType, setVehicleType] = useState<string>();
  const [brands, setBrands] = useState<Item[]>([]);
  const [models, setModels] = useState<Item[]>([]);
  const [years, setYears] = useState<Item[]>([]);
  const [selectedBrand, setBrand] = useState<string>();
  const [selectedModel, setModel] = useState<string>();
  const [selectedYear, setYear] = useState<string>();
  const [plate, setPlate] = useState<string>();
  const [ step2, setStep2 ] = useState<boolean>(false);
  const navigation = useNavigation();
  
  const handleNavigateBack = () =>{
    navigation.goBack();
  }
  // vehicles type
  const handleSelectVehicleType = (value: string) => {
    setVehicleType(value);
  };

  useEffect(()=>{
    if(!selectedVehicleType) return ;
    api.get(`${selectedVehicleType}/marcas.json`).then((response)=>{
      let arr_brands:Item[] = []
      response.data.map(
        (item_response : VehicleData) =>(arr_brands.push(
          {
            label:item_response.name,
            value: item_response.id,
            key: item_response.key,
          } as Item))) 
      setBrands(arr_brands);
    });
  },[selectedVehicleType]);


  //brands
  const handleSelectBrand = (brand: string) => {
    //console.log(brand);
    
    setBrand(brand);
  };

  useEffect(()=>{
    if(!selectedBrand) return ;
    api.get(`${selectedVehicleType}/veiculos/${selectedBrand}.json`).then((response)=>{
     
        let arr_models:Item[] = []
        response.data.map(
          (item_response : VehicleData) =>(arr_models.push(
            {
              label:item_response.name,
              value: item_response.id,
              key: item_response.key,
            } as Item))) 
        setModels(arr_models);
      });
    },[selectedBrand]);
  
  // models
  const handleSelectModel = (model: string) => {
    //console.log(model);
    
    setModel(model);
  };
  
  
  useEffect(()=>{
    
    if(!selectedModel) return ;
    api.get(`${selectedVehicleType}/veiculo/${selectedBrand}/${selectedModel}.json` ).then((response)=>{
     
      let arr_years:Item[] = []
      response.data.map(
        (item_response : VehicleData) =>(arr_years.push(
          {
            label:item_response.name,
            value: item_response.id,
            key: item_response.key,
          } as Item))) 
      setYears(arr_years);
       });
    },[selectedModel]);       
  
    // year & fuel type 
  const handleSelectYear = (year: string) => {
    //console.log(year);
    
    setYear(String(year));
  };
 

  if(step2 === false){return (
      <>
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView>
          <View style={styles.container} >
            <View style={{flexDirection:"row"}}> 
              <TouchableOpacity style={{marginRight:8}} onPress={handleNavigateBack}>
                  <Icon name="arrow-left" color="#34cb79" size={20}/>
              </TouchableOpacity>
                  
              
              <Text style={styles.title}>
                  Cadastrar um novo veículo
              </Text>
            </View>  
              
              <View style={styles.itemsContainer}>
                  <Text style={styles.description_item}>
                      Tipo de veículo
                  </Text>
                  <Dropdown itemsList = {vehicles} item ={selectedVehicleType} onSelectItem={handleSelectVehicleType}/>
              </View>
              <View style={styles.itemsContainer}>
                  <Text style={styles.description_item}>
                  Marca
                  </Text>
                  <Dropdown itemsList = {brands} onSelectItem={handleSelectBrand} />
              </View>
              <View style={styles.itemsContainer}>
                  <Text style={styles.description_item}>
                  Modelo
                  </Text>
                  <Dropdown itemsList = {models} onSelectItem={handleSelectModel} />
              </View>
              <View style={styles.itemsContainer}>
                  <Text style={styles.description_item}>
                      Ano
                  </Text>
                  <Dropdown itemsList = {years} onSelectItem={handleSelectYear} />
              </View>
              <View style={styles.itemsContainer}>
                  <Text style={styles.description_item} >
                      Placa
                  </Text>
                  
                  <TextInputMask
                  type={'custom'}
                  options={{
                    mask: 'AAA-9999'
                  }}
                  placeholder="AAA-9999"
                  value={plate}
                  onChangeText={plate => {
                    setPlate(plate.toLocaleUpperCase())
                  }}
                  style={
                    Platform.OS === 'ios'
                        ? styles.inputIOS
                        : styles.inputAndroid
                    }
                />
              </View>
              { (selectedBrand && selectedModel && selectedYear && plate)
                  && ( 
                      <RectButton style={styles.button} onPress={()=>{setStep2(true)}}>
                        <Text style={styles.buttonText}>
                          Próxima etapa
                        </Text>
                        <View style={styles.buttonIcon}>
                          <Text>
                            <Icon name="arrow-right" color="#FFF" size={24} />
                          </Text>
                        </View>
                      </RectButton>
                  ) 
              }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>            
      </>
  )}
  else{
    return (<CameraC registerData={{
    type:selectedVehicleType,
    brand:selectedBrand,
    model:selectedModel,
    year:selectedYear,
    plate:plate
  } as Data} return={handleNavigateBack}/>)}            
    
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    title: {
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      //marginTop: 24,
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
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Records;