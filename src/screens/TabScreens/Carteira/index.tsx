import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axiosInstance from '../../../../src/shared/config_axios';
import {AxiosError} from 'axios';
import {useDataUser} from '../../../../src/shared/context/ContextDataUser';

const tagsOfWallet = [
  {id: 0, tag: 'Reserva Mensal'},
  {id: 1, tag: 'Dispesa Fixa'},
  {id: 2, tag: 'Dívidas Recorrentes'},
  {id: 3, tag: 'Dívidas em atraso'},
];

function Carteira() {
  const [openView, setOpenView] = useState(false);
  const [onPressedBox, setOnPressedBox] = useState(false);
  const [placeHolderTag, setPlaceHolder] = useState('Tag');
  const [idOfTag, setIdOfTag] = useState(0);
  const [nameTag, setNameTag] = useState('');
  const [valueTag, setValueTag] = useState('');
  const [hideValue, setHideValue] = useState(false);

  const {dataUser} = useDataUser();

  const postInfosToWallet = async (
    idOfTag: number,
    nameTag: string,
    valueTag: string,
  ): Promise<boolean> => {
    try {
      const balanceNumber = Number(valueTag);
      const idUser = dataUser.id;
      const response = await axiosInstance.post('', {
        tag: idOfTag,
        name: nameTag,
        balance: balanceNumber,
        id: idUser,
      });

      if (response) {
        let status = response.status;

        if (status === 200) {
          return true;
        }

        return false;
      }

      return false;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // O servidor respondeu com um código de status diferente de 2xx
        console.error(error.response?.data.detail[0].msg);
      }
      console.log(error);
      return false;
    }
  };

  return (
    <View style={estilos.backWhite}>
      <View style={estilos.header}>
        <Text style={estilos.headerTitle}>Seu saldo atual</Text>
        <Text style={estilos.saldo}>R$ 2.000,00</Text>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: 'flex-end',
          marginRight: 50,
          marginBottom: 25,
          flexDirection: 'row',
        }}
        onPress={() => setOpenView(!openView)}>
        <Text style={estilos.callToActionForRegisterInfos}>
          Cadastrar dados
        </Text>
        <AntDesign name="pluscircle" size={24} />
      </TouchableOpacity>
      {openView && (
        <View style={estilos.formWallet}>
          <Text style={estilos.labelOfForm}>Selecione a tag</Text>
          <TouchableOpacity
            style={estilos.dropdown}
            onPress={() => setOnPressedBox(!onPressedBox)}>
            <Text>{placeHolderTag}</Text>
            <MaterialIcons
              name={!onPressedBox ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
              style={estilos.icon}
            />
          </TouchableOpacity>
          {onPressedBox && (
            <View style={estilos.dropdownArea}>
              <FlatList
                data={tagsOfWallet}
                keyExtractor={item => String(item.id)}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={estilos.boxItems}
                      onPress={() => {
                        setPlaceHolder(item.tag);
                        setIdOfTag(item.id);
                        setOnPressedBox(!onPressedBox);
                      }}>
                      <Text key={index}>{item.tag}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
          <Text style={estilos.labelOfForm}>Nomeie seu dado</Text>
          <View style={{width: '100%'}}>
            <TextInput
              value={nameTag}
              style={estilos.inputArea}
              underlineColorAndroid="#DADADA"
              onChangeText={text => setNameTag(text)}
            />
          </View>
          <Text style={estilos.labelOfForm}>Valor</Text>
          <TextInput
            keyboardType="numeric"
            value={valueTag}
            style={estilos.inputArea}
            underlineColorAndroid="#DADADA"
            onChangeText={text => setValueTag(text)}
          />
          <TouchableOpacity
            style={estilos.buttonPostInfosWallet}
            onPress={() => postInfosToWallet(saveTag, nameTag, valueTag)}>
            <Text style={{fontSize: 16, color: '#FFF', fontWeight: 'bold'}}>
              Salvar dados
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Text
        style={{
          textAlign: 'left',
          marginLeft: 25,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        Renda mensal
      </Text>
      <TouchableOpacity
        style={estilos.viewMainInfoWallet}
        onPress={() => setHideValue(!hideValue)}>
        <Text style={estilos.dataOfRegisterItem}>19/03/2024</Text>
        <View style={estilos.boxValueOfWalletItem}>
          <Text style={estilos.titleOfWalletItem}>Salário</Text>
          {hideValue ? (
            <Text style={estilos.valueOfWalletItem}>R$ 200,00</Text>
          ) : (
            <View style={estilos.hideValueOfItem} />
          )}
        </View>
      </TouchableOpacity>
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
  dropdown: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#DADADA',
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  icon: {
    fontSize: 25,
  },
  dropdownArea: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#FFF',
    elevation: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  boxItems: {
    width: '85%',
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: '#8E8E8E',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  inputArea: {
    marginHorizontal: 25,
    marginTop: -20,
    alignItems: 'center',
    marginBottom: 10,
  },
  callToActionForRegisterInfos: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
  },
  formWallet: {
    width: '90%',
    paddingTop: 20,
    paddingBottom: 20,
    marginHorizontal: 25,
    marginBottom: 25,
    borderRadius: 30,
    backgroundColor: '#FFF',
    elevation: 4,
  },
  labelOfForm: {
    fontSize: 16,
    paddingLeft: 25,
    fontWeight: 'bold',
    color: '#4960F9',
  },
  viewMainInfoWallet: {
    marginHorizontal: 25,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: '#DADADA',
    borderBottomWidth: 0.5,
  },
  boxValueOfWalletItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  valueOfWalletItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ECC71',
  },
  titleOfWalletItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dataOfRegisterItem: {
    color: '#DADADA',
    fontWeight: 'bold',
  },
  hideValueOfItem: {
    width: 80,
    height: 10,
    marginTop: 10,
    backgroundColor: '#DADADA',
  },
  buttonPostInfosWallet: {
    width: '50%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#4960F9',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 25,
  },
});

export default Carteira;
