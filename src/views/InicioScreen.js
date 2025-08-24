import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styles from '../styles/styles'

export default function InicioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo ao App Astronômico!</Text>
      <Button
        title="Ver Calendário"
        onPress={() => navigation.navigate('Calendario')}
      />
      <Button
        title="Ver Eventos"
        onPress={() => navigation.navigate('Evento')}
      />
    </View>
  ); /* navigation.navigate('Tela') →   Manda o app pra outra tela. */
}