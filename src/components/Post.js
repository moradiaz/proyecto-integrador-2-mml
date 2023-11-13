import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import {FontAwesome} from '@expo/vector-icons' 

import React, { Component } from 'react'
import {db, auth} from '../firebase/config'
import firebase from 'firebase'

export default class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            likes: 0, 
            estaLike: false
        }
    }

    componentDidMount(){
        let validacionLike = this.props.data.likes.includes(auth.currentUser.email) 
        this.setState({
            estaLike: validacionLike
        })
    }

    like(){
        db.collection('posts').doc(this.props.id) 
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then((resp) => {
            this.setState({
                estaLike: true
            })
        })
        .catch((error) => console.log(error))
    }

    dislike(){
        db.collection('posts').doc(this.props.id) 
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then((res) => {
            this.setState({
                estaLike: false
            })
        })
        .catch((error) => console.log(error)) 
    }

    comentar(){
        this.props.navigation.navigate('Comments', {id: this.props.id})
    }

    botonPerfil(){
        this.props.data.owner == auth.currentUser.email ?
        this.props.navigation.navigate('Profile')
        :
        this.props.navigation.navigate('ProfileUser', { user: this.props.data.owner })
    }

  render() {
    return (
      <View style = {styles.container}>
        <Image 
        source = {{uri: this.props.data.urlFoto ? this.props.data.urlFoto : '' }}
        style = {styles.img} 
        resizeMode='contain'
        />
        <Text>{this.props.data.descripcion}</Text>
        <TouchableOpacity
        onPress={() => this.botonPerfil()}
        ><Text>{this.props.data.owner}</Text></TouchableOpacity>
        <View>
            <Text> Likes: 
                {this.props.data.likes.length}
            </Text>
            {
                this.state.estaLike ? 
                <TouchableOpacity
                onPress={()=> this.dislike()}
                >
                    <FontAwesome name='heart' color='red' size={24}/>
                </TouchableOpacity>
                :
                <TouchableOpacity
                onPress={()=> this.like()}
                >
                <FontAwesome name='heart-o' color='red' size={24}/>
                </TouchableOpacity>
            }
            <Text>Comentarios: {this.props.data.comentarios.length}</Text>
        </View>
        <View>
            <TouchableOpacity onPress={() => this.comentar()}>
                <Text>Comentar</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 14
    },
    img: {
        width:'100%',
        height: 200
    }
})