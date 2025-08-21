import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import AuthModal from '../components/AuthModal';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';



export default function HomePage() {
    const location = useLocation();
    const [showAuth, setShowAuth] = React.useState(false);

    React.useEffect(() => {
        if (location.state?.from) {
            console.log(location.state.from);
            setShowAuth(true);
        }
    }, [location.state]);

    return (
        <>
            {showAuth && (
                <AuthModal
                    type="signin"
                    onClose={() => setShowAuth(false)}
                    onSwitchMode={() => {}}
                />
            )}
            <Header />
            <Hero />
            <Features />
            <Pricing />
            <Testimonials />
            <CTA />
            <Footer />
        </>
    );
}