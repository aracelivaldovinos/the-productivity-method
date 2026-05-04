import { View, Text, TextInput } from "react-native";
import { DailyPlan } from "../types/planner";
import { colors } from "../constants/theme";

interface Props {
  plan: DailyPlan;
  update: <K extends keyof DailyPlan>(field: K, value: DailyPlan[K]) => void;
}

export default function NonNegotiables({ plan, update }: Props) {
  const setItem = (index: number, text: string) => {
    const next: [string, string, string] = [...plan.nonNegotiables] as [string, string, string];
    next[index] = text;
    update("nonNegotiables", next);
  };

  return (
    <View
      style={{
        backgroundColor: colors.grayBox,
        borderRadius: 6,
        padding: 20,
        marginBottom: 0,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 11,
          letterSpacing: 1.2,
          color: colors.ink,
          fontWeight: "500",
          marginBottom: 4,
        }}
      >
        3 - THREE NON-NEGOTIABLE THINGS
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 11,
          letterSpacing: 1.2,
          color: colors.ink,
          fontWeight: "500",
          marginBottom: 20,
        }}
      >
        I'LL GET DONE TODAY
      </Text>

      {([0, 1, 2] as const).map((i) => (
        <View key={i} style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 16 }}>
          <Text style={{ fontSize: 12, color: colors.ink, marginRight: 10, width: 16, paddingTop: 4 }}>{i + 1}.</Text>
          <TextInput
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderBottomColor: colors.faint,
              fontSize: 12,
              color: colors.ink,
              paddingVertical: 2,
              minHeight: 52,
              textAlignVertical: "top",
            }}
            value={plan.nonNegotiables[i]}
            onChangeText={(text) => setItem(i, text)}
            placeholderTextColor={colors.faint}
            multiline
            textAlignVertical="top"
          />
        </View>
      ))}
    </View>
  );
}
