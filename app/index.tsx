import { ScrollView, View, Text, useWindowDimensions } from "react-native";
import { usePlanner } from "../hooks/usePlanner";
import DailyFocus from "../components/DailyFocus";
import TodoTable from "../components/TodoTable";
import NonNegotiables from "../components/NonNegotiables";
import TimeBlock from "../components/TimeBlock";
import FocusReview from "../components/FocusReview";
import Reflection from "../components/Reflection";
import { colors } from "../constants/theme";

function today() {
  return new Date().toISOString().split("T")[0];
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function PlannerScreen() {
  const date = today();
  const { plan, update, loading } = usePlanner(date);
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg }}>
        <Text style={{ color: colors.muted, fontSize: 14 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Title */}
      <Text
        style={{
          textAlign: "center",
          fontSize: 13,
          letterSpacing: 4,
          color: colors.ink,
          fontStyle: "italic",
          paddingTop: 32,
          paddingBottom: 20,
          fontFamily: "Georgia",
        }}
      >
        8 - M I N U T E   D A I L Y   P L A N N I N G   M E T H O D
      </Text>

      {/* White card — grows to fit all content */}
      <View
        style={{
          backgroundColor: colors.card,
          marginHorizontal: isTablet ? 40 : 16,
          marginBottom: 40,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: "#e4e4e0",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          elevation: 2,
          flexDirection: isTablet ? "row" : "column",
          alignItems: isTablet ? "flex-start" : undefined,
        }}
      >
        {/* LEFT COLUMN */}
        <View style={{ flex: isTablet ? 1 : undefined, padding: isTablet ? 32 : 20 }}>
          <DailyFocus plan={plan} update={update} />
          <TodoTable plan={plan} update={update} />
          <NonNegotiables plan={plan} update={update} />
        </View>

        {/* Vertical divider */}
        {isTablet && (
          <View style={{ width: 1, backgroundColor: "#e4e4e0", alignSelf: "stretch" }} />
        )}

        {/* RIGHT COLUMN */}
        <View style={{ flex: isTablet ? 1 : undefined, padding: isTablet ? 32 : 20 }}>
          {/* Date */}
          <View style={{ alignItems: "flex-end", marginBottom: 24 }}>
            <Text style={{ fontSize: 10, letterSpacing: 1.5, color: colors.muted, marginBottom: 4 }}>
              DATE
            </Text>
            <View
              style={{
                borderWidth: 1, borderColor: colors.faint,
                borderRadius: 4, paddingHorizontal: 12, paddingVertical: 5,
              }}
            >
              <Text style={{ fontSize: 12, color: colors.ink }}>{formatDate(date)}</Text>
            </View>
          </View>

          <TimeBlock plan={plan} update={update} />
          <FocusReview plan={plan} update={update} />
          <Reflection plan={plan} update={update} />
        </View>
      </View>
    </ScrollView>
  );
}
