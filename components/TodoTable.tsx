import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { DailyPlan, TodoItem, Priority } from "../types/planner";
import SectionHeader from "./SectionHeader";
import { colors } from "../constants/theme";

interface Props {
  plan: DailyPlan;
  update: <K extends keyof DailyPlan>(field: K, value: DailyPlan[K]) => void;
}

function PriorityBox({ value, onPress }: { value: Priority | null; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 20, height: 20,
        borderWidth: 1, borderColor: colors.faint,
        alignItems: "center", justifyContent: "center", marginRight: 4,
      }}
    >
      <Text style={{ fontSize: 8, color: colors.muted, letterSpacing: -1 }}>
        {value ? `${value}!` : "!!"}
      </Text>
    </TouchableOpacity>
  );
}

function CircleCheck({ done, onPress }: { done: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 16, height: 16, borderRadius: 8,
        borderWidth: 1, borderColor: colors.faint,
        alignItems: "center", justifyContent: "center", marginRight: 6,
        backgroundColor: done ? colors.accent : "transparent",
      }}
    >
      {done && <Text style={{ color: "#fff", fontSize: 8 }}>✓</Text>}
    </TouchableOpacity>
  );
}

function TodoRow({ item, onChange }: { item: TodoItem; onChange: (u: TodoItem) => void }) {
  const cyclePriority = () => {
    const next: Record<string, Priority | null> = { "1": 2, "2": 3, "3": null, "null": 1 };
    onChange({ ...item, priority: next[String(item.priority)] });
  };
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 6 }}>
      <PriorityBox value={item.priority} onPress={cyclePriority} />
      <CircleCheck done={item.done} onPress={() => onChange({ ...item, done: !item.done })} />
      <TextInput
        style={{
          flex: 1, borderBottomWidth: 1, borderBottomColor: colors.faint,
          fontSize: 11, color: colors.ink, paddingVertical: 1,
          minHeight: 52, textAlignVertical: "top",
          textDecorationLine: item.done ? "line-through" : "none",
        }}
        value={item.text}
        onChangeText={(text) => onChange({ ...item, text })}
        placeholderTextColor={colors.faint}
        multiline
        textAlignVertical="top"
      />
    </View>
  );
}

function GroupHeader({ label, timeLabel }: { label: string; timeLabel: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "baseline", marginBottom: 8 }}>
      <Text style={{ fontSize: 10, color: colors.muted, fontStyle: "italic", marginRight: 4 }}>
        priority-flow
      </Text>
      <Text style={{ fontSize: 11, color: colors.ink, fontWeight: "700", marginRight: 4 }}>
        {label}
      </Text>
      <Text style={{ fontSize: 10, color: colors.muted }}>{timeLabel}</Text>
    </View>
  );
}

function TodoGroup({ label, timeLabel, items, onUpdate }: {
  label: string; timeLabel: string; items: TodoItem[]; onUpdate: (i: TodoItem[]) => void;
}) {
  const updateItem = (index: number, updated: TodoItem) => {
    const next = [...items];
    next[index] = updated;
    onUpdate(next);
  };
  return (
    <View style={{ marginBottom: 16 }}>
      <GroupHeader label={label} timeLabel={timeLabel} />
      {items.map((item, i) => (
        <TodoRow key={item.id} item={item} onChange={(u) => updateItem(i, u)} />
      ))}
    </View>
  );
}

export default function TodoTable({ plan, update }: Props) {
  return (
    <View style={{ marginBottom: 28 }}>
      <SectionHeader number={2} title="WRITE OUT YOUR TO-DO TABLE" leftIcon="sun" />
      <View style={{ flexDirection: "row", gap: 16, marginBottom: 16 }}>
        <View style={{ flex: 1 }}>
          <TodoGroup label="QUICK TICKS" timeLabel="< 5mins"
            items={plan.quickTicks} onUpdate={(items) => update("quickTicks", items)} />
        </View>
        <View style={{ flex: 1 }}>
          <TodoGroup label="TASKS" timeLabel="> 15mins"
            items={plan.tasks} onUpdate={(items) => update("tasks", items)} />
        </View>
      </View>
      {/* PROJECTS spans full width */}
      <TodoGroup label="PROJECTS" timeLabel="> 3months"
        items={plan.projects} onUpdate={(items) => update("projects", items)} />
    </View>
  );
}
