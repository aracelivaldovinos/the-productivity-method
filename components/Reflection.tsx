import { View, Text, TextInput } from "react-native";
import { DailyPlan } from "../types/planner";
import SectionHeader from "./SectionHeader";
import { colors } from "../constants/theme";

interface Props {
  plan: DailyPlan;
  update: <K extends keyof DailyPlan>(field: K, value: DailyPlan[K]) => void;
}

export default function Reflection({ plan, update }: Props) {
  return (
    <View style={{ marginBottom: 20 }}>
      <SectionHeader number={6} title="END OF DAY REFLECTION" leftIcon="moon" />

      <Text style={{ fontSize: 12, color: colors.ink, marginBottom: 8 }}>
        1. One thing I am proud of today is:
      </Text>
      <TextInput
        style={{
          borderBottomWidth: 1, borderBottomColor: colors.faint,
          fontSize: 12, color: colors.ink, paddingVertical: 3, marginBottom: 20,
          minHeight: 60, textAlignVertical: "top",
        }}
        value={plan.proudOf}
        onChangeText={(t) => update("proudOf", t)}
        placeholderTextColor={colors.faint}
        multiline
        textAlignVertical="top"
      />

      <Text style={{ fontSize: 12, color: colors.ink, marginBottom: 8 }}>
        2. One thing I can do better tomorrow is:
      </Text>
      <TextInput
        style={{
          borderBottomWidth: 1, borderBottomColor: colors.faint,
          fontSize: 12, color: colors.ink, paddingVertical: 3, marginBottom: 28,
          minHeight: 60, textAlignVertical: "top",
        }}
        value={plan.doBetter}
        onChangeText={(t) => update("doBetter", t)}
        placeholderTextColor={colors.faint}
        multiline
        textAlignVertical="top"
      />

      <Text
        style={{
          textAlign: "center", fontSize: 11, letterSpacing: 1.2,
          color: colors.ink, fontWeight: "500", marginBottom: 10,
        }}
      >
        NOTES:
      </Text>
      <View
        style={{
          backgroundColor: colors.grayBox,
          borderRadius: 6,
          padding: 16,
          minHeight: 160,
        }}
      >
        <TextInput
          style={{
            fontSize: 12, color: colors.ink,
            minHeight: 140, textAlignVertical: "top",
          }}
          value={plan.notes}
          onChangeText={(t) => update("notes", t)}
          placeholder="Add your notes here..."
          placeholderTextColor={colors.muted}
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
}
