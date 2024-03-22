import React, {useEffect, useState} from 'react';
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
import {useInfoWalletUser} from '../../../../src/shared/context/ContextInfoWalletUser';
import CardInfoWallet from '../../../../src/shared/components/CardInfoWallet';
import IInfoWalletUser from '../../../../src/shared/interfaces/IInfoWalletUser';

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

  const {dataUser} = useDataUser();
  const {infoWalletUser, setInfoWalletUser} = useInfoWalletUser();

  useEffect(() => {
    async function getInfoWalletUser() {
      const idUserForGetInfos = dataUser.id;
      try {
        const response = await axiosInstance.get(
          `/portifolio-datas/${idUserForGetInfos}`,
        );

        if (response) {
          let statusGetInfoWallet = response.status;
          if (statusGetInfoWallet === 201) {
            let data = response.data;
            setInfoWalletUser({...infoWalletUser, ...data});
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
    }
    getInfoWalletUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getInfoWalletUser() {
      const idUserForGetInfos = dataUser.id;
      try {
        const response = await axiosInstance.get(
          `/portifolio-datas/${idUserForGetInfos}`,
        );

        if (response) {
          let statusGetInfoWallet = response.status;
          if (statusGetInfoWallet === 201) {
            let data = response.data;
            setInfoWalletUser({...infoWalletUser, ...data});
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
    }
    getInfoWalletUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoWalletUser]);

  const postInfosToWallet = async (
    idOfTag: number,
    nameTag: string,
    valueTag: string,
  ): Promise<boolean> => {
    try {
      const balanceNumber = Number(valueTag);
      const idUser = dataUser.id;
      const response = await axiosInstance.post('/portfolio-datas/create', {
        name: nameTag,
        id_user: idUser,
        value: balanceNumber,
        tag: idOfTag,
        installment: 0,
      });

      setIdOfTag(0);
      setPlaceHolder('Tag');
      setNameTag('');
      setValueTag('');

      console.log(response);

      if (response) {
        let status = response.status;

        if (status === 201) {
          const data = response.data;
          setInfoWalletUser({...infoWalletUser, ...data});
          return true;
        }

        return false;
      }
      return false;
    } catch (error: unknown) {
      setIdOfTag(0);
      setPlaceHolder('Tag');
      setNameTag('');
      setValueTag('');
      if (error instanceof AxiosError) {
        // O servidor respondeu com um código de status diferente de 2xx
        console.error(error.response?.data.detail[0].msg);
      }
      console.log(error);
      return false;
    }
  };

  function findTagIntoArray(
    infoWalletUser: IInfoWalletUser[],
    tagInfo: number,
  ) {
    let arrayFirstTag: IInfoWalletUser[] = [];
    let findTagRenda = infoWalletUser.map(item => {
      let intTag = parseInt(item.tag);
      if (intTag === tagInfo) {
        arrayFirstTag.push(item);
      }
    });

    if (findTagRenda) {
      arrayFirstTag.map(item => <CardInfoWallet {...item} />);
    }

    return <Text>Cadastre dados referente a esta tag</Text>;
  }

  return (
    <View style={estilos.backWhite}>
      <View style={estilos.header}>
        <Text style={estilos.headerTitle}>Seu balanço geral</Text>
        <Text style={estilos.saldo}>R$ 2.000,00</Text>
      </View>
      <TouchableOpacity
        style={estilos.callToActionButton}
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
            onPress={() => {
              postInfosToWallet(idOfTag, nameTag, valueTag);
              setOpenView(!openView);
            }}>
            <Text style={{fontSize: 16, color: '#FFF', fontWeight: 'bold'}}>
              Salvar dados
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={estilos.nameTag}>Renda mensal</Text>
      {infoWalletUser ? (
        findTagIntoArray(infoWalletUser, 0)
      ) : (
        <Text>Cadastre dados referente a esta tag</Text>
      )}
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
    marginTop: -10,
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
  nameTag: {
    textAlign: 'left',
    marginLeft: 25,
    fontSize: 20,
    fontWeight: 'bold',
  },
  callToActionButton: {
    justifyContent: 'flex-end',
    marginRight: 50,
    marginBottom: 25,
    flexDirection: 'row',
  },
});

export default Carteira;
