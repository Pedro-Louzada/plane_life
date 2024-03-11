import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function Carteira() {
  return (
    <View style={estilos.backWhite}>
      <View style={estilos.header}>
        <Text style={estilos.headerTitle}>Seu saldo atual</Text>
        <Text style={estilos.saldo}>R$ 2.000,00</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  backWhite: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    backgroundColor: '#4960F9',
    zIndex: 3,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    marginBottom: 40,
    borderBottomColor: '#87F0FF',
    borderBottomWidth: 4,
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1,
  },
  headerTitle: {
    fontSize: 22,
    color: '#87F0FF',
    fontWeight: '300',
    marginBottom: 5,
  },
  saldo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Carteira;
