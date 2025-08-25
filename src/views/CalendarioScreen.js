import { Calendar } from "react-native-big-calendar";
import { TouchableOpacity, Text } from "react-native";
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
  return (
    <Calendar
      events={events}
      height={600}
      mode={"month"}
      locale="pt-br"
      date={new Date(2025, 8, 8)}
      renderEvent={renderEvent}
      showAllDayEventCell={false}
      maxVisibleEventCount={2}
      onPressEvent={(event) => {
        console.log("Evento pressionado:", event);
      }}
      onPressCell={(date) => {
        console.log("Célula pressionada:", date);
      }}
    />
  );
}
