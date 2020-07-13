import React, { useState, useEffect } from 'react';
import { StyleSheet ,Alert, Text, View ,TouchableOpacity,Platform, AsyncStorage } from 'react-native';
import { Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Random from 'expo-random';

interface PhotoData{
    filename:string,
    uri:string,
}

interface Data {
    key:string,
    type:string,
    brand:string,
    model:string,
    year:string,
    plate:string,
    photos:PhotoData[]
  }
const CameraC = (props : any) => {

  let initialData ={

        type: props.registerData.type,
        brand:props.registerData.brand,
        model:props.registerData.model,
        year:props.registerData.year,
        plate:props.registerData.plate,
        
    } as Data
  const [ photo, setPhoto ] = useState<PhotoData>();
  const [ photos, setPhotos ] = useState<PhotoData[]>([]);
  const [ data, setData ] = useState<Data>(initialData);
  const [ camera, setCamera ] = useState<any>();
  const [ hasPermission, setHasPermission ] = useState<boolean>(false);
  const [ hasMediaPermission, setMediaPermission ] = useState<boolean>(false);
  const [ cameraType, setCameraType ] = useState<any>(Camera.Constants.Type.back);


  useEffect(()=>{
    getPermissionAsync().then(()=>{ if ( (photos.length < 1)) {
        alert('Você pode tirar de 1 a 5 fotos para concluir o cadastro.');
       
    }});
  },[]); 

  useEffect(()=>{
    if(!photo) return;
    
    if ( (photos.length < 5)) {
        photos.push(photo)
        setPhotos(photos)
        Alert.alert(
            "",
            "Deseja tirar mais uma foto ?",
            [
              {
                text: "Não",
                onPress: () => {createID()},
                style: "cancel"
              },
              { text: "Sim", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
    }
    if ( (photos.length === 5)) {
        
        createID();
    }
    
    
  },[photo]); 

  const createID = async () => {
    await Random.getRandomBytesAsync(3).then((genId)=>{
        //let id = Promise.resolve(createID());
        let dataLoc = 
            {   
                ...initialData,
                key: String(genId),
                photos:photos
            }
        
        save(dataLoc)
        props.return();
            });
    
}
 const getPermissionAsync = async () => {
    
    
    // Camera roll Permission 
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Desculpe, mas precisamos do acesso a sua câmera para funcionar!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const mediaStatus = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
    setHasPermission( status === 'granted' );
    setMediaPermission(mediaStatus.status === 'granted')
  }

  const handleCameraType=()=>{
    
    setCameraType(
      (cameraType === Camera.Constants.Type.back)
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    )
  }

  const takePicture = async () => {
    if (camera) {
        const options = {
            quality: 1,
            base64: false,
            exif: true,
            skipProcessing: false,
            onPictureSaved: saveImage,
        };
        await camera.takePictureAsync(options).then().catch(
            (error:Error) => alert(error)
        )
    }
  }

  const saveImage = (photo:any) => {
    
    MediaLibrary.createAssetAsync(photo.uri).then( asset => {
        
        setPhoto({
            filename: asset.filename,
            uri:asset.uri
        } as PhotoData) 
        

    }).catch(
        (error:Error) => alert(error)
    );
}

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
    console.log(result)
  }
  const save = async (data: Data) => {
    try {
      await AsyncStorage.setItem(data.key, JSON.stringify(data)).then(()=>{
          Alert.alert('Cadastro realiado com sucesso.')
      })

    } catch (e) {
      alert('Erro ao salvar. Tente novamente mais tarde.')
    }
  }

  
    
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return (
        <View style={{ flex: 1 }}><Text>Sem acesso a câmera</Text></View>)
      ;
    } else {
      return (
          <View style={{ flex: 1 }}>
            { (<Camera style={{ flex: 1 }} type={cameraType}  ref={ref => {setCamera(ref)}}>
              <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:30}}>
              
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent'                 
                  }}
                  onPress={pickImage}>
                  <Ionicons
                      name="ios-photos"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                  onPress={takePicture}
                  >
                  <FontAwesome
                      name="camera"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                  onPress={handleCameraType}
                  >
                  <MaterialCommunityIcons
                      name="camera-switch"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
              </View>
            </Camera>)}
        </View>
      );
   
  }
  
}
export default CameraC;