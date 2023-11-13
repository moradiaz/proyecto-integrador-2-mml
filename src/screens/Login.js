import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'
import { auth } from '../firebase/config'


export default class Login extends Component {

    constructor(props){
      super(props),
      this.state ={
        loader: true
      }
    }

    componentDidMount(){
      auth.onAuthStateChanged((user)=>{
        this.setState({loader:false})

        if (user !== null){
          this.props.navigation.navigate('TabNavigation')
        }

      })
    }

    render(){
      if (this.state.loader){
        return(
          <View>
               <ActivityIndicator size="large" color="pink" />
          </View>
        )
      }
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
