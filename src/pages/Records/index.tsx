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
    Alert,
    Image,
    SafeAreaView ,
    AsyncStorage 
    } from 'react-native';
import{ Feather as Icon } from '@expo/vector-icons';
import  { useNavigation,useRoute } from '@react-navigation/native';
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

interface PhotoData{
  filename:string,
  uri:string,
}

interface Data {
  key: string,
  brand: string,
  model: string,
  photos: PhotoData[],
  plate: string,
  type: string,
  year: string,

}

interface Result{
  "ano_modelo": string,
  "combustivel": string,
  "fipe_codigo": string,
  "id": string,
  "key": string,
  "marca": string,
  "name":string,
  "preco": string,
  "referencia": string,
  "time": number,
  "veiculo": string,
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
  const [ step1, setStep1 ] = useState<boolean>(false);
  const [ step2, setStep2 ] = useState<boolean>(false);
  const [ resultApi, setResultApi ] = useState<Result>();
  const [ editReg, setEditReg ] = useState<Data>();
  const navigation = useNavigation();
  
  const route = useRoute();
  const routeParams = route.params as Data;
 
  
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
      setYear(String(year));
  };
  const handleStep1 = () => {
    setStep1(true)
  };

  const handleEdit = async (record: Data) => {
    
    Alert.alert(
      "",
      "Editar este registro ?",
      [
        {
          text: "Não",
          onPress: () => {console.log("Cancelado") },
          style: "cancel"
        },
        { text: "Sim", onPress:() => {setTimeout(()=>{
          try {
            // handleStep1();
            // setEditReg(record)
            Alert.alert('Não finalizado.');
          } catch (error) {
            console.log(error)
          }
        },1200)} }
      ],
      { cancelable: false }
    );
   
    
    
  };
  
  useEffect(()=>{
    
  },[step1]); 

  
  if( ((typeof routeParams.key !== 'undefined') && (step1 === false) && (typeof editReg?.key === 'undefined'))) {

    const handleDeleteAction = async (key: string) => {
      try {
        await AsyncStorage.removeItem(key).then(()=>{
            Alert.alert('Registro excluído com sucesso.')
            navigation.navigate('Home',{reload:true})
        })
  
      } catch (e) {
        alert('Erro ao salvar. Tente novamente mais tarde.')
      }
      
    };


    const handleDelete = (key: string) =>{
      Alert.alert(
        "",
        "Tem certeza que deseja excluir este registro ?",
        [
          {
            text: "Não",
            onPress: () => {console.log("Cancelado") },
            style: "cancel"
          },
          { text: "Sim", onPress:() => {handleDeleteAction(key)} }
        ],
        { cancelable: false }
      );
    }


    useEffect(()=>{
  
      if(!routeParams) return ;
      //http://fipeapi.appspot.com/api/1/carros/veiculo/21/4828/2013-1.json
      api.get(`${routeParams.type}/veiculo/${routeParams.brand}/${routeParams.model}/${routeParams.year}.json` ).then((response)=>{
        
        setResultApi(response.data)
            
        });
      },[]);    

    return (
      <SafeAreaView style={{ flex:1 }}>
        <View style={styles.container}>  
        <ScrollView 
                  
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 8 }} 
              >
          <View style={{flexDirection:"row"}}> 
                <TouchableOpacity style={{marginRight:8}} onPress={handleNavigateBack}>
                    <Icon name="arrow-left" color="#34cb79" size={20}/>
                </TouchableOpacity>
                    
                
                <Text style={styles.title}>
                    Detalhes
                </Text>
          </View>  
          <View style={styles.itemsContainer}>
              <ScrollView 
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ marginBottom:12, paddingHorizontal: 15 }} 
              >
                  {routeParams && routeParams.photos && routeParams.photos.map( item =>
                    <Image key={item.filename} source={{uri: item.uri}} style={{ width: 300, height: 230 }} />
                  )}
              </ScrollView>    
              
              
              
              <View style={{marginBottom:8}}>
                <Text style={{fontFamily: 'Ubuntu_700Bold',fontSize:16}}>Categoria</Text>
                <Text style={{fontSize:20, textTransform:"capitalize"}}>{routeParams?.type}</Text>
              </View>
              <View style={{marginBottom:8}}>
                <Text style={{fontFamily: 'Ubuntu_700Bold',fontSize:16}}>Marca</Text>
                <Text style={{fontSize:20}}>{resultApi?.marca}</Text>
              </View>
              <View style={{marginBottom:8}}>
                <Text style={{fontFamily: 'Ubuntu_700Bold',fontSize:16}}>Nome</Text>
                <Text style={{fontSize:20}}>{resultApi?.name}</Text>
              </View>

              <View style={{marginBottom:8}}>
                <Text style={{fontFamily: 'Ubuntu_700Bold',fontSize:16}}>Ano modelo</Text>
                <Text style={{fontSize:20}}> 
                { resultApi?.ano_modelo}
              </Text>
              </View>
              <View style={{marginBottom:8}}>
                <Text style={{fontFamily: 'Ubuntu_700Bold',fontSize:16}}>Combustível</Text>
                <Text style={{fontSize:20}}> 
                { resultApi?.combustivel}
              </Text>
              </View>
              
              <View style={{marginBottom:8}}>
                <Text style={{fontFamily: 'Ubuntu_700Bold',fontSize:16}}>Preço tabela FIPE</Text>
                <Text style={{fontSize:20}}>{resultApi?.preco}</Text>
              </View>
              <RectButton style={styles.button} onPress={()=>{handleEdit(routeParams)}}>
                <Text style={styles.buttonText}>
                  Editar
                </Text>
                <View style={styles.buttonIcon}>
                  <Text>
                    <Icon name="edit" color="#FFF" size={24} />
                  </Text>
                </View>
              </RectButton>
              <RectButton style={styles.button} onPress={()=>{handleDelete(routeParams.key)}}>
                <Text style={styles.buttonText}>
                  Excluir
                </Text>
                <View style={styles.buttonIcon}>
                  <Text>
                    <Icon name="trash" color="#FFF" size={24} />
                  </Text>
                </View>
              </RectButton>
          </View>
          </ScrollView>   
        </View>  
      </SafeAreaView>  
    )
  }
  
  if((step2 === false) || ( (step1 === true) && (typeof editReg?.key !== 'undefined')) ){return (
      <>
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView>
          <View style={styles.container} >
            <View style={{flexDirection:"row"}}> 
              <TouchableOpacity style={{marginRight:8}} onPress={handleNavigateBack}>
                  <Icon name="arrow-left" color="#34cb79" size={20}/>
              </TouchableOpacity>
                  
              
              <Text style={styles.title}>
                  {step1 === false ? 'Cadastrar um novo veículo': 'Editar Veículo'}
              </Text>
            </View>  
              
              <View style={styles.itemsContainer}>
                  <Text style={styles.description_item}>
                      Tipo de veículo
                  </Text>
                  <Dropdown itemsList = {vehicles} value={step1 ? editReg?.type : null} item ={selectedVehicleType} onSelectItem={handleSelectVehicleType}/>
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
    ,

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  }
  });

export default Records;