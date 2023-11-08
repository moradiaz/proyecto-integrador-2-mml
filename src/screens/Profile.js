import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db} from '../firebase/config'

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      usuarios:[]
    }
  }
  
  logout(){
    auth.signOut()
    this.props.navigation.navigate('Register')
  }
  
  
  
  
  render() {
    return (
      <View>
       <TouchableOpacity
       style= {styles.signoutBtn}
       onPress={()=>this.logout()}
       >
        <Text> Cerrar sesión </Text>
       </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  signoutBtn:{
    backgroundColor:'red',
    padding: 16
  }
})