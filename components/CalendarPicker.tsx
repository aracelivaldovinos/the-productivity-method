import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants/theme";

interface Props {
  markedDates: Set<string>;
  onDayPress: (date: string) => void;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function CalendarPicker({ markedDates, onDayPress }: Props) {
  const todayStr = today();
  const now = new Date(todayStr + "T00:00:00");

  const [view, setView] = useState({ year: now.getFullYear(), month: now.getMonth() });

  const isCurrentMonth = view.year === now.getFullYear() && view.month === now.getMonth();

  const prevMonth = () => {
    setView((v) => v.month === 0
      ? { year: v.year - 1, month: 11 }
      : { year: v.year, month: v.month - 1 }
    );
  };

  const nextMonth = () => {
    if (isCurrentMonth) return;
    setView((v) => v.month === 11
      ? { year: v.year + 1, month: 0 }
      : { year: v.year, month: v.month + 1 }
    );
  };

  const firstDayOfWeek = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

  // Grid cells: null = empty leading cell, number = day
  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <View style={{ backgroundColor: colors.card, borderRadius: 8, padding: 40, borderWidth: 1, borderColor: "#e4e4e0" }}>
      {/* Month navigation */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <TouchableOpacity onPress={prevMonth} style={{ padding: 6 }}>
          <Feather name="chevron-left" size={18} color={colors.ink} />
        </TouchableOpacity>
        <Text style={{ fontSize: 15, fontWeight: "600", color: colors.ink, letterSpacing: 0.5 }}>
          {MONTH_NAMES[view.month]} {view.year}
        </Text>
        <TouchableOpacity onPress={nextMonth} style={{ padding: 6, opacity: isCurrentMonth ? 0.25 : 1 }}>
          <Feather name="chevron-right" size={18} color={colors.ink} />
        </TouchableOpacity>
      </View>

      {/* Day labels */}
      <View style={{ flexDirection: "row", marginBottom: 8 }}>
        {DAY_LABELS.map((d) => (
          <Text key={d} style={{ flex: 1, textAlign: "center", fontSize: 12, color: colors.muted, letterSpacing: 0.5 }}>
            {d}
          </Text>
        ))}
      </View>

      {/* Weeks */}
      {Array.from({ length: cells.length / 7 }, (_, week) => (
        <View key={week} style={{ flexDirection: "row", marginBottom: 2 }}>
          {cells.slice(week * 7, week * 7 + 7).map((day, i) => {
            if (!day) return <View key={i} style={{ flex: 1 }} />;

            const dateStr = toDateStr(view.year, view.month, day);
            const isToday = dateStr === todayStr;
            const isFuture = dateStr > todayStr;
            const hasData = markedDates.has(dateStr);

            return (
              <TouchableOpacity
                key={i}
                onPress={() => !isFuture && onDayPress(dateStr)}
                disabled={isFuture}
                style={{ flex: 1, alignItems: "center", paddingVertical: 6 }}
              >
                <View
                  style={{
                    width: 40, height: 40, borderRadius: 20,
                    alignItems: "center", justifyContent: "center",
                    backgroundColor: isToday ? colors.ink : "transparent",
                  }}
                >
                  <Text style={{
                    fontSize: 16,
                    color: isFuture ? colors.faint : isToday ? colors.card : colors.ink,
                    fontWeight: isToday ? "700" : "400",
                  }}>
                    {day}
                  </Text>
                </View>
                {hasData && (
                  <View style={{
                    width: 5, height: 5, borderRadius: 3, marginTop: 2,
                    backgroundColor: isToday ? colors.card : colors.accent,
                  }} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}
