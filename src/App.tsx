import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductsPage from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetail";
import ServicesPage from "./pages/Services";
import NewsPage from "./pages/News";
import ClientsPage from "./pages/Clients";
import CertificationsPage from "./pages/Certifications";
import ContactPage from "./pages/Contact";
import NotFound from "./pages/NotFound";
import QuotePage from "./pages/QuotePage";
import FichaPage from "./pages/FichaPage";
import WhatsAppFloating from "./components/WhatsAppFloating";



const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/productos/:sku" element={<ProductDetailPage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/noticias" element={<NewsPage />} />
          <Route path="/clientes" element={<ClientsPage />} />
          <Route path="/certificaciones" element={<CertificationsPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/cotizar/:sku" element={<QuotePage />} />
          <Route path="/ficha/:sku" element={<FichaPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppFloating />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;



