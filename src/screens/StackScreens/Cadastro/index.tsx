import React, {useRef, useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import DefaultButton from '../../../shared/components/buttons_app/default_button';
import BtnLink from '../../../shared/components/buttons_app/btn_link';
import {AxiosError} from 'axios';
import axiosInstance from '../../../../src/shared/config_axios';

function Cadastrar() {
  const [userInfosRegister, setUserNameRegister] = useState({
    name: '',
    email: '',
    password: '',
  });
  //referência do input de email após submeter o nome
  const email = useRef<TextInput>(null);
  //referência do input de senha após submeter o email
  const password = useRef<TextInput>(null);
  //callback para chamar a função setDataUser e manipular meu estado
  const handleChangeInput = (atributo: string, text: string) => {
    setUserNameRegister({
      ...userInfosRegister,
      [atributo]: text,
    });
  };

  //callback responsável pela chamada da POST Request ("/create")
  const handleCadastroClick = async (): Promise<boolean> => {
    try {
      const response = await axiosInstance.post(
        '/users/create',
        userInfosRegister,
      );
      let status = response.status;

      if (status === 201) {
        return true;
      } else {
        console.log(response);
        return false;
      }
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
    <View style={estilos.fundoBranco}>
      <View style={estilos.backgroundContainer}>
        <Text style={estilos.titleCadastro}>Faça seu cadastro</Text>
        <View style={estilos.containerInputs}>
          <Text style={estilos.labelName}>Nome</Text>
          <TextInput
            id="nome"
            style={estilos.input}
            value={userInfosRegister.name}
            onChangeText={text => handleChangeInput('name', text)}
            onSubmitEditing={() => email.current && email.current.focus()}
            returnKeyType="next"
          />
          <Text style={estilos.label}>Email</Text>
          <TextInput
            ref={email}
            id="email"
            style={estilos.input}
            value={userInfosRegister.email}
            onChangeText={text => handleChangeInput('email', text)}
            returnKeyType="next"
            onSubmitEditing={() => password.current && password.current.focus()}
          />
          <Text style={estilos.label}>Senha</Text>
          <TextInput
            ref={password}
            id="senha"
            returnKeyType="done"
            style={estilos.input}
            value={userInfosRegister.password}
            onChangeText={text => handleChangeInput('password', text)}
          />
          <Text style={estilos.esqueceuSenha}>Esqueceu sua senha ?</Text>
          <View>
            <DefaultButton
              children="Cadastrar"
              nameScreen="Login"
              margin={false}
              backGroundColor="#FFF"
              color="#1534FF"
              aoPressionar={handleCadastroClick}
            />
            <Text style={estilos.warning}>
              Entre para continuar a ter o controle de suas finanças
            </Text>
            <BtnLink children="Sair" nameScreen="TelaInicial" color="#87F0FF" />
          </View>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  fundoBranco: {
    zIndex: 3,
    backgroundColor: '#FFF',
    flex: 1,
    width: '100%',
  },
  backgroundContainer: {
    flex: 1,
    marginTop: 25,
    backgroundColor: '#4960F9',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  titleCadastro: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 22,
    fontWeight: '300',
    color: '#87F0FF',
  },
  containerInputs: {
    marginTop: 80,
    marginHorizontal: 30,
  },
  labelName: {
    color: '#87F0FF',
    fontSize: 16,
    marginBottom: 4,
  },
  label: {
    color: '#87F0FF',
    fontSize: 16,
    marginBottom: 4,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  esqueceuSenha: {
    textAlign: 'right',
    color: '#87F0FF',
    marginTop: 4,
    marginBottom: 60,
    fontSize: 16,
  },
  warning: {
    color: '#FFF',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default Cadastrar;
