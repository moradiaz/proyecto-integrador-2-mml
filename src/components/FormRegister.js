import React, { Component } from 'react'
import { Text, View ,TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import { auth, db} from '../firebase/config'
import TabNavigation from '../navigation/TabNavigation'


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
        .then(user => db.collection('users').add({
            owner: this.state.mail,
            createdAt: Date.now(),
            name: this.state.name,
            miniBio: this.state.miniBio,
            foto:this.state.foto
        })
        )
        .then((resp) => console.log(resp))
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

                <TextInput  
                    style = {styles.input}
                    placeholder = 'Foto'
                    keyboardType = 'default'
                    value = {this.state.foto}
                    secureTextEntry={true}
                    onChangeText = { (text) => this.setState({foto: text}) }
                />  

                <Text>
                    ¿Tienes una cuenta?
                    <TouchableOpacity 
                    onPress={()=> this.props.navigation.navigate('Login')}>
                        Logueate aquí!
                    </TouchableOpacity>
                </Text> 

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



