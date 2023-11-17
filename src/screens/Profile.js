import { Text, View, TouchableOpacity, StyleSheet, FlatList, Alert, Button, TextInput, Image } from 'react-native'
import React, { Component } from 'react'
import { auth, db} from '../firebase/config'
import firebase from 'firebase'
import Post from '../components/Post'

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      usuarios:[], 
      posteos: [], 
      newPassword: '', 
      currentPassword: ''
    }
  }
  
  componentDidMount(){
    db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot((docs)=>{
        let arrDocs = []
        docs.forEach((doc) => {
          arrDocs.push({
            id:doc.id,
            data: doc.data()
          })
        })

        this.setState({
          usuarios : arrDocs
        })
  
      })
    db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot((docs)=>{
        let arrPosts = []
        docs.forEach((doc)=> {
          arrPosts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        
        this.setState({
          posteos: arrPosts
        })
      })
  }

  logout(){
    auth.signOut()
    this.props.navigation.navigate('Register')
  }

  eliminarPosteo(idPost){
    db.collection('posts').doc(idPost).delete()
  }

  reauthenticate(currentPassword) {
    const user = firebase.auth().currentUser
    const cred = firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
    return user.reauthenticateWithCredential(cred)
  }

  cambiarContra() {

    this.reauthenticate(this.state.currentPassword)
    .then(() => {
      const user = firebase.auth().currentUser
      user.updatePassword(this.state.newPassword)
      .then(() => {
        console.log('Actualizó la pass')
        Alert.alert('se cambio la contraseña') 
      })
      .catch((error) => console.log(error))
      })
    .catch((error) => console.log(error))
  }
  
  render() {
    return (
      <View>
        <Text>Email de usuario : </Text>
            <FlatList
            data={this.state.usuarios}
            keyExtractor={(item)=> item.id.toString() }
            renderItem={({item}) => 
            <View>
              <Text>{item.data.owner}</Text>
              <Text>{item.data.name}</Text>
              <Text>{item.data.miniBio}</Text>
              {item.data.foto !== '' ? 
                <Image 
                source={{uri: item.data.foto}}
                resizeMode='contain'
                />
                :
                ''
              }
              </View>
               }
          />
          
          <Text>Cantidad de posteos: {this.state.posteos.length}</Text>
            <FlatList
            data={this.state.posteos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
                <View>
                    <Post navigation={this.props.navigation} data={item.data} id={item.id} />
                    <TouchableOpacity
                    style={styles.btnEliminar}
                    onPress={()=>this.eliminarPosteo(item.id)}> 
                    <Text style={styles.textEliminar}>Elimar Posteo</Text>
                    </TouchableOpacity>
                </View>
            }

      
            />

        <TextInput
        placeholder='Contraseña actual'
        value = {this.state.currentPassword}
        secureTextEntry = {true} 
        onChangeText = {(text) => {this.setState({
            currentPassword : text
        })}}
        
        />
       <TextInput
        placeholder='Nueva contraseña'
        value = {this.state.newPassword}
        secureTextEntry = {true} 
        onChangeText = {(text) => {this.setState({
            newPassword : text
        })}}
        
        />
        <Button
        title = 'Cambiar contraseña' 
        onPress={()=> this.cambiarContra()}
        />

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
    backgroundColor:'#F998C9',
    padding: 10,
    borderRadius:6,
    
    
  },
  btnEliminar:{
    backgroundColor:'#F998C9',
    padding: 10,
    borderRadius:6,
    marginBottom: 10
  }
})