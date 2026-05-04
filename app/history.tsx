import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { PlannerTab } from "../hooks/usePlanner";
import CalendarPicker from "../components/CalendarPicker";
import { colors } from "../constants/theme";

const TABS: { key: PlannerTab; label: string }[] = [
  { key: "personal", label: "Personal" },
  { key: "work",     label: "Work" },
  { key: "project",  label: "Project" },
  { key: "study",    label: "Study" },
];

export default function HistoryScreen() {
  const params = useLocalSearchParams<{ tab?: PlannerTab }>();
  const [activeTab, setActiveTab] = useState<PlannerTab>(params.tab ?? "personal");
  const [markedDates, setMarkedDates] = useState<Set<string>>(new Set());
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  // Find all dates with saved data for this tab
  useEffect(() => {
    AsyncStorage.getAllKeys().then((keys) => {
      const prefix = `planner_`;
      const suffix = `_${activeTab}`;
      const dates = keys
        .filter((k) => k.startsWith(prefix) && k.endsWith(suffix))
        .map((k) => k.replace(prefix, "").replace(suffix, ""));
      setMarkedDates(new Set(dates));
    });
  }, [activeTab]);

  const onDayPress = (date: string) => {
    router.push({ pathname: "/", params: { date, tab: activeTab } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Header */}
      <View style={{
        flexDirection: "row", alignItems: "center",
        paddingTop: 48, paddingBottom: 16,
        paddingHorizontal: isTablet ? 40 : 20,
        borderBottomWidth: 1, borderBottomColor: colors.faint,
        backgroundColor: colors.card,
      }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
        >
          <Feather name="arrow-left" size={16} color={colors.muted} />
          <Text style={{ fontSize: 12, color: colors.muted }}>Back</Text>
        </TouchableOpacity>
        <Text style={{
          flex: 1, textAlign: "center", fontSize: 13,
          letterSpacing: 3, color: colors.ink, fontStyle: "italic", fontFamily: "Georgia",
        }}>
          History
        </Text>
        <View style={{ width: 50 }} />
      </View>

      {/* Tab selector */}
      <View style={{
        flexDirection: "row", justifyContent: "center", gap: 8,
        paddingVertical: 16, backgroundColor: colors.card,
        borderBottomWidth: 1, borderBottomColor: colors.faint,
      }}>
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={{
                paddingHorizontal: 16, paddingVertical: 6,
                borderRadius: 4, borderWidth: 1,
                borderColor: isActive ? colors.ink : colors.faint,
                backgroundColor: isActive ? colors.ink : "transparent",
              }}
            >
              <Text style={{ fontSize: 11, color: isActive ? colors.card : colors.muted, fontWeight: isActive ? "600" : "400" }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Calendar */}
      <View style={{ maxWidth: 1200, width: "100%", alignSelf: "center", padding: 40 }}>
        <CalendarPicker markedDates={markedDates} onDayPress={onDayPress} />

        {/* Legend */}
        <View style={{ flexDirection: "row", justifyContent: "center", gap: 24, marginTop: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent }} />
            <Text style={{ fontSize: 11, color: colors.muted }}>Has entries</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.ink, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 10, color: colors.card, fontWeight: "700" }}>1</Text>
            </View>
            <Text style={{ fontSize: 11, color: colors.muted }}>Today</Text>
          </View>
        </View>

        <Text style={{ textAlign: "center", fontSize: 11, color: colors.muted, marginTop: 16 }}>
          Tap any day to open that plan
        </Text>
      </View>
    </View>
  );
}
