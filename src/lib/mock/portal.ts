export type MatchStatus = "live" | "scheduled" | "finished";

export type Team = {
  _id: string;
  id: string;
  name: string;
  shortName: string;
  city: string;
  founded: number;
  color: string;
  form?: Array<"W" | "D" | "L">;
  createdAt: string;
  updatedAt: string;
};

export type MatchStats = {
  possession: [number, number];
  shots: [number, number];
  shotsOnTarget: [number, number];
  corners: [number, number];
};

export type MatchEvent = {
  id: string;
  type: "goal" | "card";
  teamId: string;
  player: string;
  minute: string;
  detail?: string;
};

export type Match = {
  id: string;
  status: MatchStatus;
  round: string;
  venue: string;
  date: string;
  time: string;
  home: Team;
  away: Team;
  homeScore?: number;
  awayScore?: number;
  minute?: string;
  events: MatchEvent[];
  stats?: MatchStats;
};

export type StandingRow = {
  id: string;
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
};

export type TopScorer = {
  id: string;
  name: string;
  team: Team;
  position?: string;
  goals: number;
  assists: number;
};

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author?: string;
  readTime?: string;
  team?: Team;
};

export const portalTeams: Team[] = [
  { _id: "t1", id: "t1", name: "San Martín", shortName: "SM", city: "San Miguel de Tucumán", founded: 1909, color: "#f5c542", form: ["W", "W", "D", "W", "W"], createdAt: "2026-07-01T12:00:00.000Z", updatedAt: "2026-08-10T12:00:00.000Z" },
  { _id: "t2", id: "t2", name: "Atlético Norte", shortName: "AN", city: "San Miguel de Tucumán", founded: 1915, color: "#ef4444", form: ["W", "D", "W", "W", "L"], createdAt: "2026-07-01T12:00:00.000Z", updatedAt: "2026-08-10T12:00:00.000Z" },
  { _id: "t3", id: "t3", name: "Unión Sur", shortName: "US", city: "Tafí Viejo", founded: 1923, color: "#3b82f6", form: ["D", "L", "W", "D", "L"], createdAt: "2026-07-01T12:00:00.000Z", updatedAt: "2026-08-10T12:00:00.000Z" },
  { _id: "t4", id: "t4", name: "Central Oeste", shortName: "CO", city: "Concepción", founded: 1918, color: "#22c55e", form: ["L", "D", "L", "D", "D"], createdAt: "2026-07-01T12:00:00.000Z", updatedAt: "2026-08-10T12:00:00.000Z" },
  { _id: "t5", id: "t5", name: "River Yerba Buena", shortName: "RY", city: "Yerba Buena", founded: 1946, color: "#a855f7", form: ["W", "W", "L", "W", "D"], createdAt: "2026-07-01T12:00:00.000Z", updatedAt: "2026-08-10T12:00:00.000Z" },
  { _id: "t6", id: "t6", name: "Racing Monteros", shortName: "RM", city: "Monteros", founded: 1937, color: "#f59e0b", form: ["L", "W", "W", "L", "L"], createdAt: "2026-07-01T12:00:00.000Z", updatedAt: "2026-08-10T12:00:00.000Z" },
];

export const featuredMatch: Match = {
  id: "m-live",
  status: "live",
  round: "Fecha 12",
  venue: "Estadio Central · San Miguel de Tucumán",
  date: "Sábado 9 de agosto",
  time: "16:00",
  minute: "63’",
  home: portalTeams[0],
  away: portalTeams[1],
  homeScore: 2,
  awayScore: 1,
  events: [
    { id: "e1", type: "goal", teamId: "t1", player: "L. Aguirre", minute: "12’" },
    { id: "e2", type: "goal", teamId: "t2", player: "M. Peralta", minute: "28’" },
    { id: "e3", type: "card", teamId: "t2", player: "D. Medina", minute: "41’", detail: "Tarjeta amarilla" },
    { id: "e4", type: "goal", teamId: "t1", player: "J. Herrera", minute: "57’" },
  ],
  stats: {
    possession: [58, 42],
    shots: [14, 9],
    shotsOnTarget: [7, 4],
    corners: [6, 3],
  },
};

export const recentResults: Match[] = [
  {
    id: "r1",
    status: "finished",
    round: "Fecha 11",
    venue: "Cancha Norte",
    date: "Dom 3 ago",
    time: "16:00",
    home: portalTeams[2],
    away: portalTeams[3],
    homeScore: 1,
    awayScore: 1,
    events: [],
  },
  {
    id: "r2",
    status: "finished",
    round: "Fecha 11",
    venue: "Cancha Central",
    date: "Dom 3 ago",
    time: "18:00",
    home: portalTeams[4],
    away: portalTeams[5],
    homeScore: 3,
    awayScore: 2,
    events: [],
  },
  {
    id: "r3",
    status: "finished",
    round: "Fecha 11",
    venue: "Estadio Sur",
    date: "Sáb 2 ago",
    time: "16:00",
    home: portalTeams[3],
    away: portalTeams[0],
    homeScore: 0,
    awayScore: 0,
    events: [],
  },
  {
    id: "r4",
    status: "finished",
    round: "Fecha 11",
    venue: "Cancha YB",
    date: "Sáb 2 ago",
    time: "17:30",
    home: portalTeams[1],
    away: portalTeams[2],
    homeScore: 2,
    awayScore: 1,
    events: [],
  },
  {
    id: "r5",
    status: "finished",
    round: "Fecha 11",
    venue: "Cancha Central",
    date: "Vie 1 ago",
    time: "20:00",
    home: portalTeams[5],
    away: portalTeams[4],
    homeScore: 1,
    awayScore: 0,
    events: [],
  },
];

export const upcomingMatches: Match[] = [
  {
    id: "u1",
    status: "scheduled",
    round: "Fecha 13",
    venue: "Cancha Central",
    date: "Sáb 16 ago",
    time: "16:00",
    home: portalTeams[2],
    away: portalTeams[1],
    events: [],
  },
  {
    id: "u2",
    status: "scheduled",
    round: "Fecha 13",
    venue: "Estadio Norte",
    date: "Sáb 16 ago",
    time: "18:00",
    home: portalTeams[0],
    away: portalTeams[5],
    events: [],
  },
  {
    id: "u3",
    status: "scheduled",
    round: "Fecha 13",
    venue: "Cancha Sur",
    date: "Dom 17 ago",
    time: "15:30",
    home: portalTeams[4],
    away: portalTeams[3],
    events: [],
  },
];

export const matches: Match[] = [
  featuredMatch,
  ...recentResults,
  ...upcomingMatches,
];

export const standings: StandingRow[] = [
  { id: "s1", position: 1, team: portalTeams[0], played: 12, won: 9, drawn: 2, lost: 1, gf: 28, ga: 12, gd: 16, points: 29 },
  { id: "s2", position: 2, team: portalTeams[1], played: 12, won: 8, drawn: 3, lost: 1, gf: 24, ga: 11, gd: 13, points: 27 },
  { id: "s3", position: 3, team: portalTeams[4], played: 12, won: 7, drawn: 2, lost: 3, gf: 22, ga: 15, gd: 7, points: 23 },
  { id: "s4", position: 4, team: portalTeams[5], played: 12, won: 6, drawn: 2, lost: 4, gf: 18, ga: 16, gd: 2, points: 20 },
  { id: "s5", position: 5, team: portalTeams[2], played: 12, won: 4, drawn: 3, lost: 5, gf: 15, ga: 17, gd: -2, points: 15 },
  { id: "s6", position: 6, team: portalTeams[3], played: 12, won: 2, drawn: 4, lost: 6, gf: 10, ga: 18, gd: -8, points: 10 },
];

export const topScorers: TopScorer[] = [
  { id: "sc1", name: "L. Aguirre", team: portalTeams[0], position: "Delantero", goals: 11, assists: 4 },
  { id: "sc2", name: "M. Peralta", team: portalTeams[1], position: "Extremo", goals: 9, assists: 6 },
  { id: "sc3", name: "F. Roldán", team: portalTeams[4], position: "Delantero", goals: 8, assists: 2 },
  { id: "sc4", name: "J. Herrera", team: portalTeams[0], position: "Mediocampista", goals: 7, assists: 5 },
  { id: "sc5", name: "S. Bravo", team: portalTeams[5], position: "Delantero", goals: 6, assists: 3 },
];

export const news: NewsItem[] = [
  {
    id: "n1",
    title: "San Martín 2 Atlético Norte 1: el líder no se detiene",
    excerpt: "Con goles de Aguirre y Herrera, el puntero estira su ventaja en la Fecha 12.",
    category: "Partidos",
    date: "Hace 25 min",
    author: "Camila Reyes",
    readTime: "4 min",
    team: portalTeams[0],
  },
  {
    id: "n2",
    title: "Racing Monteros da la sorpresa y frena la racha de River YB",
    excerpt: "Un gol de Bravo en tiempo de descuento define un partido caliente en Cancha Central.",
    category: "Partidos",
    date: "Hace 2 h",
    author: "Martín Ferreyra",
    readTime: "3 min",
    team: portalTeams[5],
  },
  {
    id: "n3",
    title: "Unión Sur y Central Oeste reparten puntos en un clásico parejo",
    excerpt: "El empate mantiene la mitad baja de la tabla al rojo vivo de cara a las últimas fechas.",
    category: "Partidos",
    date: "Ayer",
    author: "Lucía Domínguez",
    readTime: "5 min",
    team: portalTeams[2],
  },
  {
    id: "n4",
    title: "El mercado de invierno: los refuerzos que buscan inclinar los play-offs",
    excerpt: "Delegados de los seis clubes anticipan movimientos de última hora antes del cierre del pase.",
    category: "Transferencias",
    date: "Hace 5 h",
    author: "Martín Ferreyra",
    readTime: "6 min",
  },
  {
    id: "n5",
    title: "DT del líder: \"La base está, nos falta dar el último paso\"",
    excerpt: "El técnico de San Martín repasa la Fecha 12 y proyecta el tramo final de la temporada.",
    category: "Entrevistas",
    date: "Hace 8 h",
    author: "Camila Reyes",
    readTime: "7 min",
    team: portalTeams[0],
  },
  {
    id: "n6",
    title: "Detrás de escena: así prepara el puntero las definiciones",
    excerpt: "Un viaje a la concentración de San Martín para ver cómo construye su camino a la final.",
    category: "Equipos",
    date: "Ayer",
    author: "Lucía Domínguez",
    readTime: "5 min",
    team: portalTeams[0],
  },
  {
    id: "n7",
    title: "L. Aguirre, la máquina de goles que define la temporada",
    excerpt: "El goleador del torneo ya lleva once tantos y sueña con el récord absoluto de la Tucumán Cup.",
    category: "Jugadores",
    date: "Hace 1 día",
    author: "Camila Reyes",
    readTime: "4 min",
    team: portalTeams[0],
  },
  {
    id: "n8",
    title: "Racing Monteros tiene ofertas por Bravo de cara a la próxima edición",
    excerpt: "El interés de clubes de la región pone en vilo la continuidad de su goleador.",
    category: "Transferencias",
    date: "Hace 1 día",
    author: "Martín Ferreyra",
    readTime: "3 min",
    team: portalTeams[5],
  },
  {
    id: "n9",
    title: "Racing Monteros sorprende: \"Nuestro objetivo es la semifinal\"",
    excerpt: "Tras frenar la racha de River YB, el plantel sueña con un cierre de temporada histórico.",
    category: "Entrevistas",
    date: "Hace 2 días",
    author: "Lucía Domínguez",
    readTime: "5 min",
    team: portalTeams[5],
  },
];

export const matchStatusMeta: Record<
  MatchStatus,
  { label: string; variant: "live" | "default" | "outline" }
> = {
  live: { label: "En vivo", variant: "live" },
  scheduled: { label: "Próximo", variant: "default" },
  finished: { label: "Finalizado", variant: "outline" },
};

export type Sponsor = {
  id: string;
  name: string;
  logo?: string;
  url?: string;
};

export const sponsors: Sponsor[] = [
  { id: "sp1", name: "AeroNorte" },
  { id: "sp2", name: "Banco del Tucumán" },
  { id: "sp3", name: "Ingenio La Trinidad" },
  { id: "sp4", name: "Cerro Azul" },
  { id: "sp5", name: "Norte Sports" },
  { id: "sp6", name: "Grupo Andino" },
];

export type TournamentInfo = {
  teamsCount: number;
  matchesPlayed: number;
  goalsScored: number;
  avgGoals: number;
};

export const tournamentInfo: TournamentInfo = {
  teamsCount: 6,
  matchesPlayed: 36,
  goalsScored: 117,
  avgGoals: 3.25,
};