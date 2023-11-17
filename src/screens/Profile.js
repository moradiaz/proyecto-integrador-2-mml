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
      <View style={styles.container}>
        <Text style={styles.email}>Perfil del usuario: </Text>
            <FlatList
            data={this.state.usuarios}
            keyExtractor={(item)=> item.id.toString() }
            renderItem={({item}) => 
            <View style={styles.userContainer}>
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
                <View style={styles.postContainer}>
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
        style={styles.input}
        placeholder='Contraseña actual'
        value = {this.state.currentPassword}
        secureTextEntry = {true} 
        onChangeText = {(text) => {this.setState({
            currentPassword : text
        })}}
        
        />
       <TextInput
        style={styles.input}
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
  container:{
    flex: 1,
    backgroundColor: '#F5F5F5', // Light background color
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  userContainer:{
    marginBottom: 16,
    backgroundColor: '#FFFFFF', // White background for the "box"
    borderRadius: 8, // Border radius for rounded corners
    padding: 16,
    elevation: 2, // Shadow for a slight lift
    
  },
  postContainer:{
    marginBottom: 16,
    backgroundColor: '#FFFFFF', // White background for the "box"
    borderRadius: 8, // Border radius for rounded corners
    padding: 16,
    elevation: 2, // Shadow for a slight lift
  },

  signoutBtn:{
    backgroundColor:'#F998C9',
    padding: 10,
    borderRadius:6,
    marginTop:20
  
    
  },
  textEliminar: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  btnEliminar:{
    backgroundColor:'#F998C9',
    padding: 10,
    borderRadius:6,
    marginBottom: 10
  },
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
email:{
  fontWeight:'bold',
  paddingBottom: '50'

}
})

