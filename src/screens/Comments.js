import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import FormComment from '../components/FormComment'
import { db } from '../firebase/config'


export default class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            infoPost:  null
        }
    }

    componentDidMount(){
        db.collection('posts').doc(this.props.route.params.id)
        .onSnapshot((doc) => {
            this.setState({
                infoPost: doc.data()
            })
        })
    }

  render() {
    return (
      <View>
        <Text>Comentarios</Text>
        {
            this.state.infoPost !== null ?
                <FlatList
                data={this.state.infoPost.comentarios}
                keyExtractor = {(item)=> item.createdAt.toString()}
                renderItem={({item})=> <View>
                    <Text>{item.owner}</Text>
                    <Text>{item.comentario}</Text>
                </View> }
                />
            :
            ''
        }
        <FormComment
        idPost = {this.props.route.params.id}
        />
      </View>
    )
  }
}