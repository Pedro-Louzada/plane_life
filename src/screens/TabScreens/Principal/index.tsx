import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import BtnCarteira from '../../../shared/components/buttons_app/btn_carteira';
import carregaReserva from '../../../shared/service/carregaReserva';
import Card from '../../../shared/components/card';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import HeaderTabScreen from '../../../shared/components/components_tabs_screens/header';
import ContainerSaldo from '../../../shared/components/components_tabs_screens/container_saldo';

function Principal() {
  const [reserva, setReserva] = useState('');
  const [dadosReserva, setDadosReserva] = useState([
    {id: 0, day: '', sigla: '', valor: ''},
  ]);

  useEffect(() => {
    const arrayReservas = carregaReserva();
    setReserva(arrayReservas.titulo);
    setDadosReserva(arrayReservas.dados);
  }, []);
  let length = dadosReserva.length;

  return (
    <View style={estilos.backWhite}>
      <ScrollView>
        <HeaderTabScreen />
        <ContainerSaldo />
        <BtnCarteira
          children="Cadastre seus dados financeiros na sua carteira"
          nameScreen="Carteira"
        />
        <Text style={estilos.tituloReserva}>{reserva}</Text>
        <View style={estilos.reservaDiaria}>
          {length === 0 ? (
            <Text style={estilos.semReserva}>
              Ops, sua carteira ainda está vazia....
            </Text>
          ) : (
            <FlatList
              data={dadosReserva}
              keyExtractor={({day}) => day}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({item}) => {
                return <Card {...item} />;
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  backWhite: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  tituloReserva: {
    marginLeft: 30,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  reservaDiaria: {
    marginLeft: 30,
    flexDirection: 'row',
  },
  semReserva: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Principal;
