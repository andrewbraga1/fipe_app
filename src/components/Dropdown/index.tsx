import React, { useState } from 'react';
import { StyleSheet,View } from 'react-native';
import{ Feather as Icon } from '@expo/vector-icons';
import RNPickerSelect  from 'react-native-picker-select';


const Dropdown = (props: any) => {
    const placeholder = {
        label: 'Selecione uma opção...',
        value: null,
    };

    const [ _item, setItem ] = useState<string>(props.item);
    
    const handleSelectItem = (value: string) => {
        setItem(value);
    };

  return (
    <View style={styles.container}> 
        <RNPickerSelect
                placeholder={placeholder}
                items={props.itemsList}
                value={_item}
                onValueChange={value => {handleSelectItem(value)}}
                style={{
                ...styles.picker,
                iconContainer: {
                  top: 8,
                  right: 8,
                  borderBottomRightRadius: 10,
                  borderTopRightRadius: 10,
                },
                placeholder: styles.text
                }}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                return <Icon name="arrow-down" size={24} color="#FFF" />;
                }}
            />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingHorizontal: 10,
        backgroundColor: '#34CB79',
        height: 60,
        borderRadius: 10,
        color:'#fff',
        
    },
    text: {
        top:8,
        left: 10,
        justifyContent: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
      },
    picker:{
      flex: 1,
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export default Dropdown;