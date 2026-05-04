import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DailyPlan, TodoItem } from "../types/planner";
import { TIME_SLOTS, QUICK_TICK_SLOTS, TASK_SLOTS, PROJECT_SLOTS } from "../constants/theme";

// Creates a fresh empty planner for a given date
function createEmptyPlan(date: string): DailyPlan {
  const makeTodos = (count: number): TodoItem[] =>
    Array.from({ length: count }, (_, i) => ({
      id: `${i}`,
      text: "",
      priority: null,
      done: false,
    }));

  return {
    date,
    mindset: "",
    mindsetDone: false,
    habit: "",
    habitDone: false,
    distraction: "",
    distractionDone: false,
    quickTicks: makeTodos(QUICK_TICK_SLOTS),
    tasks: makeTodos(TASK_SLOTS),
    projects: makeTodos(PROJECT_SLOTS),
    nonNegotiables: ["", "", ""],
    timeBlocks: TIME_SLOTS.map((time) => ({ time, text: "" })),
    focusReviewDone: false,
    proudOf: "",
    doBetter: "",
    notes: "",
  };
}

function storageKey(date: string) {
  return `planner_${date}`;
}

export function usePlanner(date: string) {
  const [plan, setPlan] = useState<DailyPlan>(() => createEmptyPlan(date));
  const [loading, setLoading] = useState(true);

  // Load plan from AsyncStorage when date changes
  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem(storageKey(date)).then((raw) => {
      if (raw) {
        setPlan(JSON.parse(raw));
      } else {
        setPlan(createEmptyPlan(date));
      }
      setLoading(false);
    });
  }, [date]);

  // Save plan to AsyncStorage whenever it changes
  const save = useCallback(
    async (updated: DailyPlan) => {
      setPlan(updated);
      await AsyncStorage.setItem(storageKey(date), JSON.stringify(updated));
    },
    [date]
  );

  // Helper: update a single top-level field
  const update = useCallback(
    <K extends keyof DailyPlan>(field: K, value: DailyPlan[K]) => {
      save({ ...plan, [field]: value });
    },
    [plan, save]
  );

  return { plan, update, save, loading };
}
