import React, { Component } from 'react'
import { Text, View ,TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import { auth } from '../firebase/config'


export default class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state={
            name:'',
            mail:'',
            password:'',
            miniBio:'',
            foto:''
        }
    }

    registrarUsuario(name,email,password){
        auth.createUserWithEmailAndPassword(email,password)
        .then(user => console.log(user))
        .catch( err => console.log(err))
    }


  render() {
    return (
      <View>
        <Text> Registrate </Text>
        <View>
                <TextInput
                    style = {styles.input}
                    placeholder = 'Nombre'
                    keyboardType = 'default'
                    value = {this.state.name}
                    onChangeText = { (text) => this.setState({name: text}) }
                />

                <TextInput
                    style = {styles.input}
                    placeholder = 'Email'
                    keyboardType = 'email-address'
                    value = {this.state.mail}
                    onChangeText = { (text) => this.setState({mail: text}) }
                />

                <TextInput
                    style = {styles.input}
                    placeholder = 'Contraseña'
                    keyboardType = 'default'
                    value = {this.state.password}
                    secureTextEntry={true}
                    onChangeText = { (text) => this.setState({password: text}) }
                />

                <TextInput  
                    style = {styles.input}
                    placeholder = 'Descripción'
                    keyboardType = 'default'
                    value = {this.state.miniBio}
                    secureTextEntry={true}
                    onChangeText = { (text) => this.setState({miniBio: text}) }
                />


                <TouchableOpacity 
                onPress={()=> this.registrarUsuario(this.state.name, this.state.mail, this.state.password)}                
                style={styles.btn}>
                    <Text style={styles.textBtn}>Registrame</Text>
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
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745'

    },
    textBtn:{
        color: '#fff'
    }
})



