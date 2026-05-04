import { View, Text } from "react-native";
import { DailyPlan } from "../types/planner";
import SectionHeader from "./SectionHeader";
import { colors } from "../constants/theme";

interface Props {
  plan: DailyPlan;
  update: <K extends keyof DailyPlan>(field: K, value: DailyPlan[K]) => void;
}

export default function FocusReview({ plan, update }: Props) {
  return (
    <View style={{ marginBottom: 28 }}>
      <SectionHeader number={5} title="DAILY FOCUS REVIEW" leftIcon="moon" />

      <View
        style={{
          backgroundColor: colors.grayBox,
          borderRadius: 6,
          padding: 16,
        }}
      >
        <Text style={{ fontSize: 12, color: colors.muted }}>
          Review your Daily Focuses and rate how you achieved them
        </Text>
      </View>
    </View>
  );
}
