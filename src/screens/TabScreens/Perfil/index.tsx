import React from 'react';
import BoxDataUser from '../../../shared/components/box_data_user';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useDataUser} from '../../../../src/shared/context/ContextDataUser';

function Perfil() {
  //chamada de contexto do usuário para captação de informações
  const {dataUser} = useDataUser();

  let nome = dataUser.name;

  return (
    <View style={estilos.backWhite}>
      <View style={estilos.header}>
        <Text style={estilos.headerTitle}>{nome}</Text>
      </View>
      <BoxDataUser firstLabel="Nome" secondLabel="Email" thirdLabel="Senha" />
      <TouchableOpacity style={estilos.buttonLogout}>
        <Text style={estilos.textLogout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  backWhite: {
    flex: 1,
    backgroundColor: '#FFF',
    zIndex: 1,
  },
  header: {
    justifyContent: 'center',
    width: '100%',
    height: 200,
    backgroundColor: '#4960F9',
    zIndex: 3,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    marginBottom: 40,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
  },
  buttonLogout: {
    marginHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#4960F9',
    borderRadius: 30,
  },
  textLogout: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default Perfil;
