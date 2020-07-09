import React from 'react';
import { 
  View,
  Text,
  KeyboardAvoidingView,
  Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import{ Feather as Icon} from '@expo/vector-icons';
import  { useNavigation } from '@react-navigation/native';

const Home = () =>{
 
  const navigation = useNavigation();
  
  const handleNavigateToRecords = () =>{
    navigation.navigate('Records',{});
  }

  const handleNavigateToStored = () =>{
    navigation.navigate('Stored',{});
  }


  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View >
            
            <Text >Seu marketplace de coleta de resíduos</Text>
            <Text >Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
            
          </View>
          <View >
            <RectButton onPress={handleNavigateToRecords}>
              <View >
                <Text>
                  <Icon name="arrow-right" color="#FFF" size={24} />
                </Text>
              </View>
              <Text >
                Entrar
              </Text>
            </RectButton>

            <RectButton onPress={handleNavigateToStored}>
              <View >
                <Text>
                  <Icon name="arrow-right" color="#FFF" size={24} />
                </Text>
              </View>
              <Text >
                Entrar
              </Text>
            </RectButton>
          </View>
     
    </KeyboardAvoidingView>
  )
}




export default Home;