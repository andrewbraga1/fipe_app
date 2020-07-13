import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    AsyncStorage, 
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Platform,
    ScrollView,
    Image
    } from 'react-native';
import { SvgUri } from 'react-native-svg';
import{ Feather as Icon } from '@expo/vector-icons';
import  { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

interface PhotoData {
    filename:string,
    uri:string,
}

interface Stored {
    
    key: string,
    brand: string,
    model: string,
    photos: PhotoData[],
    plate: string,
    type: string,
    year: string,
      
}

const Stored = () =>{
    const navigation = useNavigation();
    const [ isLoading, setLoading ] = useState<boolean>(false);
    const [ show, setShow ] = useState<boolean>(false);
    const [ sources, setSources] = useState<string[]>([]);
    const [ source, setSource] = useState<string>('');
    const [ stored, setStored ] = useState<Stored>({} as Stored);
    const [ allStored, setAllStored ] = useState<Stored[]>([]);

    const route = useRoute();
    const routeParams = route.params as {reload:boolean};
    

    
    useEffect(()=>{
        handleReload();
    },[]);

    const handleReload = async () =>{
        load()
         
    }

    const handleSource = async (value: string) =>{
        setSource(value)
        
    }
    const handleSources = async (value: string) =>{
        let srcs:string[] = (sources)
        if (srcs.includes(value)) return ;
        else
        srcs.push(value)
        setSources(srcs)
         
    }
    const handleStored = async (value: Stored) =>{
        setStored(value)
         
    }
    const handleSetAllStored = async (value: Stored) =>{
        let stored:Stored[] = (allStored)
        
            if (stored.includes(value)) return ;
            else{
            stored.push(value)
            const seen = new Set();

            const filteredArr = allStored.filter(el => {
            const duplicate = seen.has(el.key);
            seen.add(el.key);
            return !duplicate;
            });
            
            setAllStored(filteredArr)
            }
                 
    }
        
    const handleNavigateBack = () =>{
        navigation.goBack();
    }

    
    
    const load = async () => {
        
        setLoading(true)
        try {
            let datas = await AsyncStorage.getAllKeys().then(res => {return res});
            
                if (datas !== null && (Array.isArray(datas) && datas.length > 0) ) {
                datas = datas.filter( item => typeof item !== 'undefined')
                datas.map( (item: string) =>{
                    
                    handleSource(item).then(()=>{
                        handleSources(item).then(()=>{
                            (sources).map( (_srcs: string) =>{
                                loadData(_srcs).then(()=>{
                                    setShow(true)
                                })
                            })
                        })
                    });
                    
                    
                })
              
                }
                  
              } catch (e) {
                alert('Falha ao carregar. Tente novamente mais tarde.')
              }
              setLoading(false)
          
        
        
    }
    const loadData = async (index:string) => {
        
        setLoading(true)
        
        if (!index) return;
        try {
            
            const info = await AsyncStorage.getItem(index).then((res)=>{return res});
            if (!info) return;
           
            let abc  = JSON.parse((info))
            let obj = {
    
                key: abc.key,
                brand: abc.brand,
                model: abc.model,
                photos: abc.photos,
                plate: abc.plate,
                type: abc.type,
                year: abc.year,
                  
            }
            setLoading(false)
            handleStored( obj as Stored).then(()=>{
                handleSetAllStored(obj).then(()=>{
                    
                })
            })
            
        } catch (e) {
            setLoading(false)
            alert('Falha ao carregar. Tente novamente mais tarde.')
            
        }
    }
   
    const handleSelectItem = (item: Stored) => {
        
        navigation.navigate('Records',item );
        
    };
   
    if ( isLoading === true  ) {
        //returning the loader view while data is loading
        return (
            <View style={{ flex: 1, marginTop: 300, }}>
            <ActivityIndicator />
            </View>
        )
    } else{ 
        if((allStored.length > 0) && (show === true)) {
            //returning the main view after data loaded successfully
            return (
                
                <SafeAreaView style={{ flex:1 }}>
                    <View style={styles.container}>
                        <View style={{flexDirection:"row"}}> 
                            <TouchableOpacity style={{marginRight:8}} onPress={handleNavigateBack}>
                                <Icon name="arrow-left" color="#34cb79" size={20}/>
                            </TouchableOpacity>
                            <Text style={{fontSize: 20,fontFamily: 'Ubuntu_700Bold'}} >
                                Lista de veículos
                            </Text>
                        </View>
                        <View style={styles.itemsContainer}>
                            <ScrollView 
                                
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingVertical: 10 }} 
                            >
                                {allStored.map( (item: Stored) =>
                                
                                <TouchableOpacity 
                                    key={String(item.key)} 
                                    style={styles.item}
                                    activeOpacity={0.6}
                                    onPress={()=>{handleSelectItem(item)}}>
                                   {item.photos[0].uri && 
                                   <Image source={{ uri: item.photos[0].uri }} style={{ width: 42, height: 42 }} />}
                                <View style={{marginLeft:30}}>
                                    <Text style={{fontSize:12,marginBottom:6}}>Placa</Text>
                                    <Text style={styles.itemTitle}>{item.plate}</Text>
                                </View>
                                <View style={{marginLeft:70}}>
                                    <Text style={{fontSize:12,marginBottom:6}}>Categoria</Text>
                                    <Text style={[styles.itemTitle,{textTransform:"capitalize"}]}>{item.type}</Text>
                                </View>
                                
                                </TouchableOpacity>
                                )}  
                            </ScrollView>    
                        </View>
                        
                        
                    
                    </View>
                    
                </SafeAreaView>   
            )
        }else{ 
          return(
            <SafeAreaView style={{ flex:1 }}>
                <View style={styles.container}>
                    <View style={{flexDirection:"row"}}> 
                            <TouchableOpacity style={{marginRight:8}} onPress={handleNavigateBack}>
                                <Icon name="arrow-left" color="#34cb79" size={20}/>
                            </TouchableOpacity>
                            <Text style={{fontSize: 20,fontFamily: 'Ubuntu_700Bold'}} >
                            Lista de veículos
                        </Text>
                    </View>
                    <View style={{ flex: 1, marginLeft:85,marginTop: 300, }}>
                        <Text style={styles.description}>Nenhum item encontrado!</Text>
                        <TouchableOpacity 
                                    
                                    style={styles.btn}
                                    activeOpacity={0.6}
                                    onPress={handleReload}
                                >    
                                <Text style={styles.buttonText}>Tentar novamente</Text>
                                </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )}
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20 + Constants.statusBarHeight,
    },
    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        marginBottom: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
        
      },
    itemsContainer: {
        flex:1,
        marginTop: 16,
        marginBottom: 32,
        
    },item: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#eee',
        height: 60,
        width: 360,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingTop: 8,
        marginRight: 8,
        textAlign: 'left',
      },
       itemTitle: {
           
            fontFamily: 'Roboto_400Regular',
            textAlign: 'center',
            fontSize: 16,
        },
        btn: {
            backgroundColor: '#34CB79',
            borderWidth: 2,
            borderColor: '#34cb79',
            height: 60,
            width: 160,
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingTop: 20,
            marginRight: 8,
            alignItems: 'center',
            
        
            textAlign: 'center',
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

export default Stored;

