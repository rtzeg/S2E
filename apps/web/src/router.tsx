import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { Landing } from "./pages/Landing";
import { Onboarding } from "./pages/Onboarding";
import { Dashboard } from "./pages/Dashboard";
import { Roadmap } from "./pages/Roadmap";
import { RoadmapStep } from "./pages/RoadmapStep";
import { Homework } from "./pages/Homework";
import { HomeworkResult } from "./pages/HomeworkResult";
import { Coach } from "./pages/Coach";
import { Jobs } from "./pages/Jobs";
import { JobDetail } from "./pages/JobDetail";
import { Profile } from "./pages/Profile";

const withShell = (element: React.ReactNode) => <AppShell>{element}</AppShell>;

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/onboarding", element: <Onboarding /> },
  { path: "/app", element: withShell(<Dashboard />) },
  { path: "/app/roadmap", element: withShell(<Roadmap />) },
  { path: "/app/roadmap/:stepId", element: withShell(<RoadmapStep />) },
  { path: "/app/homework/:stepId", element: withShell(<Homework />) },
  { path: "/app/homework/result", element: withShell(<HomeworkResult />) },
  { path: "/app/coach", element: withShell(<Coach />) },
  { path: "/app/jobs", element: withShell(<Jobs />) },
  { path: "/app/jobs/:jobId", element: withShell(<JobDetail />) },
  { path: "/app/profile", element: withShell(<Profile />) }
]);
