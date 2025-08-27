import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/styles';
import { 
  calculateMoonPhase, 
  getUpcomingEvents, 
  getAugustEvents
} from '../data/astronomicalData';

const { width, height } = Dimensions.get('window');

// Componente para criar estrelas animadas
const StarField = () => {
  const [stars] = useState(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      top: Math.random() * height,
      left: Math.random() * width,
      size: Math.random() * 3 + 1,
      opacity: new Animated.Value(Math.random() * 0.5 + 0.3),
    }))
  );

  useEffect(() => {
    const animations = stars.map(star => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(star.opacity, {
            toValue: 1,
            duration: 1500 + Math.random() * 1500,
            useNativeDriver: true,
          }),
          Animated.timing(star.opacity, {
            toValue: 0.2,
            duration: 1500 + Math.random() * 1500,
            useNativeDriver: true,
          }),
        ])
      );
      
      // Adiciona um delay aleatório para cada estrela
      setTimeout(() => {
        animation.start();
      }, Math.random() * 3000);
      
      return animation;
    });

    return () => {
      animations.forEach(animation => animation.stop());
    };
  }, [stars]);

  return (
    <View style={styles.starField}>
      {stars.map(star => (
        <Animated.View
          key={star.id}
          style={[
            styles.star,
            {
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
};

// Função para obter a fase da lua atual
const getCurrentMoonPhase = () => {
  return calculateMoonPhase();
};

// Função para obter eventos astronômicos
const getAstronomicalEvents = () => {
  const currentMonth = new Date().getMonth();
  if (currentMonth === 7) { // Agosto é o mês 7 (0-indexed)
    return getAugustEvents(2);
  }
  return getUpcomingEvents(2);
};

export default function InicioScreen({ navigation }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [moonPhase, setMoonPhase] = useState(getCurrentMoonPhase());
  const [astronomicalEvents, setAstronomicalEvents] = useState(getAstronomicalEvents());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setCurrentDate(new Date());
    setMoonPhase(getCurrentMoonPhase());
    setAstronomicalEvents(getAstronomicalEvents());
    
    // Atualiza o horário a cada minuto
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.homeContainer}>
      <LinearGradient
        colors={['#0B1426', '#1e3c72', '#2a5298', '#0B1426']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <StarField />
        
        <ScrollView 
          style={{ flex: 1 }} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Seção do cabeçalho */}
          <View style={styles.headerSection}>
            <Text style={styles.astronomyIcon}>🌌</Text>
            <Text style={styles.appTitle}>AppAstro</Text>
            <Text style={styles.currentTime}>
              {formatTime(currentTime)}
            </Text>
          </View>

          {/* Informações astronômicas */}
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Hoje, {formatDate(currentDate)}</Text>
            <View style={styles.moonPhaseContainer}>
              <Text style={styles.moonPhase}>{moonPhase.emoji}</Text>
              <View style={styles.moonInfo}>
                <Text style={styles.moonPhaseName}>{moonPhase.name}</Text>
                <Text style={styles.moonDescription}>{moonPhase.description}</Text>
              </View>
            </View>
          </View>

          {/* Próximos eventos */}
          <View style={styles.eventsSection}>
            <Text style={styles.sectionTitle}>📅 Próximos Eventos</Text>
            {astronomicalEvents.map((event, index) => (
              <View key={index} style={styles.eventCard}>
                <Text style={styles.eventIcon}>{event.icon}</Text>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDate}>{event.date}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Seção de navegação */}
          <View style={styles.navigationSection}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate('Calendario')}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.menuIcon}>📅</Text>
                <Text style={styles.menuButtonText}>Calendário Astronômico</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate('Evento')}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.menuIcon}>🌟</Text>
                <Text style={styles.menuButtonText}>Eventos Celestiais</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}