export type LandingStat = {
  id: string;
  label: string;
  value: number;
  suffix: string;
};

export type LandingFeature = {
  id: string;
  title: string;
  description: string;
  icon: "trophy" | "calendar" | "chart" | "shield";
};

export type LandingStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type FeaturedTeam = {
  id: string;
  name: string;
  shortName: string;
  city: string;
  color: string;
};

export type UpcomingMatch = {
  id: string;
  round: string;
  date: string;
  time: string;
  venue: string;
  home: string;
  away: string;
};

export type FeaturedTournament = {
  id: string;
  name: string;
  category: string;
  season: string;
  status: string;
  teamsCount: number;
  startDate: string;
  endDate: string;
  description: string;
  teams: FeaturedTeam[];
  upcomingMatches: UpcomingMatch[];
};

export const landingStats: LandingStat[] = [
  { id: "tournaments", label: "Torneos realizados", value: 24, suffix: "" },
  { id: "teams", label: "Equipos registrados", value: 320, suffix: "" },
  { id: "players", label: "Jugadores", value: 4800, suffix: "+" },
  { id: "matches", label: "Partidos disputados", value: 980, suffix: "+" },
];

export const landingFeatures: LandingFeature[] = [
  {
    id: "tournaments",
    title: "Gestión de torneos",
    description:
      "Creá torneos completos con categorías, temporadas y formatos. Controlá cada fase desde un solo panel.",
    icon: "trophy",
  },
  {
    id: "fixture",
    title: "Fixture automático",
    description:
      "Generá calendarios de partidos al instante y evitá cruces repetidos. Todo queda listo para competir.",
    icon: "calendar",
  },
  {
    id: "statistics",
    title: "Estadísticas en vivo",
    description:
      "Tabla de posiciones, goleadores y asistencias. Cada resultado actualiza las tablas al momento.",
    icon: "chart",
  },
  {
    id: "teams",
    title: "Seguimiento de equipos",
    description:
      "Cargá planteles, confirmá delegados y seguí el desempeño de cada equipo a lo largo de la temporada.",
    icon: "shield",
  },
];

export const landingSteps: LandingStep[] = [
  {
    id: "create",
    number: "01",
    title: "Creá tu torneo",
    description:
      "Definí nombre, categoría, cantidad de equipos y fechas. La plataforma se encarga del resto.",
  },
  {
    id: "organize",
    number: "02",
    title: "Cargá equipos y fixture",
    description:
      "Registrá planteles y generá el fixture automático con un clic. Todo queda listo para competir.",
  },
  {
    id: "compete",
    number: "03",
    title: "Competí y seguí las stats",
    description:
      "Cargá resultados y la tabla de posiciones, goleadores y estadísticas se actualizan solas.",
  },
];

export const featuredTournament: FeaturedTournament = {
  id: "tc-2026",
  name: "Tucumán Cup 2026",
  category: "Senior",
  season: "Temporada 2026",
  status: "En curso",
  teamsCount: 24,
  startDate: "Marzo",
  endDate: "Diciembre",
  description:
    "El torneo amateur más importante de la provincia reúne a 24 equipos en busca del título. Fixture completo, estadísticas en vivo y tabla de posiciones actualizada fecha a fecha.",
  teams: [
    {
      id: "t1",
      name: "San Martín",
      shortName: "SM",
      city: "San Miguel de Tucumán",
      color: "#f5c542",
    },
    {
      id: "t2",
      name: "Atlético Norte",
      shortName: "AN",
      city: "San Miguel de Tucumán",
      color: "#ef4444",
    },
    {
      id: "t3",
      name: "Unión Sur",
      shortName: "US",
      city: "Tafí Viejo",
      color: "#3b82f6",
    },
    {
      id: "t4",
      name: "Central Oeste",
      shortName: "CO",
      city: "Concepción",
      color: "#22c55e",
    },
    {
      id: "t5",
      name: "River de Yerba Buena",
      shortName: "RY",
      city: "Yerba Buena",
      color: "#a855f7",
    },
    {
      id: "t6",
      name: "Racing de Monteros",
      shortName: "RM",
      city: "Monteros",
      color: "#f59e0b",
    },
  ],
  upcomingMatches: [
    {
      id: "m1",
      round: "Fecha 12",
      date: "Sáb 09 Ago",
      time: "16:00",
      venue: "Cancha Central",
      home: "San Martín",
      away: "Atlético Norte",
    },
    {
      id: "m2",
      round: "Fecha 12",
      date: "Sáb 09 Ago",
      time: "18:00",
      venue: "Estadio Norte",
      home: "Unión Sur",
      away: "Central Oeste",
    },
    {
      id: "m3",
      round: "Fecha 12",
      date: "Dom 10 Ago",
      time: "15:30",
      venue: "Cancha Central",
      home: "River YB",
      away: "Racing Monteros",
    },
  ],
};