/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

/* ANOTAÇÃO:
            import e interface para qunado precisar
            import type {PropsWithChildren} from 'react';
            type SectionProps = PropsWithChildren<{title: string;}>;
*/

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackRoutes from '../shared/routes/route_stacks/index';
import {DataUserContextProvider} from '../shared/context/ContextDataUser';
import {PaperProvider} from 'react-native-paper';

function App() {
  return (
    <SafeAreaView style={estilos.tela}>
      <StatusBar />
      <PaperProvider>
        <NavigationContainer>
          <DataUserContextProvider>
            <StackRoutes />
          </DataUserContextProvider>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    height: '100%',
  },
});

export default App;
