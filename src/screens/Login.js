import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'


export default class Login extends Component {
  render() {
    return (
        <View>
            <FormLogin navigation= {this.props.navigation}/>
            <Text>
                ¿Aún no tienes cuenta?
                <TouchableOpacity
                onPress={()=> this.props.navigation.navigate('Register')}
                > 
                <Text>Registrate aquí!</Text>  
                </TouchableOpacity>
            </Text>
        </View>
    )
  }
}
