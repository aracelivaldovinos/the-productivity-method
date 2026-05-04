import { ScrollView, View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { usePlanner, PlannerTab } from "../hooks/usePlanner";
import DailyFocus from "../components/DailyFocus";
import TodoTable from "../components/TodoTable";
import NonNegotiables from "../components/NonNegotiables";
import TimeBlock from "../components/TimeBlock";
import FocusReview from "../components/FocusReview";
import Reflection from "../components/Reflection";
import TabBar from "../components/TabBar";
import { colors } from "../constants/theme";

function today() {
  return new Date().toISOString().split("T")[0];
}

function shiftDate(dateStr: string, days: number) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

export default function PlannerScreen() {
  const params = useLocalSearchParams<{ date?: string; tab?: PlannerTab }>();
  const [date, setDate] = useState(params.date ?? today());
  const [activeTab, setActiveTab] = useState<PlannerTab>(params.tab ?? "personal");
  const isToday = date === today();
  const { plan, update, loading } = usePlanner(date, activeTab);
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg }}>
        <Text style={{ color: colors.muted, fontSize: 14 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Title row with history button */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 32, paddingBottom: 20, paddingHorizontal: isTablet ? 40 : 16 }}>
        <View style={{ flex: 1 }} />
        <Text
          style={{
            flex: 2, textAlign: "center", fontSize: 13, letterSpacing: 4,
            color: colors.ink, fontStyle: "italic", fontFamily: "Georgia",
          }}
        >
          8 - M I N U T E   D A I L Y   P L A N N I N G   M E T H O D
        </Text>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => router.push({ pathname: "/history", params: { tab: activeTab } })}
            style={{
              flexDirection: "row", alignItems: "center", gap: 5,
              paddingHorizontal: 12, paddingVertical: 6,
              borderWidth: 1, borderColor: colors.faint, borderRadius: 4,
            }}
          >
            <Feather name="calendar" size={13} color={colors.muted} />
            <Text style={{ fontSize: 11, color: colors.muted }}>History</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TabBar active={activeTab} onChange={setActiveTab} />

      {/* White card */}
      <View
        style={{
          backgroundColor: colors.card,
          marginHorizontal: isTablet ? 40 : 16,
          marginBottom: 40,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          borderWidth: 1,
          borderColor: "#e4e4e0",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          elevation: 2,
          flexDirection: isTablet ? "row" : "column",
          alignItems: isTablet ? "flex-start" : undefined,
        }}
      >
        {/* LEFT COLUMN */}
        <View style={{ flex: isTablet ? 1 : undefined, padding: isTablet ? 32 : 20 }}>
          <DailyFocus plan={plan} update={update} />
          <TodoTable plan={plan} update={update} />
          <NonNegotiables plan={plan} update={update} />
        </View>

        {isTablet && <View style={{ width: 1, backgroundColor: "#e4e4e0", alignSelf: "stretch" }} />}

        {/* RIGHT COLUMN */}
        <View style={{ flex: isTablet ? 1 : undefined, padding: isTablet ? 32 : 20 }}>
          {/* Date navigator */}
          <View style={{ alignItems: "flex-end", marginBottom: 24 }}>
            <Text style={{ fontSize: 10, letterSpacing: 1.5, color: colors.muted, marginBottom: 6 }}>DATE</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <TouchableOpacity
                onPress={() => setDate(shiftDate(date, -1))}
                style={{ width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: colors.faint, alignItems: "center", justifyContent: "center" }}
              >
                <Text style={{ color: colors.muted, fontSize: 14 }}>‹</Text>
              </TouchableOpacity>

              <View style={{ borderWidth: 1, borderColor: colors.faint, borderRadius: 4, paddingHorizontal: 12, paddingVertical: 5 }}>
                <Text style={{ fontSize: 12, color: colors.ink }}>{formatDate(date)}</Text>
              </View>

              <TouchableOpacity
                onPress={() => !isToday && setDate(shiftDate(date, 1))}
                style={{ width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: isToday ? "#f0f0ee" : colors.faint, alignItems: "center", justifyContent: "center" }}
              >
                <Text style={{ color: isToday ? "#ccc" : colors.muted, fontSize: 14 }}>›</Text>
              </TouchableOpacity>
            </View>

            {!isToday && (
              <TouchableOpacity onPress={() => setDate(today())} style={{ marginTop: 6 }}>
                <Text style={{ fontSize: 10, color: colors.accent, textDecorationLine: "underline" }}>Back to today</Text>
              </TouchableOpacity>
            )}
          </View>

          <TimeBlock plan={plan} update={update} />
          <FocusReview plan={plan} update={update} />
          <Reflection plan={plan} update={update} />
        </View>
      </View>
    </ScrollView>
  );
}
