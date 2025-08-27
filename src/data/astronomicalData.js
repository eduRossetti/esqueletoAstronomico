// Dados astronômicos para o app
import augustEvents from '../agosto.js';

export const moonPhases = [
  { 
    emoji: '🌑', 
    name: 'Lua Nova', 
    description: 'Lua invisível no céu',
    details: 'A lua está entre a Terra e o Sol, não sendo visível durante a noite.'
  },
  { 
    emoji: '🌒', 
    name: 'Lua Crescente', 
    description: 'Pequena porção iluminada',
    details: 'Uma pequena fatia da lua começa a aparecer no céu noturno.'
  },
  { 
    emoji: '🌓', 
    name: 'Quarto Crescente', 
    description: 'Metade da lua visível',
    details: 'Exatamente metade da lua está iluminada e visível.'
  },
  { 
    emoji: '🌔', 
    name: 'Lua Gibosa Crescente', 
    description: 'Mais da metade iluminada',
    details: 'A lua está quase cheia, com mais de 50% iluminada.'
  },
  { 
    emoji: '🌕', 
    name: 'Lua Cheia', 
    description: 'Lua completamente iluminada',
    details: 'A lua está totalmente iluminada e é o melhor momento para observação.'
  },
  { 
    emoji: '🌖', 
    name: 'Lua Gibosa Minguante', 
    description: 'Diminuindo gradualmente',
    details: 'A lua começa a diminuir após a fase cheia.'
  },
  { 
    emoji: '🌗', 
    name: 'Quarto Minguante', 
    description: 'Metade da lua visível',
    details: 'Novamente apenas metade da lua está visível.'
  },
  { 
    emoji: '🌘', 
    name: 'Lua Minguante', 
    description: 'Pequena porção iluminada',
    details: 'Uma pequena fatia da lua ainda está visível antes da lua nova.'
  },
];

export const constellations = [
  { 
    name: 'Orion', 
    emoji: '🌟', 
    description: 'O Caçador',
    season: 'Inverno',
    brightestStar: 'Rigel',
    visibility: 'Visível no hemisfério sul durante o verão'
  },
  { 
    name: 'Ursa Major', 
    emoji: '🐻', 
    description: 'A Grande Ursa',
    season: 'Ano todo',
    brightestStar: 'Alioth',
    visibility: 'Circumpolar no hemisfério norte'
  },
  { 
    name: 'Cassiopeia', 
    emoji: '👑', 
    description: 'A Rainha',
    season: 'Outono',
    brightestStar: 'Shedir',
    visibility: 'Fácil de identificar pelo formato de W'
  },
  { 
    name: 'Crux', 
    emoji: '✝️', 
    description: 'Cruzeiro do Sul',
    season: 'Ano todo (Hemisfério Sul)',
    brightestStar: 'Acrux',
    visibility: 'Símbolo do hemisfério sul'
  },
  { 
    name: 'Leo', 
    emoji: '🦁', 
    description: 'O Leão',
    season: 'Primavera',
    brightestStar: 'Regulus',
    visibility: 'Melhor visível entre março e maio'
  },
];

export const astronomicalEvents = [
  { 
    icon: '☄️', 
    title: 'Chuva de Meteoros Perseídas', 
    date: 'Ago 12-13',
    description: 'Uma das chuvas de meteoros mais espetaculares do ano',
    bestTime: 'Após a meia-noite'
  },
  { 
    icon: '🌙', 
    title: 'Eclipse Lunar Parcial', 
    date: 'Set 18',
    description: 'A Terra projetará sua sombra parcialmente sobre a Lua',
    bestTime: 'Durante a madrugada'
  },
  { 
    icon: '⭐', 
    title: 'Conjunção Marte-Vênus', 
    date: 'Set 25',
    description: 'Marte e Vênus aparecerão muito próximos no céu',
    bestTime: 'Ao entardecer'
  },
  { 
    icon: '🪐', 
    title: 'Saturno em Oposição', 
    date: 'Out 3',
    description: 'Saturno estará no ponto mais próximo da Terra',
    bestTime: 'Durante toda a noite'
  },
  { 
    icon: '🌠', 
    title: 'Chuva de Meteoros Draconídas', 
    date: 'Out 8-9',
    description: 'Meteoros irradiando da constelação do Dragão',
    bestTime: 'Início da noite'
  },
  { 
    icon: '🔭', 
    title: 'Máxima Elongação de Mercúrio', 
    date: 'Out 20',
    description: 'Melhor momento para observar Mercúrio',
    bestTime: 'Ao amanhecer'
  },
];

export const observationTips = [
  {
    icon: '🌙',
    title: 'Observação da Lua',
    tip: 'Use binóculos para ver crateras e montanhas lunares com mais detalhes.'
  },
  {
    icon: '⭐',
    title: 'Identificando Planetas',
    tip: 'Planetas não cintilam como as estrelas e se movem lentamente entre as constelações.'
  },
  {
    icon: '🔭',
    title: 'Usando Telescópio',
    tip: 'Deixe seu telescópio se aclimatar à temperatura externa por 30 minutos.'
  },
  {
    icon: '🌃',
    title: 'Poluição Luminosa',
    tip: 'Encontre um local escuro, longe das luzes da cidade para melhor observação.'
  },
  {
    icon: '🕰️',
    title: 'Melhor Horário',
    tip: 'O céu fica mais escuro cerca de 1-2 horas após o pôr do sol.'
  },
];

// Função para calcular a fase da lua baseada na data
export const calculateMoonPhase = (date = new Date()) => {
  const lunarCycle = 29.53058867; // dias em um ciclo lunar
  const knownNewMoon = new Date('2024-01-11'); // Data de uma lua nova conhecida
  
  const daysSinceNewMoon = (date - knownNewMoon) / (1000 * 60 * 60 * 24);
  const cyclePosition = daysSinceNewMoon % lunarCycle;
  const phaseIndex = Math.round((cyclePosition / lunarCycle) * 8) % 8;
  
  return moonPhases[phaseIndex];
};

// Função para obter constelação baseada na época do ano
export const getSeasonalConstellation = (date = new Date()) => {
  const month = date.getMonth();
  
  if (month >= 2 && month <= 4) { // Março a Maio - Outono no Hemisfério Sul
    return constellations.find(c => c.name === 'Orion') || constellations[0];
  } else if (month >= 5 && month <= 7) { // Junho a Agosto - Inverno no Hemisfério Sul
    return constellations.find(c => c.name === 'Crux') || constellations[3];
  } else if (month >= 8 && month <= 10) { // Setembro a Novembro - Primavera no Hemisfério Sul
    return constellations.find(c => c.name === 'Leo') || constellations[4];
  } else { // Dezembro a Fevereiro - Verão no Hemisfério Sul
    return constellations.find(c => c.name === 'Cassiopeia') || constellations[2];
  }
};

// Função para obter eventos próximos
export const getUpcomingEvents = (count = 3) => {
  return astronomicalEvents.slice(0, count);
};

// Função para obter eventos específicos de agosto
export const getAugustEvents = (count = 5) => {
  const today = new Date();
  const currentDate = today.getDate();
  
  // Filtra eventos do mês atual que ainda não aconteceram ou estão acontecendo hoje
  const upcomingEvents = augustEvents.filter(event => {
    const eventDate = new Date(event.start);
    return eventDate.getDate() >= currentDate;
  });
  
  // Converte para o formato usado no app e pega apenas os próximos eventos
  return upcomingEvents.slice(0, count).map(event => ({
    icon: event.emoji || '⭐',
    title: event.title,
    date: formatEventDate(event.start),
    description: getEventDescription(event.title),
    time: formatEventTime(event.start)
  }));
};

// Função auxiliar para formatar a data do evento
const formatEventDate = (date) => {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short'
  });
};

// Função auxiliar para formatar o horário do evento
const formatEventTime = (date) => {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Função auxiliar para obter descrição baseada no título
const getEventDescription = (title) => {
  if (title.includes('Meteoros')) return 'Chuva de meteoros visível no céu';
  if (title.includes('Lua')) return 'Evento lunar observável';
  if (title.includes('Conjunção') || title.includes('ao sul') || title.includes('ao norte')) return 'Planetas/estrelas próximos no céu';
  if (title.includes('Ocultação')) return 'Estrela ocultada pela Lua';
  if (title.includes('Elongação')) return 'Planeta em melhor posição para observação';
  if (title.includes('Oposição')) return 'Planeta em posição ideal para observação';
  return 'Evento astronômico observável';
};

// Função para obter dica de observação aleatória
export const getRandomObservationTip = () => {
  const randomIndex = Math.floor(Math.random() * observationTips.length);
  return observationTips[randomIndex];
};
