import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import QuemSomos from "./pages/QuemSomos.tsx";
import Equipe from "./pages/Equipe.tsx";
import Servicos from "./pages/Servicos.tsx";
import Clientes from "./pages/Clientes.tsx";
import Cases from "./pages/Cases.tsx";

import FaleConosco from "./pages/FaleConosco.tsx";
import UnidadesMoveis from "./pages/UnidadesMoveis.tsx";
import UnidadeDetail from "./pages/UnidadeDetail.tsx";
import DSNG from "./pages/DSNG.tsx";
import Estrutura from "./pages/Estrutura.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/quem-somos/equipe" element={<Equipe />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/unidades-moveis" element={<UnidadesMoveis />} />
          <Route path="/unidades-moveis/:id" element={<UnidadeDetail />} />
          <Route path="/dsng" element={<DSNG />} />
          <Route path="/estrutura" element={<Estrutura />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/cases" element={<Cases />} />
          
          <Route path="/fale-conosco" element={<FaleConosco />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
