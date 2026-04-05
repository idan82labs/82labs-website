import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import Home from "@/pages/home";
import "./i18n/config";

const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Home lang="en" />} />
      <Route path="/he" component={() => <Home lang="he" />} />
      <Route component={() => (
        <Suspense fallback={null}>
          <NotFound />
        </Suspense>
      )} />
    </Switch>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router />
    </MotionConfig>
  );
}

export default App;
