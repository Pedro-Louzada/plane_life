import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function Carteira() {
  const [openView, setOpenView] = useState(false);
  return (
    <View style={estilos.backWhite}>
      <View style={estilos.header}>
        <Text style={estilos.headerTitle}>Seu saldo atual</Text>
        <Text style={estilos.saldo}>R$ 2.000,00</Text>
      </View>
      <TouchableOpacity
        style={{alignItems: 'flex-end', marginRight: 50, marginBottom: 25}}
        onPress={() => setOpenView(!openView)}>
        <Text>+ Adicione dados a sua carteira</Text>
      </TouchableOpacity>
      {openView && (
        <View
          style={{
            width: '100%',
            height: 80,
            backgroundColor: 'red',
            // marginHorizontal: 25,
            marginBottom: 25,
          }}
        />
      )}
      <Text style={{textAlign: 'left', marginLeft: 50}}>Renda mensal</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  backWhite: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    backgroundColor: '#4960F9',
    zIndex: 3,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    marginBottom: 10,
    borderBottomColor: '#87F0FF',
    borderBottomWidth: 4,
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1,
  },
  headerTitle: {
    fontSize: 22,
    color: '#87F0FF',
    fontWeight: '300',
    marginBottom: 5,
  },
  saldo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Carteira;
