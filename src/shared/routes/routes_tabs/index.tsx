import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Carteira from '../../../screens/TabScreens/Carteira';
import Principal from '../../../screens/TabScreens/Principal';
import Trilhagem from '../../../screens/TabScreens/Trilhagem';
// import Perfil from '../../../screens/TabScreens/Perfil';
import {CustomTabBar} from '../../components/CustomTabBar';

const Tab = createBottomTabNavigator();

function RoutesTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2B47FC',
        tabBarInactiveTintColor: '#3A3A3A',
        //tabBar "esconder" quando o teclado está ativo
        tabBarHideOnKeyboard: true,
        //config para retirar o label do tabBar
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 0,
        },
      }}
      //propriedade para estilizar o corpo do tabbar, espera um ReactComponent
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Principal" component={Principal} />
      <Tab.Screen name="Carteira" component={Carteira} />
      <Tab.Screen name="Trilhagem" component={Trilhagem} />
      {/* <Tab.Screen
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => {
            return <FontAwesome name="user-o" size={28} color={color} />;
          },
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#4960F9'},
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 15,
          },
        }}
        name="Perfil"
        component={Perfil}
      /> */}
    </Tab.Navigator>
  );
}

export default RoutesTabs;
