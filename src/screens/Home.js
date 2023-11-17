import { Text, View, TouchableOpacity, StyleSheet, Image, ActivityIndicator, FlatList} from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import Post from '../components/Post'

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      posteos: []
    }
  }

  componentDidMount(){
    db.collection("posts").orderBy('createdAt', 'desc')
    .onSnapshot(docs => {
      let arrPosts = [] 
      docs.forEach(doc => {
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

  render() {
    return (
      <View style={styles.contenedor}>
        <FlatList 
        style={styles.flatList}
        data = {this.state.posteos} 
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <Post navigation = {this.props.navigation} data = {item.data} id = {item.id}/>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contenedor: {
    flex:1, 
    backgroundColor: '#C7d0d4',
    paddingHorizontal: 16,
    paddingTop: 16,

  },
  flatList: {
    marginTop: 16,
  },
})



