import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import barras from '../../../../shared/assets/colunas.png';

function ContainerSaldo() {
  return (
    <View style={estilos.saldoAtual}>
      <Text style={estilos.textoSaldo}>Seu saldo total</Text>
      <Text style={estilos.saldo}>R$ 0,00</Text>
      <Image style={estilos.image} source={barras} />
    </View>
  );
}

const estilos = StyleSheet.create({
  saldoAtual: {
    height: 200,
    marginHorizontal: 30,
    marginTop: -80,
    backgroundColor: '#FFF',
    borderRadius: 40,
    zIndex: 3,
    paddingTop: 30,
    paddingLeft: 30,
    elevation: 5,
  },
  textoSaldo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saldo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2D99FF',
  },
  image: {
    position: 'absolute',
    left: 40,
    top: 20,
    zIndex: -1,
  },
});

export default ContainerSaldo;
