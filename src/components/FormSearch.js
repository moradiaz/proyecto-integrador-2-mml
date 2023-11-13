import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class FormSearch extends Component {
  constructor(props) {
    super(props);
  }

  evitarSubmit(evento) {
    evento.preventDefault();
  }

  cambios(texto) {
    this.props.actualizarInput(texto);
    this.props.usuarioFiltrado(texto);
  }

  render() {
    return (
      <View>
        <TextInput
        style={styles.formSearch}
        placeholder="Búsqueda"
        name="busqueda"
        onChangeText={(text) => this.cambios(text)}
        />
        <TouchableOpacity 
        style={styles.btn}
        onPress={(evento) => this.evitarSubmit(evento)}>
         <Text> Buscar</Text>
         
        </TouchableOpacity>
      </View>
    );
  }
}

const styles =StyleSheet.create({
    formSearch:{
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
        marginTop:50

    },
    btn:{
        backgroundColor: '#F998C9',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#F998C9',
        marginBottom: 20

        
    }
})

