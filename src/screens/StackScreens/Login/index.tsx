import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import DefaultButton from '../../../shared/components/buttons_app/default_button';
import BtnLink from '../../../shared/components/buttons_app/btn_link';
import HeaderNavigate from '../../../shared/components/HeaderNavigate';
import {useDataUser} from '../../../shared/context/ContextDataUser';
import {AxiosError, AxiosResponse} from 'axios';
import IDataUser from '../../../shared/interfaces/IDataUser';
import axiosInstance from '../../../shared/config_axios';

function Login() {
  //chamada do userContext
  const {dataUser, setDataUser} = useDataUser();
  //referência do input de senha após submeter o email
  const passwordLogin = useRef<TextInput>(null);
  //estados intermediários responsáveis para comparar com o estado original do usuário
  const [inputLogin, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  //callback responsável pela chamada da função controladora do emailState
  const changeInpuEmail = (text: string) => {
    setInputEmail(text);
  };
  //callback responsável pela chamada da função controladora do passwordState
  const changeInpuSenha = (text: string) => {
    setInputPassword(text);
  };
  //callback responsável pela chamada da GET Request("/users") e pela busca do usuário no banco de dados
  const handleLoginClick = async (): Promise<boolean> => {
    try {
      if (!dataUser) {
        const response: AxiosResponse<IDataUser[]> = await axiosInstance.get(
          '/users',
        );
        let arrayUsers = response.data;
        let findUser = arrayUsers.find(
          item => inputLogin === item.email && inputPassword === item.password,
        );
        if (findUser) {
          const {email, name, id, password, type_profile} = findUser;
          setDataUser({email, name, id, password, type_profile});
        }
        return findUser ? true : false;
      }
      return (
        inputLogin === dataUser.email && inputPassword === dataUser.password
      );
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // O servidor respondeu com um código de status diferente de 2xx
        console.error(error.response?.data.detail);
      }
      // console.log(error);
      return false;
    }
  };
  return (
    <>
      <HeaderNavigate label="Bem vindo(a) usuário" shadow={false} />
      <View style={estilos.containerInputs}>
        <Text style={estilos.labelEmail}>Email</Text>
        <TextInput
          id="email"
          style={estilos.input}
          value={inputLogin}
          onChangeText={text => changeInpuEmail(text)}
          onSubmitEditing={() =>
            passwordLogin.current && passwordLogin.current.focus()
          }
        />
        <Text style={estilos.label}>Senha</Text>
        <TextInput
          ref={passwordLogin}
          id="senha"
          style={estilos.input}
          value={inputPassword}
          onChangeText={text => changeInpuSenha(text)}
        />
        <Text style={estilos.esqueceuSenha}>Esqueceu sua senha ?</Text>
        <View>
          <DefaultButton
            children="Login"
            nameScreen="Perfil"
            margin={false}
            backGroundColor="#1534FF"
            color="#FFF"
            aoPressionar={handleLoginClick}
          />
          <Text style={estilos.warning}>
            Entre para continuar a ter o controle de suas finanças
          </Text>
          <BtnLink children="Sair" nameScreen="Cadastro" color="#1534FF" />
        </View>
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
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
  containerInputs: {
    marginTop: 50,
    marginHorizontal: 30,
  },
  labelEmail: {
    fontSize: 16,
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#E6E6E6',
    borderRadius: 20,
  },
  esqueceuSenha: {
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 60,
    fontSize: 16,
  },
  warning: {
    marginTop: 4,
    textAlign: 'center',
  },
});

export default Login;
