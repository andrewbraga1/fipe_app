import React, { useState } from 'react';
import { StyleSheet,View } from 'react-native';
import{ Feather as Icon } from '@expo/vector-icons';
import RNPickerSelect  from 'react-native-picker-select';


const Dropdown = (props: any) => {
    const placeholder = {
        label: 'Selecione uma opção...',
        value: null,
    };

    const [ _itemValue, setItemValue ] = useState<string>(props.value ? props.value : '');
       
    const handleSelectItem = (value: string) => {
      setItemValue(value);
      props.onSelectItem(value); 
    };

  return (
    <View style={styles.container}> 
        <RNPickerSelect
                placeholder={placeholder}
                items={props.itemsList}
                value={_itemValue}
                onValueChange={value => {handleSelectItem(value)}}
                style={{
                ...styles.picker,
                iconContainer: styles.iconContainer,
                placeholder: styles.text
                }}
                Icon={() => {
                return <Icon name="arrow-down" size={24} color="#FFF" />;
                }}
               
            ></RNPickerSelect>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        //paddingTop: 8,
        //paddingBottom: 8,
        //paddingHorizontal: 10,
        backgroundColor: '#34CB79',
        height: 60,
        borderRadius: 10,
        color:'#fff',
        
    },
    inputIOS: {
      fontSize: 16,
      color: '#fff',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      color: '#fff',
      paddingRight: 30,    // to ensure the text is never behind the icon
    },
    
    text: {
        //top:8,
        //left: 8,
        //bottom:8,
        //justifyContent: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
      },
    picker:{},
    
    iconContainer:{
      zIndex:-10,
      height: 60,
      width: 60,
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export default Dropdown;