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