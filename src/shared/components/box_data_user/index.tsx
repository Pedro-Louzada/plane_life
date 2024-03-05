import {useDataUser} from '../../context/ContextDataUser';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axiosInstance from '../../config_axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';

interface IDadosUser {
  firstLabel: string;
  secondLabel: string;
  thirdLabel: string;
}

function BoxDataUser({firstLabel, secondLabel, thirdLabel}: IDadosUser) {
  const {dataUser, setDataUser} = useDataUser();
  const [mutableName, setMutableName] = useState(false);
  const [mutableEmail, setMutableEmail] = useState(false);
  const [mutablePassword, setMutablePassword] = useState(false);

  const modificaInput = (atributo: string, valor: string) => {
    setDataUser({...dataUser, [atributo]: valor});
  };

  const updateDataUser = async (id: number) => {
    console.log(dataUser);
    const response = await axiosInstance.put(`/users/update/${id}`, {
      name: dataUser.name,
      email: dataUser.email,
      password: dataUser.password,
    });
    console.log(response);
  };

  const {id} = dataUser;

  useEffect(() => {
    console.log(mutableName);
  }, [mutableName]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={150}>
      <ScrollView>
        <View style={estilos.sectionInput}>
          <Text style={estilos.label}>Perfil</Text>
          <View style={estilos.reactInput}>
            <TextInput
              editable={false}
              value={dataUser.type_profile}
              placeholder={dataUser.type_profile}
              style={estilos.valueInput}
              underlineColorAndroid="#E6E6E6"
            />
          </View>
          <Text style={estilos.label}>{firstLabel}</Text>
          <View style={estilos.reactInput}>
            <TextInput
              editable={mutableName}
              value={dataUser.name}
              placeholder={dataUser.name}
              style={estilos.valueInput}
              underlineColorAndroid="#E6E6E6"
              onChangeText={text => modificaInput('name', text)}
              onSubmitEditing={() => updateDataUser(id)}
            />
            <View style={estilos.sectionPencil}>
              <MaterialCommunityIcons
                name={mutableName ? 'pencil' : 'pencil-off'}
                size={18}
                onPress={() => setMutableName(!mutableName)}
              />
            </View>
          </View>
          <Text style={estilos.label}>{secondLabel}</Text>
          <View style={estilos.reactInput}>
            <TextInput
              editable={mutableEmail}
              value={dataUser.email}
              placeholder={dataUser.email}
              style={estilos.valueInput}
              underlineColorAndroid="#E6E6E6"
              onChangeText={text => modificaInput('email', text)}
              onSubmitEditing={() => updateDataUser(id)}
            />
            <View style={estilos.sectionPencil}>
              <MaterialCommunityIcons
                name={mutableEmail ? 'pencil' : 'pencil-off'}
                size={18}
                onPress={() => setMutableEmail(!mutableEmail)}
              />
            </View>
          </View>
          <Text style={estilos.label}>{thirdLabel}</Text>
          <View style={estilos.reactInput}>
            <TextInput
              editable={mutablePassword}
              value={dataUser.password}
              placeholder={dataUser.password}
              style={estilos.valueInput}
              underlineColorAndroid="#E6E6E6"
              onChangeText={text => modificaInput('password', text)}
              onSubmitEditing={() => updateDataUser(id)}
            />
            <View style={estilos.sectionPencil}>
              <MaterialCommunityIcons
                name={mutablePassword ? 'pencil' : 'pencil-off'}
                size={18}
                onPress={() => setMutablePassword(!mutablePassword)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  sectionInput: {
    marginHorizontal: 25,
    marginBottom: 20,
    marginTop: 10,
  },
  reactInput: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  valueInput: {
    width: '95%',
  },
  label: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: -15,
  },
  pencil: {
    fontSize: 20,
  },
  sectionPencil: {
    justifyContent: 'center',
  },
});

export default BoxDataUser;
