import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IStyleHeaderUser {
  children: string;
  color: string;
  fontSize: number;
  margin: number;
}

function HeaderOfStack({children, color, fontSize, margin}: IStyleHeaderUser) {
  const estilos = estilosFuncao(color, fontSize, margin);

  return (
    <View style={estilos.header}>
      <Text style={estilos.headerTitle}>{children}</Text>
    </View>
  );
}

const estilosFuncao = (color: string, fontSize: number, margin: number) =>
  StyleSheet.create({
    header: {
      justifyContent: 'center',
      width: '100%',
      height: 200,
      backgroundColor: '#4960F9',
      zIndex: 3,
      borderBottomLeftRadius: 80,
      borderBottomRightRadius: 80,
      borderBottomColor: '#87F0FF',
      borderBottomWidth: 4,
      borderRightWidth: 0.1,
      borderLeftWidth: 0.1,
      marginBottom: margin,
    },
    headerTitle: {
      textAlign: 'center',
      fontSize: fontSize,
      color: color,
    },
  });

export default HeaderOfStack;
