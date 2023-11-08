import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import FormRegister from '../components/FormRegister'
import { auth} from '../firebase/config'

export default class Register extends Component {
  constructor(props){
    super(props)
  }


  componentDidMount(){
    auth.onAuthStateChanged((user)=>{
        if (user!==null){
            this.props.navigation.navigate('Login')
        }
    })
}


  render() {
    return (
      <View style={styles.container}>
        <FormRegister navigation = {this.props.navigation}/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent:'center'
  }
})