import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  children: string;
  nameScreen: string;
}
function BtnCarteira({nameScreen, children}: Props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={estilos.btnSwitchPerfil}
      onPress={() => navigation.navigate(nameScreen as never)}>
      <Text style={estilos.descricaoBotao}>{children}</Text>
      <MaterialIcons name="arrow-forward-ios" style={estilos.arrow} />
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  btnSwitchPerfil: {
    backgroundColor: '#4960F9',
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginHorizontal: 30,
    flexDirection: 'row',
    borderRadius: 40,
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  descricaoBotao: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '400',
    width: '65%',
  },
  arrow: {
    alignSelf: 'center',
    alignContent: 'flex-end',
    fontSize: 20,
    color: '#FFF',
  },
});

export default BtnCarteira;
