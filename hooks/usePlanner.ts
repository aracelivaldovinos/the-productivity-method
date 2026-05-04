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

export type PlannerTab = "personal" | "work" | "project" | "study";

// Each tab + date gets its own isolated storage key
function storageKey(date: string, tab: PlannerTab) {
  return `planner_${date}_${tab}`;
}

export function usePlanner(date: string, tab: PlannerTab) {
  const [plan, setPlan] = useState<DailyPlan>(() => createEmptyPlan(date));
  const [loading, setLoading] = useState(true);

  // Reload whenever date OR tab changes
  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem(storageKey(date, tab)).then((raw) => {
      if (raw) {
        setPlan(JSON.parse(raw));
      } else {
        setPlan(createEmptyPlan(date));
      }
      setLoading(false);
    });
  }, [date, tab]);

  const save = useCallback(
    async (updated: DailyPlan) => {
      setPlan(updated);
      await AsyncStorage.setItem(storageKey(date, tab), JSON.stringify(updated));
    },
    [date, tab]
  );

  const update = useCallback(
    <K extends keyof DailyPlan>(field: K, value: DailyPlan[K]) => {
      save({ ...plan, [field]: value });
    },
    [plan, save]
  );

  return { plan, update, save, loading };
}
