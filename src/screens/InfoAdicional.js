import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import MyImagePicker from '../components/MyImagePicker'
import { db } from '../firebase/config'

export default class   extends Component {

    constructor(props){
        super(props)
        this.state = {
            foto: ''
        }
    }

    actualizarEstadoFotoPerfil(url){
        this.setState({
            foto: url
        })
    }

    actualizarDocDelUsuario(){
        console.log(this.props.route.params.docId)
        db.collection('users')
        .doc(this.props.route.params.docId)
        .update({
            foto: this.state.foto
        })
        .then(resp => {
            this.props.navigation.navigate('TabNavigation')
        })
    }

  render() {
    return (
      <View style = {styles.container}>
        <MyImagePicker actualizarFotoPerfil = {(url)=> this.actualizarEstadoFotoPerfil(url)}/>
        {
            this.state.foto !== '' ?
                <TouchableOpacity
                onPress={()=> this.actualizarDocDelUsuario()}
                >
                    <Text>
                        Añadir foto de perfil
                    </Text>
                </TouchableOpacity>
            :
            null
        }
        <TouchableOpacity
        onPress={()=> this.props.navigation.navigate('Login')}
        >
            <Text>
                Omitir este paso
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})