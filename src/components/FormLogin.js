import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class FormLogin extends Component {

    constructor(props){
        super(props)
        this.state = {
            mail: '',
            password: ''
        }
    }

    loguearUsuario(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            this.props.navigation.navigate('TabNavigation')
        } )
        .catch((e)=> console.log(e))
    }

  render() {
    return (
      <View>
        <Text>Login</Text>
        <View>

            <TextInput
                style = {styles.input}
                placeholder = 'Mail'
                keyboardType = 'email-adress'
                value = {this.state.mail}
                onChangeText = {(text) => this.setState({mail: text})}
            />

            <TextInput
                style = {styles.input}
                placeholder = 'Contraseña'
                keyboardType = 'default'
                value = {this.state.password}
                secureTextEntry={true}
                onChangeText = {(text) => this.setState({password: text})}
            />

            <TouchableOpacity 
                style = {styles.btn}
                onPress={() => this.loguearUsuario(this.state.mail, this.state.password)}>
                    <Text>Iniciar sesión</Text>
            </TouchableOpacity>

        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10
    },
    btn:{
        backgroundColor: '#F998C9',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#F998C9'

    },
    textBtn:{
        color: '#fff'
    }
})