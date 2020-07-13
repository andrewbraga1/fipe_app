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
    Platform
    } from 'react-native';

import{ Feather as Icon } from '@expo/vector-icons';
import  { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';



const Stored = () =>{
    const navigation = useNavigation();
    const [ isLoading, setLoading ] = useState<boolean>(false);
    const [ data, setData ] = useState<any>([]);
    const [source, setSource] = useState<[]>([]);

    useEffect(()=>{
       load();
    },[]);

   

    const handleNavigateBack = () =>{
        navigation.goBack();
    }
    
    const load = async () => {
        //let source:any = []
        //setLoading(true)
        try {
          const datas = await AsyncStorage.getAllKeys();
          //console.log("data"+JSON.parse(JSON.stringify(data)));
          
          if (datas !== null && (Array.isArray(datas) && datas.length > 0) ) {
            datas.map( item =>{
                loadData(item)
                data.push(source) 
            }) 
            setData(data) 
            //console.log(data);
            
        }
            setLoading(false)
        } catch (e) {
          console.error('Falha ao carregar. Tente novamente mais tarde.')
          setLoading(false)
        }
    }
    const loadData = async (index:string) => {
        
        
        if (!index) return;
        try {
            
            const info = await AsyncStorage.getItem(String(index));
            if (!info) return;
            
            setSource((JSON.parse(info)));
            console.log(source);
            
       
            
        } catch (e) {
            
          console.error('Falha ao carregar. Tente novamente mais tarde.')
        }
        
    }
   
    const ListViewItemSeparator = () => {
        //Divider for the list item
        return (
          <View
            style={{ height: 0.5, width: '100%', backgroundColor: '#080808' }}
          />
        );
    }  
    
    if (false/* isLoading === true  */) {
        //returning the loader view while data is loading
        return (
            <View style={{ flex: 1, marginTop: 300, }}>
            <ActivityIndicator />
            </View>
        )
    } else{ 
        if((source.length > 0)) {
            //returning the main view after data loaded successfully
            return (
                
                <SafeAreaView style={{ flex:1 }}>
                    <View >
                        <TouchableOpacity onPress={handleNavigateBack}>
                            <Icon name="arrow-left" color="#34cb79" size={20}/>
                        </TouchableOpacity>
                        <FlatList
                            data={data}
                            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                        />
                        {/* <ListView
                        dataSource={data}
                        renderSeparator={ListViewItemSeparator}
                        renderRow={rowData => (
                        <View
                            style={{
                            flex: 1,
                            flexDirection: 'column',
                            paddingTop: 16,
                            paddingBottom: 16,
                            }}>
                            <Text style={styles.textViewContainerHeading}>
                            {rowData.id + '. ' + rowData.title}
                            </Text>
                            <Text style={styles.textViewContainer}>{rowData.body}</Text>
                        </View>
                        )}
                    /> */}
                        
                        
                    
                    </View>
                    
                </SafeAreaView>   
            )
        }else{ 
          return(
            <View style={{ flex: 1, marginTop: 300, }}>
            <ActivityIndicator />
            </View>
        )}
    }
}
const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default Stored;

