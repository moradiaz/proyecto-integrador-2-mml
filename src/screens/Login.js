import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'
import { auth } from '../firebase/config'


export default class Login extends Component {

    constructor(props){
      super(props)
    }

    componentDidMount(){
      auth.onAuthStateChanged((user)=>{

        if (user !== null){
          this.props.navigation.navigate('TabNavigation')
        }

      })
    }


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
