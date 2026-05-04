import { View, Text } from "react-native";
import { colors } from "../constants/theme";

interface Props {
  number: number;
  title: string;
  leftIcon?: "sun" | "moon";
  rightIcon?: "sun" | "moon";
}

const SUN = "✦";
const MOON = "☽";

export default function SectionHeader({ number, title, leftIcon, rightIcon }: Props) {
  const iconChar = (icon: "sun" | "moon") => (icon === "sun" ? SUN : MOON);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 14, paddingBottom: 0 }}>
      {leftIcon && (
        <Text style={{ fontSize: 11, color: colors.muted, marginRight: 6 }}>
          {iconChar(leftIcon)}
        </Text>
      )}
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
        <Text style={{ fontSize: 11, color: colors.muted, marginLeft: 6 }}>
          {iconChar(rightIcon)}
        </Text>
      )}
    </View>
  );
}
