import { MatchData, PositionOption } from "../types/index.js";

export const PLAYER_POSITIONS: PositionOption[] = [
  {
    value: "ST",
    title: "Striker (مهاجم صريح)",
    subtitle: "خط الهجوم",
    badge: "ST",
    color: "amber",
  },
  {
    value: "CF",
    title: "Center Forward (مهاجم ثاني)",
    subtitle: "خط الهجوم",
    badge: "CF",
    color: "amber",
  },
  {
    value: "LW",
    title: "Left Wing (جناح أيسر)",
    subtitle: "خط الهجوم",
    badge: "LW",
    color: "amber",
  },
  {
    value: "RW",
    title: "Right Wing (جناح أيمن)",
    subtitle: "خط الهجوم",
    badge: "RW",
    color: "amber",
  },
  {
    value: "CM",
    title: "Central Midfield (وسط محوري)",
    subtitle: "خط الوسط",
    badge: "CM",
    color: "blue",
  },
  {
    value: "CB",
    title: "Center Back (مدافع قلب)",
    subtitle: "خط الدفاع",
    badge: "CB",
    color: "cyan",
  },
  {
    value: "GK",
    title: "Goalkeeper (حارس مرمى)",
    subtitle: "حراسة المرمى",
    badge: "GK",
    color: "emerald",
  },
];



 // --- 4. هيكل البيانات الأساسي للمباراة ---

export const matchData: MatchData = {
  myTeam: {
    attacks: [
      { id: 1, number: 7, name: "Mohammed", position: "LW" },
      { id: 2, number: 10, name: "Yousef", position: "CF" },
      { id: 3, number: 11, name: "Ibrahim", position: "RW" },
    ],
    middle: [
      { id: 4, number: 5, name: "Yaman", position: "LB" },
      { id: 5, number: 8, name: "Fajr", position: "CM" },
      { id: 6, number: 4, name: "Hassan", position: "RB" },
    ],
    goalkeeping: [{ id: 7, number: 25, name: "Abo", position: "GK" }],
  },
  opponent: {
    attacks: [{ id: 7, number: 10, name: "Player X", position: "ST" }],
    middle: [{ id: 8, number: 6, name: "Player Y", position: "CM" }],
    goalkeeping: [{ id: 20, number: 1, name: "Player GK", position: "GK" }],
  },
};