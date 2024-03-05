import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface Props {
  children: string;
  nameScreen: string;
  color: string;
}

function BtnLink({children, nameScreen, color}: Props) {
  const navigation = useNavigation();
  const estilos = estilosFuncao(color);

  return (
    <TouchableOpacity
      style={estilos.containerLink}
      onPress={() => navigation.navigate(nameScreen as never)}>
      <Text style={estilos.titleLink}>{children}</Text>
    </TouchableOpacity>
  );
}

const estilosFuncao = (color: string) =>
  StyleSheet.create({
    containerLink: {
      marginTop: 15,
    },
    titleLink: {
      textAlign: 'center',
      fontSize: 16,
      color: color,
    },
  });

export default BtnLink;
