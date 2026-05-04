import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { DailyPlan } from "../types/planner";
import SectionHeader from "./SectionHeader";
import { colors } from "../constants/theme";

interface Props {
  plan: DailyPlan;
  update: <K extends keyof DailyPlan>(field: K, value: DailyPlan[K]) => void;
}

function FocusRow({
  number, label, value, done, onChangeText, onToggleDone,
}: {
  number: number; label: string; value: string; done: boolean;
  onChangeText: (t: string) => void; onToggleDone: () => void;
}) {
  return (
    <View style={{ marginBottom: 22 }}>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <Text style={{ fontSize: 11, color: colors.muted, marginRight: 8, marginTop: 1, width: 14 }}>
          {number}.
        </Text>
        <Text style={{ flex: 1, fontSize: 12, color: colors.ink }}>{label}</Text>
        <TouchableOpacity
          onPress={onToggleDone}
          style={{
            width: 18, height: 18, borderRadius: 9,
            borderWidth: 1, borderColor: colors.faint,
            alignItems: "center", justifyContent: "center", marginLeft: 10,
            backgroundColor: done ? colors.accent : "transparent",
          }}
        >
          {done && <Text style={{ color: "#fff", fontSize: 9 }}>✓</Text>}
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 22, marginTop: 8 }}>
        <TextInput
          style={{
            borderBottomWidth: 1, borderBottomColor: colors.faint,
            fontSize: 12, color: colors.ink, paddingVertical: 2,
            minHeight: 60, textAlignVertical: "top",
          }}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.faint}
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
}

export default function DailyFocus({ plan, update }: Props) {
  return (
    <View style={{ marginBottom: 28 }}>
      <SectionHeader number={1} title="SET YOUR DAILY FOCUS" leftIcon="sun" rightIcon="moon" />
      <FocusRow number={1} label="The attitude or mindset I will embody today is:"
        value={plan.mindset} done={plan.mindsetDone}
        onChangeText={(t) => update("mindset", t)}
        onToggleDone={() => update("mindsetDone", !plan.mindsetDone)} />
      <FocusRow number={2} label="A habit I will stick to today is:"
        value={plan.habit} done={plan.habitDone}
        onChangeText={(t) => update("habit", t)}
        onToggleDone={() => update("habitDone", !plan.habitDone)} />
      <FocusRow number={3} label="One distraction I will consciously avoid today is:"
        value={plan.distraction} done={plan.distractionDone}
        onChangeText={(t) => update("distraction", t)}
        onToggleDone={() => update("distractionDone", !plan.distractionDone)} />
    </View>
  );
}
