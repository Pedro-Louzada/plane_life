import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface Props {
  children: string;
  nameScreen: string;
  margin: boolean;
  backGroundColor: string;
  color: string;
}

function StaticButton({
  children,
  nameScreen,
  margin,
  backGroundColor,
  color,
}: Props) {
  const navigation = useNavigation();
  const estilosVariable = estilosFuncao(margin, backGroundColor, color);
  return (
    <TouchableOpacity
      style={estilosVariable.marginVariable}
      onPress={() => {
        navigation.navigate(nameScreen as never);
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

export default StaticButton;
