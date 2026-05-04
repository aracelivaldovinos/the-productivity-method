import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants/theme";

interface Props {
  number: number;
  title: string;
  leftIcon?: "sun" | "moon";
  rightIcon?: "sun" | "moon";
}

function Icon({ type }: { type: "sun" | "moon" }) {
  return type === "sun"
    ? <Feather name="sun" size={13} color={colors.muted} />
    : <Text style={{ fontSize: 12, color: colors.muted }}>☽</Text>;
}

export default function SectionHeader({ number, title, leftIcon, rightIcon }: Props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}>
      {leftIcon
        ? <View style={{ marginRight: 6 }}><Icon type={leftIcon} /></View>
        : <View style={{ width: 19 }} />
      }
      <Text
        style={{
          flex: 1,
          fontSize: 11,
          letterSpacing: 1.2,
          color: colors.ink,
          fontWeight: "500",
        }}
      >
        {number} - {title}
      </Text>
      {rightIcon && (
        <View style={{ marginLeft: 6 }}><Icon type={rightIcon} /></View>
      )}
    </View>
  );
}
