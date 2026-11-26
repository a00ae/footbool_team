export type PlayerPosition = "GK" | "LW" | "CF" | "RW" | "CM" | "LB" | "RB" | "ST";
type PlayerFoot = "R" | "L";
export type PositionColor = "amber" | "blue" | "cyan" | "emerald";
export interface PositionOption {
  value: string;
  title: string;
  subtitle: string;
  badge: string;
  color: PositionColor;
}

// بطاقة اللاعب
export interface Player {
  id: number;
  number: number;
  name: string;
  position: PlayerPosition;
  rating: string;
  foot: PlayerFoot;
  captain?: boolean;
}
// هيكل كل طاقم
export interface TeamLines {
  attacks: Player[];
  middle: Player[];
  goalkeeping: Player[];
}

// هيكل الفريقين
export interface MatchData {
  myTeam: TeamLines;
  opponent: TeamLines;
}

// --- تحديث نموذج البيانات (Interfaces) ---
export type TeamSide = "myTeam" | "opponent";
export type LineType = "attacks" | "middle";

export interface NewPlayerInput {
  name: string;
  number: number;
  position: PlayerPosition;
  color: string;
  team: TeamSide;
  line: LineType;
}