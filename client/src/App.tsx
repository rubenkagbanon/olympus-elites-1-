/* ============================================================
   OLYMPUS ELITES — App.tsx
   Dark Arena design — all routes defined here
   ============================================================ */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LiveCenter from "./pages/LiveCenter";
import Inscription from "./pages/Inscription";
import BureauDes5 from "./pages/BureauDes5";
import Maillots from "./pages/Maillots";
import Formation from "./pages/Formation";
import Orientation from "./pages/Orientation";
import SocialWall from "./pages/SocialWall";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./contexts/AuthContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/live" component={LiveCenter} />
      <Route path="/inscription" component={Inscription} />
      <Route path="/bureau" component={BureauDes5} />
      <Route path="/maillots" component={Maillots} />
      <Route path="/formation" component={Formation} />
      <Route path="/orientation" component={Orientation} />
      <Route path="/social" component={SocialWall} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" switchable>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
