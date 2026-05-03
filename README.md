# The Productivity Method

A digital planner app based on the **8-Minute Daily Planning Method** — built with React Native and Expo.

Works on iOS, Android, iPad (with Apple Pencil support), and web.

---

## The 8-Minute Method

- **5 minutes in the morning** to plan your day
- **3 minutes at the end of the day** to reflect and review

### Sections

1. **Set Your Daily Focus** — mindset, habit, distraction to avoid
2. **To-Do Table** — Quick Ticks (<5min), Tasks (5-30min), Projects (30min+)
3. **Three Non-Negotiables** — the 3 things you will get done today
4. **Time-Block Your Schedule** — hourly blocks from 5am to 10pm
5. **Daily Focus Review** — rate how you achieved your focuses
6. **End of Day Reflection** — proud of, do better tomorrow, notes

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [React Native](https://reactnative.dev/) | Cross-platform mobile framework |
| [Expo](https://expo.dev/) | React Native tooling, builds, and OTA updates |
| [Expo Router](https://expo.github.io/router/) | File-based navigation (like Next.js for mobile) |
| [NativeWind](https://www.nativewind.dev/) | Tailwind CSS classes in React Native |
| [React Native Skia](https://shopify.github.io/react-native-skia/) | Apple Pencil / canvas drawing |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Persistent local storage (like localStorage for RN) |

---

## Project Structure

```
the-productivity-method/
├── app/                    # Expo Router pages (file = route)
│   ├── _layout.tsx         # Root layout (like _app.tsx in Next.js)
│   └── index.tsx           # Main planner screen
├── components/             # Reusable UI components
│   ├── DailyFocus.tsx      # Section 1 — mindset, habit, distraction
│   ├── TodoTable.tsx       # Section 2 — quick ticks, tasks, projects
│   ├── NonNegotiables.tsx  # Section 3 — top 3 things
│   ├── TimeBlock.tsx       # Section 4 — hourly schedule
│   ├── FocusReview.tsx     # Section 5 — end of day rating
│   └── Reflection.tsx      # Section 6 — reflection + notes
├── hooks/
│   └── usePlanner.ts       # State management + AsyncStorage persistence
├── types/
│   └── planner.ts          # TypeScript types for all planner data
└── constants/
    └── theme.ts            # Colors, fonts, spacing
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Run in browser
npx expo start --web
```

To run on your iPad, install the **Expo Go** app and scan the QR code from `npx expo start`.

---

## Responsive Layout Strategy

| Device | Layout |
|---|---|
| Mobile (phone) | Single column, sections stacked, scroll vertically |
| Tablet (iPad) | Two-column layout mimicking the physical planner spread |
| Desktop (web) | Full two-page spread with fixed sidebar navigation |

---

## Data Persistence

All planner data is saved locally using AsyncStorage. Each day's plan is stored by date key:
