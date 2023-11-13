import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'

export default class FormComment extends Component {
    constructor(props){
        super(props)
        this.state = {
            comentario: ''
        }
    }

    subirComentario(comentario){
        db.collection('posts').doc(this.props.idPost)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                comentario: comentario
            })
        })
    }

  render() {
    return (
      <View>
        <TextInput
            placeholder='Agrega comentarios'
            keyboardType='default'
            onChangeText={(text)=> this.setState({comentario: text})}
            value={this.state.comentario}
            multiline={true}
            numberOfLines={4}
            style={styles.input}
        />
        <TouchableOpacity
        onPress={()=> this.subirComentario(this.state.comentario)}
        >
            <Text>
                Enviar
            </Text>

        </TouchableOpacity>

      </View>
    )
  }
}
const styles = StyleSheet.create({
    input:{
        borderWidth: 4,
        borderColor: '#2596be'
    }
})