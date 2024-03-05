import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IHeaderNavigate from '../../shared/interfaces/IHeaderNavigate';

function HeaderNavigate({label, shadow}: IHeaderNavigate) {
  let estilosAdicionais = {};
  if (shadow) {
    estilosAdicionais = {
      borderBottomColor: '#87F0FF',
      borderBottomWidth: 4,
      borderRightWidth: 0.1,
      borderLeftWidth: 0.1,
    };
  }

  return (
    <View style={[estilosFuncao.header, estilosAdicionais]}>
      <Text style={estilosFuncao.headerTitle}>{label}</Text>
    </View>
  );
}

const estilosFuncao = StyleSheet.create({
  header: {
    justifyContent: 'center',
    width: '100%',
    height: 200,
    backgroundColor: '#4960F9',
    zIndex: 3,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 22,
    color: '#87F0FF',
  },
});
export default HeaderNavigate;
