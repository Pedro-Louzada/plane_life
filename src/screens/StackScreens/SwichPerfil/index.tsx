import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import carregaDadosPerfil from '../../../shared/service/carregaDadosPerfil';
import HeaderNavigate from '../../../shared/components/HeaderNavigate';
import {IDetailUser} from '../../../shared/interfaces/IDetailUser';
import CarouselCardItem from '../../../shared/components/carousel';

function SwitchPerfil() {
  //estado para controlar a chegada de informações de cada perfil
  const [dados, setDados] = useState<IDetailUser[]>([]);
  //hook responsável pela chamada dos dados de tipagem de perfil, mocados no app
  useEffect(() => {
    const dadosPerfil = carregaDadosPerfil();
    setDados(dadosPerfil);
  }, []);

  return (
    <View style={estilos.mainView}>
      <HeaderNavigate label="Escolha seu perfil" shadow={true} />
      <View style={estilos.backgroundBottom}>
        <CarouselCardItem data={dados} />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  mainView: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  backgroundBottom: {
    flex: 1,
    width: '100%',
    // marginTop: 30,
    alignItems: 'center',
  },
});

export default SwitchPerfil;
