import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalInfo from '../../../components/modal';

interface Props {
  titlePerfil: string;
  descriptionPerfil: string;
  nameScreen: string;
}

function BtnSwitchPerfil({titlePerfil, descriptionPerfil, nameScreen}: Props) {
  const navigation = useNavigation();

  return (
    <View style={estilos.btnSwitchPerfil}>
      <View style={estilos.viewModal}>
        <ModalInfo text={descriptionPerfil} />
      </View>
      <View style={estilos.viewBottom}>
        <TouchableOpacity
          style={estilos.bottomNavigate}
          onPress={() => {
            navigation.navigate(nameScreen as never);
          }}>
          <Text style={estilos.titlePerfil}>{titlePerfil}</Text>
          <MaterialIcons name="arrow-forward-ios" style={estilos.arrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  btnSwitchPerfil: {
    marginHorizontal: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderRadius: 15,
    elevation: 10,
    shadowColor: '#00000066',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#AAA',
  },
  viewModal: {
    backgroundColor: '#1635FF1A',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRightColor: '#AAA',
    borderRightWidth: 1,
  },
  viewBottom: {
    flex: 1,
    height: '100%',
    backgroundColor: '#FFF',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  bottomNavigate: {
    height: 55,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titlePerfil: {
    fontSize: 18,
    color: '#5D5D5D',
    fontWeight: '400',
  },
  arrow: {
    alignContent: 'flex-end',
    fontSize: 20,
    color: '#1B39FE',
  },
});

export default BtnSwitchPerfil;
