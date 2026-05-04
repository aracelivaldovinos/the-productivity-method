import { View, Text, TextInput, ScrollView } from "react-native";
import { DailyPlan, TimeBlock as TimeBlockType } from "../types/planner";
import SectionHeader from "./SectionHeader";
import { colors } from "../constants/theme";

interface Props {
  plan: DailyPlan;
  update: <K extends keyof DailyPlan>(field: K, value: DailyPlan[K]) => void;
}

export default function TimeBlock({ plan, update }: Props) {
  const updateBlock = (index: number, text: string) => {
    const next: TimeBlockType[] = [...plan.timeBlocks];
    next[index] = { ...next[index], text };
    update("timeBlocks", next);
  };

  return (
    <View style={{ marginBottom: 28 }}>
      <SectionHeader number={4} title="TIME-BLOCK YOUR SCHEDULE" leftIcon="sun" rightIcon="moon" />

      <ScrollView style={{ maxHeight: 1120 }} showsVerticalScrollIndicator={false} nestedScrollEnabled>
        {plan.timeBlocks.map((block, i) => (
          <View
            key={block.time}
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              borderBottomWidth: 1,
              borderBottomColor: colors.faint,
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 10, color: colors.muted, width: 58, paddingTop: 2 }}>
              {block.time}
            </Text>
            <TextInput
              style={{
                flex: 1, fontSize: 12, color: colors.ink,
                minHeight: 52, textAlignVertical: "top",
              }}
              value={block.text}
              onChangeText={(text) => updateBlock(i, text)}
              placeholderTextColor={colors.faint}
              multiline
              textAlignVertical="top"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
