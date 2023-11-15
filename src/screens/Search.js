import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormSearch from '../components/FormSearch'
import { db, auth } from '../firebase/config'

export default class Search extends Component {

  constructor(props){
    super(props),
    this.state={
      usuarios:[],
      backup:[],
      valor:''
    } 
  }

  componentDidMount(){
    db.collection('users').onSnapshot((docs)=> {
      let usuarios =[]
      docs.forEach((doc)=> {
        usuarios.push({
          id: doc.id, 
          data: doc.data()
        })

      })
      this.setState({ 
        usuarios, 
        backup: usuarios 
      })
    })
  }
  actualizarInput(valor){
    this.setState({
      valor: valor
    })
  }

  usuarioFiltrado(name){
    let usersFiltrados = this.state.backup.filter((elm) => 
        elm.data.name.toLowerCase().includes(name.toLowerCase()) ||
        elm.data.owner.toLowerCase().includes(name.toLowerCase()) 
    );
    this.setState({
      usuarios: usersFiltrados
    });
  }

  tocarPerfil(owner) {
    owner == auth.currentUser.email ?
      this.props.navigation.navigate('Profile')
      :
      this.props.navigation.navigate('ProfileUser', { user: owner })
  }

  
  render() {
    return (
      <View>
        <FormSearch usuarioFiltrado={(nombre) => this.usuarioFiltrado(nombre)} actualizarInput={(valor) => this.actualizarInput(valor)} />
        {this.state.valor != '' ? 
          
            <FlatList
              data={this.state.usuarios}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) =>
                <View>
                  <TouchableOpacity onPress={() => this.tocarPerfil(item.data.owner)}>
                    <Text> {item.data.name}</Text>
                    <Text>{item.data.owner}</Text>
                  </TouchableOpacity>
                </View>
                }
              
            />
            :
            <Text>No hay resultados</Text>
        
      }
      </View>
    )
  }
}


