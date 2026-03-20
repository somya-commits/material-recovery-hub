import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GameProvider } from "@/contexts/GameContext";
import Navbar from "@/components/Navbar";
import AchievementPopup from "@/components/AchievementPopup";
import Index from "./pages/Index.tsx";
import Pyrometallurgy from "./pages/Pyrometallurgy.tsx";
import Hydrometallurgy from "./pages/Hydrometallurgy.tsx";
import Bioleaching from "./pages/Bioleaching.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GameProvider>
          <Navbar />
          <AchievementPopup />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pyrometallurgy" element={<Pyrometallurgy />} />
            <Route path="/hydrometallurgy" element={<Hydrometallurgy />} />
            <Route path="/bioleaching" element={<Bioleaching />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </GameProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
