import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Dashboard from './pages/Dashboard';
import StressMonitor from './pages/StressMonitor';
import SleepAnalysis from './pages/SleepAnalysis';
import DiabetesRisk from './pages/DiabetesRisk';
import HealthReports from './pages/HealthReports';
import SymptomChecker from './pages/SymptomChecker'; // Keeping old one as fallback or remove if not needed
import SymptomList from './screens/symptom/SymptomList';
import SymptomDetail from './screens/symptom/SymptomDetail';
import SymptomResult from './screens/symptom/SymptomResult';
import VirtualDoctor from './pages/VirtualDoctor';
import AiChatbot from './pages/AiChatbot';
import GamifyPage from './pages/GamifyPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main App Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="stress" element={<StressMonitor />} />
          <Route path="sleep" element={<SleepAnalysis />} />
          <Route path="diabetes" element={<DiabetesRisk />} />
          <Route path="reports" element={<HealthReports />} />

          {/* Symptom Checker Routes */}
          <Route path="symptoms" element={<SymptomList />} />
          <Route path="symptoms/:id" element={<SymptomDetail />} />
          <Route path="symptoms/result" element={<SymptomResult />} />

          <Route path="doctor" element={<VirtualDoctor />} />
          <Route path="gamify" element={<GamifyPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="ai-chatbot" element={<AiChatbot />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
