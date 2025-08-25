import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-big-calendar";
import {
  TouchableOpacity,
  Text,
  Modal,
  View,
  ScrollView,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/styles';
import "dayjs/locale/pt-br";
import events from "../agosto";

const { width, height } = Dimensions.get('window');

// Componente para criar estrelas animadas (reutilizado da tela inicial)
const StarField = () => {
  const [stars] = useState(() => 
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      top: Math.random() * height,
      left: Math.random() * width,
      size: Math.random() * 2 + 1,
      opacity: new Animated.Value(Math.random() * 0.5 + 0.3),
    }))
  );

  useEffect(() => {
    const animations = stars.map(star => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(star.opacity, {
            toValue: 1,
            duration: 2500 + Math.random() * 2500,
            useNativeDriver: true,
          }),
          Animated.timing(star.opacity, {
            toValue: 0.2,
            duration: 2500 + Math.random() * 2500,
            useNativeDriver: true,
          }),
        ])
      );
      
      setTimeout(() => {
        animation.start();
      }, Math.random() * 5000);
      
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

const renderEvent = (event, touchableOpacityProps) => {
  touchableOpacityProps.style = [
    ...touchableOpacityProps.style,
    {
      backgroundColor: event.color || "#fff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.4)',
      shadowColor: '#8A2BE2',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 4,
    },
  ];
  
  return (
    <TouchableOpacity {...touchableOpacityProps}>
      <View
        style={{
          backgroundColor: event.color || "#fff",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 2 }}>{event.emoji || "⭐"}</Text>
        <Text style={{ 
          fontSize: 12, 
          textAlign: "center",
          color: '#333',
          fontWeight: 'bold'
        }}>
          {event.title.split(" ")[0]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default function EventosScreen() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDayModal, setShowDayModal] = useState(false);
  const [cameFromDayModal, setCameFromDayModal] = useState(false);

  // Função para formatar data
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      weekday: "long",
    });
  };

  // Função para formatar hora
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Função para obter eventos de uma data específica
  const getEventsForDate = (date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      const targetDate = new Date(date);
      return eventDate.toDateString() === targetDate.toDateString();
    });
  };

  // Função para lidar com clique no evento
  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setCameFromDayModal(false);
    setShowEventModal(true);
  };

  // Função para lidar com clique na célula do dia
  const handleDayPress = (date) => {
    const dayEvents = getEventsForDate(date);
    setSelectedDate({ date, events: dayEvents });
    setShowDayModal(true);
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
        
        <View style={styles.eventsContainer}>
          {/* Cabeçalho da tela */}
          <View style={styles.eventsHeader}>
            <Text style={styles.eventsTitle}>🌟 Eventos Semanais</Text>
            <Text style={styles.eventsSubtitle}>Últimos dias de Agosto 2025</Text>
          </View>

          {/* Calendário semanal */}
          <View style={styles.eventsWrapper}>
            <Calendar
              events={events}
              height={520}
              mode={"3days"}
              locale="pt-br"
              date={new Date(2025, 7, 29)}
              renderEvent={renderEvent}
              maxVisibleEventCount={2}
              onPressEvent={handleEventPress}
              onPressCell={handleDayPress}
              hourRowHeight={50}
              theme={{
                palette: {
                  primary: {
                    main: '#8A2BE2',
                    contrastText: '#ffffff',
                  },
                  gray: {
                    100: 'rgba(255, 255, 255, 0.1)',
                    200: 'rgba(255, 255, 255, 0.2)',
                    300: 'rgba(255, 255, 255, 0.3)',
                    500: 'rgba(255, 255, 255, 0.5)',
                    800: 'rgba(255, 255, 255, 0.8)',
                  },
                },
                typography: {
                  fontFamily: 'System',
                },
              }}
              calendarCellStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(138, 43, 226, 0.2)',
              }}
              calendarCellTextStyle={{
                color: '#ffffff',
                fontSize: 13,
                fontWeight: '500',
              }}
              weekdayLabelStyle={{
                color: '#FFD700',
                fontSize: 14,
                fontWeight: 'bold',
              }}
              headerContentStyle={{
                backgroundColor: 'rgba(75, 0, 130, 0.8)',
                borderRadius: 10,
                marginBottom: 8,
              }}
              headerDateStyle={{
                color: '#ffffff',
                fontSize: 16,
                fontWeight: 'bold',
              }}
              hourLabelStyle={{
                color: '#B0C4DE',
                fontSize: 12,
              }}
            />
          </View>
        </View>

        {/* Modal para detalhes do evento */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showEventModal}
        onRequestClose={() => setShowEventModal(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modalContainer}>
            <ScrollView style={modalStyles.scrollView}>
              {selectedEvent && (
                <>
                  <View style={modalStyles.header}>
                    <Text style={modalStyles.emoji}>{selectedEvent.emoji}</Text>
                    <Text style={modalStyles.title}>{selectedEvent.title}</Text>
                  </View>

                  <View style={modalStyles.detailContainer}>
                    <Text style={modalStyles.label}>📅 Data:</Text>
                    <Text style={modalStyles.value}>
                      {formatDate(selectedEvent.start)}
                    </Text>
                  </View>

                  <View style={modalStyles.detailContainer}>
                    <Text style={modalStyles.label}>🕐 Horário:</Text>
                    <Text style={modalStyles.value}>
                      {formatTime(selectedEvent.start)}
                    </Text>
                  </View>

                  <View style={modalStyles.detailContainer}>
                    <Text style={modalStyles.label}>ℹ️ Tipo de Evento:</Text>
                    <Text style={modalStyles.value}>
                      {selectedEvent.title.includes("Meteoros")
                        ? "Chuva de Meteoros"
                        : selectedEvent.title.includes("Lua") ||
                          selectedEvent.title.includes("Nova") ||
                          selectedEvent.title.includes("Cheia") ||
                          selectedEvent.title.includes("Crescente") ||
                          selectedEvent.title.includes("Minguante")
                        ? "Evento Lunar"
                        : selectedEvent.title.includes("Ocultação")
                        ? "Ocultação"
                        : selectedEvent.emoji === "🪐"
                        ? "Evento Planetário"
                        : selectedEvent.emoji === "🔭"
                        ? "Observação Estelar"
                        : "Evento Astronômico"}
                    </Text>
                  </View>
                </>
              )}
            </ScrollView>

            <View style={modalStyles.buttonContainer}>
              {cameFromDayModal && (
                <Pressable
                  style={[modalStyles.button, modalStyles.backButton]}
                  onPress={() => {
                    setShowEventModal(false);
                    setShowDayModal(true);
                    setCameFromDayModal(false);
                  }}
                >
                  <Text style={modalStyles.backButtonText}>
                    ← Voltar ao Dia
                  </Text>
                </Pressable>
              )}

              <Pressable
                style={[
                  modalStyles.button,
                  modalStyles.closeButton,
                  cameFromDayModal && { flex: 1, marginLeft: 10 },
                ]}
                onPress={() => {
                  setShowEventModal(false);
                  setCameFromDayModal(false);
                }}
              >
                <Text style={modalStyles.closeButtonText}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para detalhes do dia */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDayModal}
        onRequestClose={() => setShowDayModal(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modalContainer}>
            <ScrollView style={modalStyles.scrollView}>
              {selectedDate && (
                <>
                  <View style={modalStyles.header}>
                    <Text style={modalStyles.emoji}>📅</Text>
                    <Text style={modalStyles.title}>Eventos do Dia</Text>
                  </View>

                  <View style={modalStyles.detailContainer}>
                    <Text style={modalStyles.label}>Data:</Text>
                    <Text style={modalStyles.value}>
                      {formatDate(selectedDate.date)}
                    </Text>
                  </View>

                  <View style={modalStyles.detailContainer}>
                    <Text style={modalStyles.label}>Total de Eventos:</Text>
                    <Text style={modalStyles.value}>
                      {selectedDate.events.length}
                    </Text>
                  </View>

                  {selectedDate.events.length > 0 ? (
                    selectedDate.events.map((event, index) => (
                      <Pressable
                        key={index}
                        style={modalStyles.eventItem}
                        onPress={() => {
                          setShowDayModal(false);
                          setSelectedEvent(event);
                          setCameFromDayModal(true);
                          setShowEventModal(true);
                        }}
                      >
                        <View style={modalStyles.eventHeader}>
                          <Text style={modalStyles.eventEmoji}>
                            {event.emoji}
                          </Text>
                          <Text style={modalStyles.eventTime}>
                            {formatTime(event.start)}
                          </Text>
                        </View>
                        <Text style={modalStyles.eventTitle}>
                          {event.title}
                        </Text>
                        <Text style={modalStyles.tapHint}>
                          Toque para ver detalhes
                        </Text>
                      </Pressable>
                    ))
                  ) : (
                    <View style={modalStyles.noEventsContainer}>
                      <Text style={modalStyles.noEventsText}>
                        Nenhum evento astronômico para este dia.
                      </Text>
                    </View>
                  )}
                </>
              )}
            </ScrollView>

            <Pressable
              style={modalStyles.closeButton}
              onPress={() => setShowDayModal(false)}
            >
              <Text style={modalStyles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      </LinearGradient>
    </View>
  );
}

// Estilos para os modais com tema espacial
const modalStyles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 20, 38, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(25, 25, 112, 0.95)',
    margin: 20,
    borderRadius: 20,
    padding: 25,
    maxHeight: '80%',
    width: '90%',
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.6)',
    shadowColor: '#8A2BE2',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  scrollView: {
    maxHeight: '85%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(138, 43, 226, 0.4)',
  },
  emoji: {
    fontSize: 50,
    marginBottom: 15,
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    textShadowColor: 'rgba(138, 43, 226, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  detailContainer: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#E6E6FA',
    lineHeight: 24,
  },
  eventItem: {
    backgroundColor: 'rgba(75, 0, 130, 0.6)',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.4)',
    shadowColor: '#8A2BE2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventEmoji: {
    fontSize: 24,
  },
  eventTime: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  eventTitle: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 22,
    fontWeight: '500',
  },
  tapHint: {
    fontSize: 12,
    color: '#B0C4DE',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'right',
  },
  noEventsContainer: {
    padding: 30,
    alignItems: 'center',
  },
  noEventsText: {
    fontSize: 16,
    color: '#B0C4DE',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: 'rgba(138, 43, 226, 0.8)',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.6)',
    shadowColor: '#8A2BE2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  backButton: {
    backgroundColor: 'rgba(75, 75, 75, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 10,
    shadowColor: '#000',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
};
