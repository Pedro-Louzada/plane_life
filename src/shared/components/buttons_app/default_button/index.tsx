import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {useDataUser} from '../../../context/ContextDataUser';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  children: string;
  nameScreen: string;
  margin: boolean;
  backGroundColor: string;
  color: string;
  aoPressionar: () => Promise<boolean>;
}

function messageAlert(screen: string) {
  let responseAlert = {
    sucessMessage: '',
    errorMessage: '',
  };

  if (screen === 'Login') {
    (responseAlert.sucessMessage = 'Usuário cadastrado com sucesso'),
      (responseAlert.errorMessage = 'Erro ao cadastrar usuário');
  } else {
    (responseAlert.sucessMessage = 'Usuário logado com sucesso'),
      (responseAlert.errorMessage = 'Erro ao fazer login');
  }

  return responseAlert;
}

function DefaultButton({
  children,
  nameScreen,
  margin,
  backGroundColor,
  color,
  aoPressionar,
}: Props) {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const estilosVariable = estilosFuncao(margin, backGroundColor, color);
  const message = messageAlert(nameScreen);
  const {dataUser} = useDataUser();
  let typeProfile = dataUser?.type_profile;
  return (
    <TouchableOpacity
      style={estilosVariable.marginVariable}
      onPress={async () => {
        const foundUser = await aoPressionar();
        if (foundUser) {
          Snackbar.show({text: message.sucessMessage});
          navigation.navigate(typeProfile ? 'TelaHome' : nameScreen);
        } else {
          Snackbar.show({text: message.errorMessage});
        }
      }}>
      <Text style={estilosVariable.textoBtn}>{children}</Text>
    </TouchableOpacity>
  );
}

const estilosFuncao = (
  margin: boolean,
  backGroundColor: string,
  color: string,
) =>
  StyleSheet.create({
    marginVariable: {
      marginHorizontal: margin ? 30 : 0,
      paddingVertical: 15,
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: backGroundColor,
    },
    textoBtn: {
      fontSize: 20,
      fontFamily: 'Montserrat-Medium',
      // fontWeight: '500',
      color: color,
    },
  });

export default DefaultButton;
