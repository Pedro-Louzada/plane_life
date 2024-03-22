import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IInfoWalletUser from '../../interfaces/IInfoWalletUser';
import {useState} from 'react';

function CardInfoWallet({name, date, value}: IInfoWalletUser) {
  const [hideValue, setHideValue] = useState(false);

  return (
    <TouchableOpacity
      style={estilos.viewMainInfoWallet}
      onPress={() => setHideValue(!hideValue)}>
      <Text style={estilos.dataOfRegisterItem}>{date}</Text>
      <View style={estilos.boxValueOfWalletItem}>
        <Text style={estilos.titleOfWalletItem}>{name}</Text>
        {hideValue ? (
          <Text style={estilos.valueOfWalletItem}>{value}</Text>
        ) : (
          <View style={estilos.hideValueOfItem} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  viewMainInfoWallet: {
    marginHorizontal: 25,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: '#DADADA',
    borderBottomWidth: 0.5,
  },
  dataOfRegisterItem: {
    color: '#DADADA',
    fontWeight: 'bold',
  },
  boxValueOfWalletItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  titleOfWalletItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  valueOfWalletItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ECC71',
  },
  hideValueOfItem: {
    width: 80,
    height: 10,
    marginTop: 10,
    backgroundColor: '#DADADA',
  },
});

export default CardInfoWallet;
