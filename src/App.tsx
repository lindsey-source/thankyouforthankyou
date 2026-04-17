import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CardWizardProvider } from "@/contexts/CardWizardContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import SendThanks from "./pages/SendThanks";
import CardDesign from "./pages/CardDesign";
import CreateCardStep1 from "./pages/CreateCardStep1";
import CreateCardStep2 from "./pages/CreateCardStep2";
import CreateCardStep3 from "./pages/CreateCardStep3";
import CreateCardStep4 from "./pages/CreateCardStep4";
import CreateCardStep5 from "./pages/CreateCardStep5";
import CreateCardStep6 from "./pages/CreateCardStep6";
import CreateCardImpact from "./pages/CreateCardImpact";
import SavedCampaigns from "./pages/SavedCampaigns";
import CSVManager from "./pages/CSVManager";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import CampaignDetail from "./pages/CampaignDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CardWizardProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/sign-up" element={<Navigate to="/signup" replace />} />
              <Route path="/sign-in" element={<Navigate to="/login" replace />} />
              <Route path="/create-card/step1" element={<ProtectedRoute><CreateCardStep1 /></ProtectedRoute>} />
              <Route path="/create-card/step2" element={<ProtectedRoute><CreateCardStep2 /></ProtectedRoute>} />
              <Route path="/create-card/step3" element={<ProtectedRoute><CreateCardStep3 /></ProtectedRoute>} />
              <Route path="/create-card/step4" element={<ProtectedRoute><CreateCardStep4 /></ProtectedRoute>} />
              <Route path="/create-card/impact" element={<ProtectedRoute><CreateCardImpact /></ProtectedRoute>} />
              <Route path="/create-card/step5" element={<ProtectedRoute><CreateCardStep5 /></ProtectedRoute>} />
              <Route path="/create-card/step6" element={<ProtectedRoute><CreateCardStep6 /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/send-thanks" element={<SendThanks />} />
              <Route path="/create" element={<Navigate to="/create-card/step1" replace />} />
              <Route path="/card-design" element={<Navigate to="/create-card/step1" replace />} />
              <Route path="/saved-campaigns" element={<SavedCampaigns />} />
              <Route path="/csv-upload" element={<CSVManager />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/campaign/:id" element={<CampaignDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CardWizardProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
