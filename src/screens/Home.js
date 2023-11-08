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
    db.collection("posts")
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
      <View>
        <FlatList
        data = {this.state.posteos} 
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <Post navigation = {this.props.navigation} data = {item.data} id = {item.id}/>}
        />
      </View>
    )
  }
}

