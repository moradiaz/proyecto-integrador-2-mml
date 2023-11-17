import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { storage } from '../firebase/config'

export default class MyImagePicker extends Component {
    constructor(props){
        super(props)
        this.state = {
            imagenCargada: ''
        }
    }

    activarPicker(){
        ImagePicker.launchImageLibraryAsync()
        .then(image =>  this.setState({
            imagenCargada: image.assets[0].uri
        }))
        .catch
    }

    aceptarImagen(){
        fetch(this.state.imagenCargada)
        .then(resp => resp.blob())
        .then(imagen => {
            let ref = storage.ref(`imgPerfil/${Date.now()}.jpg`)
            ref.put(imagen)
            .then(() =>{
                ref.getDownloadURL()
                .then(url => this.props.actualizarFotoPerfil(url))
            })
        })
    }

    rechazarImagen(){
        this.setState({
            imagenCargada: ''
        })
    }

  render() {
    return (
      <View>
        <Text>Carga tu imagen</Text>
        {
            this.state.imagenCargada !== '' ? 
                <>
                    <Image
                    source={{uri: this.state.imagenCargada}}
                    style = {styles.img}
                    />
                    <TouchableOpacity
                    onPress={() => this.aceptarImagen()}
                    >
                        <Text> Aceptar imagen</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => this.rechazarImagen()}
                    >
                        <Text> Rechazar imagen</Text>
                    </TouchableOpacity>
                </>
                
            :
            <TouchableOpacity
            onPress={() => this.activarPicker()}
            >
                <Text> Carga tu imagen desde libreria</Text>
            </TouchableOpacity>
        }
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
    img: {
        height: 200
    }
})