import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator} from 'react-native'
import FormRegister from '../components/FormRegister'
import { auth} from '../firebase/config'

export default class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      loader: true
    }
  }


  componentDidMount(){
    auth.onAuthStateChanged((user)=>{
      this.setState({
        loader: false
      })
        if (user!==null){
            this.props.navigation.navigate('TabNavigation')
        }
    })
}


  
  render() {
    if(this.state.loader) {
      return(
        <View>
          <ActivityIndicator size='large' color= 'pink'/>
        </View>
      )
    }
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