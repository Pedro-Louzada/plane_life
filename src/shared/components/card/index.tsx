import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface Props {
  sigla: string;
  valor: string;
}

function Card({sigla, valor}: Props) {
  return (
    <View style={estilos.bodyCard}>
      <Text style={estilos.sigla}>{sigla}</Text>
      <View style={estilos.reserva}>
        <Text style={estilos.cifrao}>R$</Text>
        <Text style={estilos.valor}>{valor}</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  bodyCard: {
    width: 80,
    height: 90,
    backgroundColor: '#4960F9',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginRight: 4,
    borderRadius: 10,
  },
  sigla: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFF',
  },
  reserva: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'flex-end',
  },
  cifrao: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#A5F3FF',
  },
  valor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A5F3FF',
  },
});

export default Card;
