import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../../screens/StackScreens/Login';
import Cadastrar from '../../../screens/StackScreens/Cadastro';
import TelaInicial from '../../../screens/StackScreens/Tela inicial';
import SwitchPerfil from '../../../screens/StackScreens/SwichPerfil';
import RouterTab from '../routes_tabs';

const Stack = createStackNavigator();

function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TelaInicial"
        component={TelaInicial}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#4960F9'},
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 15,
          },
        }}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastrar}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: 'black',
          headerTitleStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Perfil"
        component={SwitchPerfil}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#4960F9'},
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 15,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="TelaHome"
        component={RouterTab}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default StackRoutes;
