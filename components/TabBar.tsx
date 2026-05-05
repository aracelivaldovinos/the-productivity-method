import { View, Text, TouchableOpacity } from "react-native";
import { PlannerTab } from "../hooks/usePlanner";
import { colors } from "../constants/theme";

interface Props {
  active: PlannerTab;
  onChange: (tab: PlannerTab) => void;
}

const TABS: { key: PlannerTab; label: string }[] = [
  { key: "personal", label: "Personal" },
  { key: "work",     label: "Work" },
  { key: "project",  label: "Project" },
  { key: "study",    label: "Study" },
];

export default function TabBar({ active, onChange }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        paddingHorizontal: 40,
        zIndex: 1,
        // Sits flush against the card below — no margin bottom
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={{
              paddingHorizontal: 36,
              paddingTop: 10,
              paddingBottom: 12,
              marginRight: 2,
              backgroundColor: isActive ? colors.card : "#e2e0db",
              // Active tab has no bottom border so it merges with the card
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopColor: isActive ? "#e4e4e0" : "#d4d2cd",
              borderLeftColor: isActive ? "#e4e4e0" : "#d4d2cd",
              borderRightColor: isActive ? "#e4e4e0" : "#d4d2cd",
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              // Active tab is slightly taller so it "rises" above the others
              marginBottom: isActive ? 0 : 3,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                letterSpacing: 0.5,
                color: isActive ? colors.ink : colors.muted,
                fontWeight: isActive ? "600" : "400",
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Fills the rest of the tab row with the card's top border */}
      <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: "#e4e4e0", height: 12 }} />
    </View>
  );
}
