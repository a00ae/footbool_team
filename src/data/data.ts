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
      { id: 1, number: 7, name: "Mohammed", position: "LW", rating: "88", foot: "R" },
      { id: 2, number: 10, name: "Yousef", position: "CF", rating: "90", foot: "R" },
      { id: 3, number: 11, name: "Ibrahim", position: "RW", rating: "90", foot: "R" },
    ],
    middle: [
      { id: 4, number: 5, name: "Yaman", position: "LB", rating: "88", foot: "R" },
      { id: 5, number: 8, name: "Fajr", position: "CM", rating: "89", foot: "R" },
      { id: 6, number: 4, name: "Hassan", position: "RB", rating: "88", foot: "R" },
    ],
    goalkeeping: [{ id: 7, number: 25, name: "Abo", position: "GK", rating: "84", foot: "R" }],
  },
  opponent: {
    attacks: [{ id: 7, number: 10, name: "Player X", position: "ST", rating: "92", foot: "L" }],
    middle: [{ id: 8, number: 6, name: "Player Y", position: "CM", rating: "87", foot: "R" }],
    goalkeeping: [{ id: 20, number: 1, name: "Player GK", position: "GK", rating: "95", foot: "R" }],
  },
};