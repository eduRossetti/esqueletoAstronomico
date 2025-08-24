import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InicioScreen from './src/views/InicioScreen';
import CalendarioScreen from './src/views/CalendarioScreen';
import EventosScreen from './src/views/EventosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Calendario" component={CalendarioScreen} />
        <Stack.Screen name="Evento" component={EventosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
/* 
NavigationContainer →           Central que guarda todas as rotas do app.
Stack.Navigator →               A pilha de telas.
Stack.Screen →                  Cada tela registrada no sistema de rotas.
navigation.navigate('Tela') →   Manda o app pra outra tela.
navigation.goBack() →           Volta pra tela anterior. 
*/