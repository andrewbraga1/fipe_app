import React from 'react';
import { 
  StyleSheet,
  ImageBackground,
  Image,
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
      
          <View style={styles.main}>
           
            <Text style={styles.title}>Seu controle de estoque de veículos</Text>
            <Text style={styles.description}>Ajudamos você a ter o controle na suas mãos de forma eficiente.</Text>
            
          </View>
          
          <View style={styles.footer}>
            
            <RectButton style={styles.button} onPress={handleNavigateToStored}>
              <View style={styles.buttonIcon}>
                <Text>
                  <Icon name="search" color="#FFF" size={24} />
                </Text>
              </View>
              <Text style={styles.buttonText}>
                Ver veículos no estoque
              </Text>
            </RectButton>
            
            <RectButton style={styles.button} onPress={handleNavigateToRecords}>
              <View style={styles.buttonIcon}>
                <Text>
                  <Icon name="arrow-right" color="#FFF" size={24} />
                </Text>
              </View>
              <Text style={styles.buttonText}>
                Cadastrar um novo veículo
              </Text>
            </RectButton>
            
          </View>
     
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
   
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
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
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
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





export default Home;