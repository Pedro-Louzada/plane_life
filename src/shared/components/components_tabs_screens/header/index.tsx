import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

function HeaderTabScreen() {
  return (
    <View style={estilos.header}>
      {/* <FontAwesome name="user-o" size={28} color={'#FFF'} />; */}
      <Text style={estilos.headerTitle}>Bem vindo(a) usuário</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  header: {
    justifyContent: 'center',
    width: '100%',
    height: 250,
    backgroundColor: '#4960F9',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  headerTitle: {
    width: '50%',
    marginLeft: 60,
    fontWeight: '300',
    fontSize: 28,
    color: '#FFF',
  },
});

export default HeaderTabScreen;
