export type Priority = 1 | 2 | 3;

export interface TodoItem {
  id: string;
  text: string;
  priority: Priority | null;
  done: boolean;
}

export interface TimeBlock {
  time: string;      // e.g. "05:00am"
  text: string;
  drawing?: string;  // base64 Skia path data for handwritten notes
}

export interface DailyPlan {
  date: string;             // "YYYY-MM-DD"

  // Section 1 - Daily Focus
  mindset: string;
  mindsetDone: boolean;
  habit: string;
  habitDone: boolean;
  distraction: string;
  distractionDone: boolean;

  // Section 2 - To-Do Table
  quickTicks: TodoItem[];
  tasks: TodoItem[];
  projects: TodoItem[];

  // Section 3 - Non-Negotiables
  nonNegotiables: [string, string, string];

  // Section 4 - Time Blocks
  timeBlocks: TimeBlock[];

  // Section 5 - Focus Review
  focusReviewDone: boolean;

  // Section 6 - Reflection
  proudOf: string;
  doBetter: string;
  notes: string;
}
