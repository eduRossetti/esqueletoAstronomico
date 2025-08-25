import { Calendar } from "react-native-big-calendar";
import { TouchableOpacity, Text, Modal, View, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import "dayjs/locale/pt-br"; // Importa o locale para português
const events = [
  {
    title: "Crescente - Lua com metade iluminada",
    start: new Date(2025, 8, 1, 10, 0),
    end: new Date(2025, 8, 1, 10, 0),
    color: "#dcb804",
    emoji: "🌙",
  },
  {
    title: "Apogeu - Lua ponto mais distante da Terra",
    start: new Date(2025, 8, 1, 18, 0),
    end: new Date(2025, 8, 1, 18, 0),
    color: "#dcb804",
    emoji: "🌙",
  },
  {
    title: "Antares - 0,5° ao norte da Lua",
    start: new Date(2025, 8, 3, 23, 0),
    end: new Date(2025, 8, 3, 23, 0),
    color: "#ff6f61",
    emoji: "🔭",
  },
  {
    title: "Ocultação - 43 Ophiuchi pela Lua",
    start: new Date(2025, 8, 5, 0, 0),
    end: new Date(2025, 8, 5, 0, 0),
    color: "#4b4b4b",
    emoji: "🌑",
  },
  {
    title: "Meteoros - eta-Eridanídeos atividade máxima",
    start: new Date(2025, 8, 7, 0, 0),
    end: new Date(2025, 8, 7, 23, 59),
    color: "#8a2be2",
    emoji: "💫",
  },
  {
    title: "Cheia - Lua totalmente iluminada",
    start: new Date(2025, 8, 9, 5, 0),
    end: new Date(2025, 8, 9, 5, 0),
    color: "#dcb804",
    emoji: "🌙",
  },
  {
    title: "Ocultação - lambda Aquarii pela Lua",
    start: new Date(2025, 8, 10, 23, 0),
    end: new Date(2025, 8, 10, 23, 0),
    color: "#4b4b4b",
    emoji: "🌑",
  },
  {
    title: "Mercúrio - estacionário",
    start: new Date(2025, 8, 11, 4, 0),
    end: new Date(2025, 8, 11, 4, 0),
    color: "#0099cc",
    emoji: "🪐",
  },
  {
    title: "Ceres - estacionário",
    start: new Date(2025, 8, 11, 18, 0),
    end: new Date(2025, 8, 11, 18, 0),
    color: "#0099cc",
    emoji: "🪐",
  },
  {
    title: "Vênus - 0,9° ao sul de Júpiter",
    start: new Date(2025, 8, 12, 2, 0),
    end: new Date(2025, 8, 12, 2, 0),
    color: "#0099cc",
    emoji: "🪐",
  },
  {
    title: "Meteoros - Perseídeos atividade máxima",
    start: new Date(2025, 8, 12, 0, 0),
    end: new Date(2025, 8, 12, 23, 59),
    color: "#8a2be2",
    emoji: "💫",
  },
  {
    title: "Saturno - 3,5° ao sul da Lua",
    start: new Date(2025, 8, 12, 9, 0),
    end: new Date(2025, 8, 12, 9, 0),
    color: "#0099cc",
    emoji: "🪐",
  },
  {
    title: "Netuno - 2,5° ao sul da Lua",
    start: new Date(2025, 8, 12, 10, 0),
    end: new Date(2025, 8, 12, 10, 0),
    color: "#0099cc",
    emoji: "🪐",
  },
  {
    title: "Perigeu - Lua ponto mais próximo da Terra",
    start: new Date(2025, 8, 14, 15, 0),
    end: new Date(2025, 8, 14, 15, 0),
    color: "#dcb804",
    emoji: "🌙",
  },
  {
    title: "Meteoros - kapa-Cignídeos atividade máxima",
    start: new Date(2025, 8, 16, 0, 0),
    end: new Date(2025, 8, 16, 23, 59),
    color: "#8a2be2",
    emoji: "💫",
  },
  {
    title: "Minguante - Lua com metade iluminada",
    start: new Date(2025, 8, 16, 2, 0),
    end: new Date(2025, 8, 16, 2, 0),
    color: "#dcb804",
    emoji: "🌙",
  },
  {
    title: "Pleiades - 0,9° ao sul da Lua",
    start: new Date(2025, 8, 16, 13, 0),
    end: new Date(2025, 8, 16, 13, 0),
    color: "#ff6f61",
    emoji: "🔭",
  },
  {
    title: "Urano - 5° ao sul da Lua",
    start: new Date(2025, 8, 16, 15, 0),
    end: new Date(2025, 8, 16, 15, 0),
    color: "#0099cc",
    emoji: "🪐",
  },
  {
    title: "Aldebara - 11° ao sul da Lua",
    start: new Date(2025, 8, 17, 6, 0),
    end: new Date(2025, 8, 17, 6, 0),
    color: "#ff6f61",
    emoji: "🔭",
  },
  {
    title: "Ocultação - HIP 25730 pela Lua",
    start: new Date(2025, 8, 18, 2, 0),
    end: new Date(2025, 8, 18, 2, 0),
    color: "#4b4b4b",
    emoji: "🌑",
  },
  {
    title: "Ocultação - 53 Aurigae pela Lua",
    start: new Date(2025, 8, 19, 5, 0),
    end: new Date(2025, 8, 19, 5, 0),
    color: "#4b4b4b",
    emoji: "🌑",
  },
  {
    title: "Elongação - Mercúrio máxima (19° Oeste)",
    start: new Date(2025, 8, 19, 7, 0),
    end: new Date(2025, 8, 19, 7, 0),
    color: "#0099cc",
    emoji: "🪐",
  },
  {
    title: "Júpiter - 4,5° ao sul da Lua",
    start: new Date(2025, 8, 19, 19, 0),
    end: new Date(2025, 8, 19, 19, 0),
    color: "#0099cc",
    emoji: "🪐",
  },
  {
    title: "Pollux - 2,5° ao norte da Lua",
    start: new Date(2025, 8, 20, 8, 0),
    end: new Date(2025, 8, 20, 8, 0),
    color: "#ff6f61",
    emoji: "🔭",
  },
  {
    title: "Mercúrio - 3,5° ao sul da Lua",
    start: new Date(2025, 8, 21, 15, 0),
    end: new Date(2025, 8, 21, 15, 0),
    color: "#0099cc",
    emoji: "🪐",
  },
  {
    title: "Regulus - 1° ao sul da Lua",
    start: new Date(2025, 8, 23, 2, 0),
    end: new Date(2025, 8, 23, 2, 0),
    color: "#ff6f61",
    emoji: "🔭",
  },
  {
    title: "Nova - Lua totalmente escura",
    start: new Date(2025, 8, 23, 3, 0),
    end: new Date(2025, 8, 23, 3, 0),
    color: "#dcb804",
    emoji: "🌙",
  },
  {
    title: "Quadratura - Urano em (90° do Sol)",
    start: new Date(2025, 8, 24, 4, 0),
    end: new Date(2025, 8, 24, 4, 0),
    color: "#0099cc",
    emoji: "🪐",
  },
  {
    title: "Marte - 2,5° ao norte da Lua",
    start: new Date(2025, 8, 26, 11, 0),
    end: new Date(2025, 8, 26, 11, 0),
    color: "#0099cc",
    emoji: "🪐",
  },
  {
    title: "Periélio - Mercúrio ponto mais próximo do Sol",
    start: new Date(2025, 8, 27, 9, 0),
    end: new Date(2025, 8, 27, 9, 0),
    color: "#0099cc",
    emoji: "🪐",
  },
  {
    title: "Spica - 1° ao norte da Lua",
    start: new Date(2025, 8, 27, 10, 0),
    end: new Date(2025, 8, 27, 10, 0),
    color: "#ff6f61",
    emoji: "🔭",
  },
  {
    title: "Apogeu - Lua ponto mais distante da Terra",
    start: new Date(2025, 8, 29, 13, 0),
    end: new Date(2025, 8, 29, 13, 0),
    color: "#dcb804",
    emoji: "🌙",
  },
  {
    title: "Ocultação - HIP 78650 pela Lua",
    start: new Date(2025, 8, 30, 20, 0),
    end: new Date(2025, 8, 30, 20, 0),
    color: "#4b4b4b",
    emoji: "🌑",
  },
  {
    title: "Crescente - Lua com metade iluminada",
    start: new Date(2025, 8, 31, 3, 0),
    end: new Date(2025, 8, 31, 3, 0),
    color: "#dcb804",
    emoji: "🌙",
  },
  {
    title: "Antares - 0,5° ao norte da Lua",
    start: new Date(2025, 8, 31, 7, 0),
    end: new Date(2025, 8, 31, 7, 0),
    color: "#ff6f61",
    emoji: "🔭",
  },
];

const renderEvent = (event, touchableOpacityProps) => (
  <TouchableOpacity
    {...touchableOpacityProps}
    style={{
      backgroundColor: event.color || "#fff",
      padding: 10,
      borderRadius: 5,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text style={{ fontSize: 16, marginBottom: 2 }}>{event.emoji || ""}</Text>
    <Text style={{ fontSize: 10, textAlign: "center" }}>
      {event.title.split(" ")[0]}
    </Text>
  </TouchableOpacity>
);
export default function CalendarioScreen() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDayModal, setShowDayModal] = useState(false);
  const [cameFromDayModal, setCameFromDayModal] = useState(false);

  // Função para formatar data
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    });
  };

  // Função para formatar hora
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Função para obter eventos de uma data específica
  const getEventsForDate = (date) => {
    return events.filter(event => {
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
    <>
      <Calendar
        events={events}
        height={600}
        mode={"month"}
        locale="pt-br"
        date={new Date(2025, 8, 8)}
        renderEvent={renderEvent}
        showAllDayEventCell={false}
        maxVisibleEventCount={2}
        onPressEvent={handleEventPress}
        onPressCell={handleDayPress}
      />

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
                    <Text style={modalStyles.value}>{formatDate(selectedEvent.start)}</Text>
                  </View>

                  <View style={modalStyles.detailContainer}>
                    <Text style={modalStyles.label}>🕐 Horário:</Text>
                    <Text style={modalStyles.value}>{formatTime(selectedEvent.start)}</Text>
                  </View>

                  <View style={modalStyles.detailContainer}>
                    <Text style={modalStyles.label}>ℹ️ Tipo de Evento:</Text>
                    <Text style={modalStyles.value}>
                      {selectedEvent.title.includes('Meteoros') ? 'Chuva de Meteoros' :
                       selectedEvent.title.includes('Lua') || selectedEvent.title.includes('Nova') || selectedEvent.title.includes('Cheia') || selectedEvent.title.includes('Crescente') || selectedEvent.title.includes('Minguante') ? 'Evento Lunar' :
                       selectedEvent.title.includes('Ocultação') ? 'Ocultação' :
                       selectedEvent.emoji === '🪐' ? 'Evento Planetário' :
                       selectedEvent.emoji === '🔭' ? 'Observação Estelar' : 'Evento Astronômico'}
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
                  <Text style={modalStyles.backButtonText}>← Voltar ao Dia</Text>
                </Pressable>
              )}
              
              <Pressable 
                style={[modalStyles.button, modalStyles.closeButton, cameFromDayModal && { flex: 1, marginLeft: 10 }]}
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
                    <Text style={modalStyles.value}>{formatDate(selectedDate.date)}</Text>
                  </View>

                  <View style={modalStyles.detailContainer}>
                    <Text style={modalStyles.label}>Total de Eventos:</Text>
                    <Text style={modalStyles.value}>{selectedDate.events.length}</Text>
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
                          <Text style={modalStyles.eventEmoji}>{event.emoji}</Text>
                          <Text style={modalStyles.eventTime}>{formatTime(event.start)}</Text>
                        </View>
                        <Text style={modalStyles.eventTitle}>{event.title}</Text>
                        <Text style={modalStyles.tapHint}>Toque para ver detalhes</Text>
                      </Pressable>
                    ))
                  ) : (
                    <View style={modalStyles.noEventsContainer}>
                      <Text style={modalStyles.noEventsText}>Nenhum evento astronômico para este dia.</Text>
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
    </>
  );
}

// Estilos para os modais
const modalStyles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    maxHeight: '80%',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollView: {
    maxHeight: '85%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  emoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  detailContainer: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  eventItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventEmoji: {
    fontSize: 20,
  },
  eventTime: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  eventTitle: {
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
  },
  tapHint: {
    fontSize: 12,
    color: '#007bff',
    fontStyle: 'italic',
    marginTop: 5,
    textAlign: 'right',
  },
  noEventsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noEventsText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    backgroundColor: '#6c757d',
    marginRight: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
};
