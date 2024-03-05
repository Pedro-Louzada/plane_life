/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

/* ANOTAÇÃO:
            import e interface para quando precisar
            import type {PropsWithChildren} from 'react';
            type SectionProps = PropsWithChildren<{title: string;}>;
*/

import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import logo from '../../../shared/assets/logo.png';
import BtnLink from '../../../shared/components/buttons_app/btn_link';
import StaticButton from '../../../shared/components/buttons_app/default_button/static';

function TelaInicial() {
  return (
    <View style={estilos.center}>
      <Image style={estilos.logo} source={logo} />
      <View>
        <StaticButton
          children="Login"
          nameScreen="Login"
          margin={true}
          backGroundColor="#1534FF"
          color="#FFF"
        />
        <BtnLink children="Cadastrar" nameScreen="Cadastro" color="#1534FF" />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: 200,
    height: 230,
    marginTop: 100,
    marginBottom: 125,
  },
});

export default TelaInicial;
