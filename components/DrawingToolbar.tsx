import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants/theme";

interface Props {
  drawMode: boolean;
  onToggle: () => void;
  onUndo: () => void;
  onClear: () => void;
  strokeCount: number;
}

export default function DrawingToolbar({ drawMode, onToggle, onUndo, onClear, strokeCount }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 8,
        paddingHorizontal: 40,
        paddingVertical: 10,
      }}
    >
      {/* Undo & Clear — only shown in draw mode */}
      {drawMode && strokeCount > 0 && (
        <>
          <TouchableOpacity
            onPress={onUndo}
            style={{
              flexDirection: "row", alignItems: "center", gap: 4,
              paddingHorizontal: 10, paddingVertical: 5,
              borderWidth: 1, borderColor: colors.faint, borderRadius: 4,
            }}
          >
            <Feather name="corner-up-left" size={12} color={colors.muted} />
            <Text style={{ fontSize: 11, color: colors.muted }}>Undo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClear}
            style={{
              flexDirection: "row", alignItems: "center", gap: 4,
              paddingHorizontal: 10, paddingVertical: 5,
              borderWidth: 1, borderColor: colors.faint, borderRadius: 4,
            }}
          >
            <Feather name="trash-2" size={12} color={colors.muted} />
            <Text style={{ fontSize: 11, color: colors.muted }}>Clear</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Draw mode toggle */}
      <TouchableOpacity
        onPress={onToggle}
        style={{
          flexDirection: "row", alignItems: "center", gap: 5,
          paddingHorizontal: 14, paddingVertical: 6,
          borderWidth: 1,
          borderColor: drawMode ? colors.ink : colors.faint,
          borderRadius: 4,
          backgroundColor: drawMode ? colors.ink : "transparent",
        }}
      >
        <Feather name="edit-3" size={13} color={drawMode ? colors.card : colors.muted} />
        <Text style={{ fontSize: 11, color: drawMode ? colors.card : colors.muted, fontWeight: drawMode ? "600" : "400" }}>
          {drawMode ? "Drawing" : "Draw"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
