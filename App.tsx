/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useCallback, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

import { useAudioSystem } from './hooks/useAudioSystem';
import { generateCosmicNarrative } from './services/aiService';

import BootSequence from './components/views/BootSequence';
import LandingPage from './components/views/LandingPage';
import Dashboard from './components/views/Dashboard';
import AuthGate from './components/views/AuthGate';

// Memoize heavy components to prevent unnecessary re-renders
const MemoizedDashboard = memo(Dashboard);
const MemoizedLandingPage = memo(LandingPage);

export default function App() {
  const [booted, setBooted] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(true);
  const audio = useAudioSystem();

  const fetchDashboardData = useCallback(async (currentUser: any) => {
    if (!currentUser) return;
    setIsLoadingDashboard(true);
    const data = await generateCosmicNarrative(currentUser);
    setDashboardData(data);
    setIsLoadingDashboard(false);
  }, []);

  // Check for existing session on initial load
  useEffect(() => {
      const storedUser = localStorage.getItem('defrag_user');
      if (storedUser) {
          try {
             const u = JSON.parse(storedUser);
             setUser(u);
             fetchDashboardData(u);
          } catch(e) {
             console.error("Failed to parse stored user:", e);
             localStorage.removeItem('defrag_user');
          }
      }
  }, [fetchDashboardData]);

  const handleBootComplete = () => {
      if (!user) { // Only set booted if no user session was found
          setBooted(true);
      }
      audio.initAudio();
  };
  
  // Transition to dashboard view once both user and their data are loaded
  useEffect(() => {
    if (user && dashboardData) {
      setBooted(true);
    }
  }, [user, dashboardData]);

  const handleLogin = async (userData: any) => {
      setUser(userData);
      localStorage.setItem('defrag_user', JSON.stringify(userData));
      setShowAuth(false);
      await fetchDashboardData(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setDashboardData(null);
    localStorage.removeItem('defrag_user');
    // We don't need to setBooted(false), we can just transition to the landing page
  };

  return (
    <div className="bg-obsidian min-h-screen text-bone font-sans selection:bg-tech-gold selection:text-black overflow-x-hidden">
        {/* Persistent Brand Header */}
        <h1 className="fixed top-6 left-6 z-50 text-xl font-mono tracking-widest text-white mix-blend-difference pointer-events-none select-none">
            DEFRAG
        </h1>

        {/* Persistent Audio Controls */}
        <button 
            onClick={() => audio.setIsMuted(!audio.isMuted)}
            aria-label={audio.isMuted ? 'Unmute audio' : 'Mute audio'}
            className="fixed top-6 right-6 z-50 flex items-center gap-2 px-3 py-1.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/20 transition-all"
        >
            {audio.isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
        </button>

      <AnimatePresence mode="wait">
        {!booted ? (
          <BootSequence onComplete={handleBootComplete} />
        ) : user ? (
            <MemoizedDashboard 
              user={user} 
              data={dashboardData} 
              isLoading={isLoadingDashboard} 
              onRetry={() => fetchDashboardData(user)} 
              onLogout={handleLogout}
              audio={audio} 
            />
        ) : (
          <MemoizedLandingPage onLogin={() => setShowAuth(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAuth && <AuthGate onClose={() => setShowAuth(false)} onLogin={handleLogin} />}
      </AnimatePresence>
    </div>
  );
}