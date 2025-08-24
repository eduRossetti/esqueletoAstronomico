import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styles from '../styles/styles';

export default function CalendarioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calendário Astronômico</Text>
      <Button
        title="Voltar para Início"
        onPress={() => navigation.goBack()}
      />
    </View>
  ); /*navigation.goBack() →           Volta pra tela anterior. */
}