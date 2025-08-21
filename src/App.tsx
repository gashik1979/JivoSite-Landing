import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {LanguageProvider} from './contexts/LanguageContext';
import {AuthProvider} from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import DashboardMain from './components/DashboardMain';
import DashboardLayout from './components/DashboardLayout';
import {NotificationProvider} from "./components/NotificationProvider";
import { AuthGuard } from "./AuthGuard";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

export function AppContent() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
                path="/dashboard"
                element={
                    <AuthGuard>
                        <DashboardLayout currentPage="main">
                            <DashboardMain />
                        </DashboardLayout>
                    </AuthGuard>
                }
            />

            <Route
                path="/dashboard/chats"
                element={
                    <AuthGuard>
                        <Dashboard />
                    </AuthGuard>
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}


function App() {
    return (
        <BrowserRouter>
        <NotificationProvider>
            <AuthProvider>
                <LanguageProvider>
                    <AppContent/>
                </LanguageProvider>
            </AuthProvider>
        </NotificationProvider>
        </BrowserRouter>
    );
}

export default App;