export type Team = {
  _id: string;
  name: string;
  shortName: string;
  city: string;
  color: string;
  founded: number;
  category?: string;
  active?: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface CreateTeamInput {
  name: string;
  shortName: string;
  city: string;
  color: string;
  founded: number;
  category: string;
  active?: boolean;
}

export interface UpdateTeamInput {
  name?: string;
  shortName?: string;
  city?: string;
  color?: string;
  founded?: number;
  category?: string;
  active?: boolean;
}