import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db} from '../firebase/config'
import Post from '../components/Post'

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      usuarios:[], 
      posteos: []
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
        }, () => console.log(this.state.usuarios))
  
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
  
  
  
  
  render() {
    return (
      <View>
        <Text>Email de usuario : </Text>
            <FlatList
            data={this.state.usuarios}
            keyExtractor={(item)=> item.id.toString() }
            renderItem={({item}) => <View>
              <Text>{item.data.owner}</Text>
              <Text>{item.data.name}</Text>
              <Text>{item.data.miniBio}</Text>
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
    backgroundColor:'#Be2542',
    padding: 10,
    borderRadius:6,
    
    
  },
  btnEliminar:{
    backgroundColor:'#Be2542',
    padding: 10,
    borderRadius:6,
    marginBottom: 10
  }
})