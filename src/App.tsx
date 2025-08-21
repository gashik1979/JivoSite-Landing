import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {LanguageProvider} from './contexts/LanguageContext';
import {AuthProvider} from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import DashboardMain from './components/DashboardMain';
import DashboardLayout from './components/DashboardLayout';
import ClientsPage from './components/CRM/ClientsPage';
import DealsPage from './components/CRM/DealsPage';
import TasksPage from './components/CRM/TasksPage';
import AnalyticsPage from './components/CRM/AnalyticsPage';
import {NotificationProvider} from "./components/NotificationProvider";
import { AuthGuard } from "./AuthGuard";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import ConstructorWizard from "./components/Constructor/ConstructorWizard";
import CookieNotice from "./components/CookieNotice";

export function AppContent() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            
            <Route
                path="/constructor"
                element={
                    <AuthGuard>
                        <ConstructorWizard />
                    </AuthGuard>
                }
            />

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
                        <DashboardLayout currentPage="chats">
                            <Dashboard />
                        </DashboardLayout>
                    </AuthGuard>
                }
            />

            <Route
                path="/dashboard/clients"
                element={
                    <AuthGuard>
                        <DashboardLayout currentPage="clients">
                            <ClientsPage />
                        </DashboardLayout>
                    </AuthGuard>
                }
            />

            <Route
                path="/dashboard/deals"
                element={
                    <AuthGuard>
                        <DashboardLayout currentPage="deals">
                            <DealsPage />
                        </DashboardLayout>
                    </AuthGuard>
                }
            />

            <Route
                path="/dashboard/tasks"
                element={
                    <AuthGuard>
                        <DashboardLayout currentPage="tasks">
                            <TasksPage />
                        </DashboardLayout>
                    </AuthGuard>
                }
            />

            <Route
                path="/dashboard/analytics"
                element={
                    <AuthGuard>
                        <DashboardLayout currentPage="analytics">
                            <AnalyticsPage />
                        </DashboardLayout>
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
                    <CookieNotice />
                </LanguageProvider>
            </AuthProvider>
        </NotificationProvider>
        </BrowserRouter>
    );
}

export default App;