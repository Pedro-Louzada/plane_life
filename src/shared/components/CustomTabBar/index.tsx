import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={estilos.container}>
      <View style={estilos.content}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          let routeName = route.name;
          let iconName = '';
          switch (routeName) {
            case 'Principal':
              iconName = 'home';
              break;
            case 'Carteira':
              iconName = 'wallet';
              break;
            case 'Trilhagem':
              iconName = 'send';
              break;
          }
          const isFocused = state.index === index;

          /*
          Callback onPress: responsável pelo clique no icone daquela tela
          passando como alvo, o key da rota para quando eu clicar ele navegar
          exatamente para aquela key*/

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={estilos.buttonTab}
              key={route.key}>
              <View style={{alignItems: 'center', padding: 4}}>
                <View
                  style={[
                    estilos.innerButton,
                    {backgroundColor: isFocused ? '#B5BFFF' : 'transparent'},
                  ]}>
                  <MaterialIcons
                    name={iconName}
                    size={34}
                    color={isFocused ? '#1534FF' : '#535353'}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    borderRadius: 99,
    flexDirection: 'row',
    marginBottom: Platform.OS === 'ios' ? 38 : 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    gap: 8,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonTab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerButton: {
    padding: 8,
    borderRadius: 99,
  },
});
