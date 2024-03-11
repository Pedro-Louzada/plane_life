import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Carteira from '../../../screens/TabScreens/Carteira';
import Principal from '../../../screens/TabScreens/Principal';
import Trilhagem from '../../../screens/TabScreens/Trilhagem';
import {CustomTabBar} from '../../components/CustomTabBar';

const Tab = createBottomTabNavigator();

function RoutesTabs() {
  /*
  Função para retornar React Component pois se passar diretamente para o tabbar
  ele estaria tentando definir meu componente no momento da renderização...
  */
  const renderCustomTabBar = (props: BottomTabBarProps) => {
    return <CustomTabBar {...props} />;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2B47FC',
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
      tabBar={renderCustomTabBar}>
      <Tab.Screen name="Principal" component={Principal} />
      <Tab.Screen name="Carteira" component={Carteira} />
      <Tab.Screen name="Trilhagem" component={Trilhagem} />
    </Tab.Navigator>
  );
}

export default RoutesTabs;
