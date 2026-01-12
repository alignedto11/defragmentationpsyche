
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Brain, HardDrive, Network, Lock, Smartphone, Wallet, MessageSquare, Book, Check } from 'lucide-react';
import { HeroScene, MemoryScene, NavigatorScene, TrustScene } from '../QuantumScene';

// --- Shared Components ---
const SectionTitle = ({ title, id }: { title: React.ReactNode, id?: string }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 text-center"
        >
             <h2 id={id} className="text-4xl md:text-5xl font-serif text-white tracking-tight">{title}</h2>
             <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mt-6"></div>
        </motion.div>
    );
}

const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8 }}
        className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all group"
    >
        <Icon size={24} className="text-zinc-400 group-hover:text-white mb-6 transition-colors" />
        <h3 className="text-xl font-serif text-white mb-3">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed font-light">{desc}</p>
    </motion.div>
);

const LandingPage = ({ onLogin }: { onLogin: () => void }) => {
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.main 
            key="landing-page"
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            {/* HERO */}
            <section id="core" className="relative h-screen flex flex-col items-center justify-center overflow-hidden snap-start" role="region" aria-labelledby="hero-title">
                <HeroScene />
                <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="inline-block"
                    >
                         <h1 id="hero-title" className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-none mix-blend-overlay">
                            DEFRAG
                         </h1>
                    </motion.div>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mt-8 mb-12 font-light drop-shadow-lg"
                    >
                        Your psyche is a complex operating system. Your birth chart is the source code. DEFRAG maps the architecture, identifying legacy algorithms and high-gain circuits to engineer cognitive sovereignty.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 1, delay: 1.1 }}
                        className="flex justify-center items-center"
                    >
                        <button 
                            onClick={onLogin}
                            aria-label="Initialize System"
                            className="group px-8 py-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full text-xs font-mono tracking-[0.2em] text-white hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center gap-3"
                        >
                            INITIALIZE SYSTEM <ArrowDown size={14} className="transition-transform group-hover:translate-y-1" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* MODULES (Features + Journal) */}
            <section id="modules" className="relative py-32 px-6 snap-start bg-black border-t border-white/5">
                <MemoryScene />
                <div className="max-w-7xl mx-auto relative z-10">
                    <SectionTitle id="modules-title" title="Core Modules" />
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={Brain}
                            title="Diagnostic Engine"
                            desc="Identifies recurring shadow algorithms coded for survival. Moves subconscious reactions into conscious awareness for debugging."
                            delay={0.1}
                        />
                        <FeatureCard 
                            icon={HardDrive}
                            title="System Ledger"
                            desc="A private, zero-knowledge data vault. Your internal logs are air-gapped from the network. No tracking, no training data."
                            delay={0.2}
                        />
                        <FeatureCard 
                            icon={Network}
                            title="Somatic Calibration"
                            desc="Syncs with Apple Health to correlate your physical stress signals with cosmic timing. Maps your biology to the transit field."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* METHODOLOGY */}
            <section id="method" className="relative py-32 px-6 snap-start bg-obsidian border-t border-white/5 overflow-hidden">
                <NavigatorScene />
                <div className="max-w-7xl mx-auto relative z-10">
                     <SectionTitle id="method-title" title="The Methodology" />
                     <div className="grid md:grid-cols-2 gap-16 items-center">
                         <div>
                             <p className="text-2xl font-serif italic text-white mb-8 leading-relaxed">
                                 "We do not judge the design. We illuminate the blueprint."
                             </p>
                             <p className="text-zinc-400 leading-relaxed mb-6">
                                 Your life is a complex dataset. The <strong>Astrolabe Engine</strong> functions as a cartographic tool, mapping the relationship between your source code (natal chart) and current operating conditions (transits).
                             </p>
                             <p className="text-zinc-400 leading-relaxed">
                                 It does not predict fate; it reveals function. By understanding the mechanical purpose of your internal friction, you gain the agency to operate your system with mastery.
                             </p>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                             <div className="p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl">
                                 <Wallet className="text-white mb-4" />
                                 <h4 className="text-sm font-bold text-white mb-2">Apple Wallet</h4>
                                 <p className="text-xs text-zinc-500">Identity verification token.</p>
                             </div>
                             <div className="p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl">
                                 <Smartphone className="text-white mb-4" />
                                 <h4 className="text-sm font-bold text-white mb-2">HealthKit Sync</h4>
                                 <p className="text-xs text-zinc-500">Correlate biorhythms with system load.</p>
                             </div>
                             <div className="p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl">
                                 <MessageSquare className="text-white mb-4" />
                                 <h4 className="text-sm font-bold text-white mb-2">iMessage Glyphs</h4>
                                 <p className="text-xs text-zinc-500">Share resonance data via encrypted stickers.</p>
                             </div>
                             <div className="p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl">
                                 <Book className="text-white mb-4" />
                                 <h4 className="text-sm font-bold text-white mb-2">Journal API</h4>
                                 <p className="text-xs text-zinc-500">Native integration with Apple Journal.</p>
                             </div>
                         </div>
                     </div>
                </div>
            </section>

             {/* PRICING / PLANS */}
             <section id="plans" className="relative py-32 px-6 snap-start bg-black border-t border-white/5">
                <TrustScene />
                <div className="max-w-4xl mx-auto relative z-10">
                    <SectionTitle id="plans-title" title="Commitment Protocol" />
                    <div className="grid md:grid-cols-2 gap-8 mt-16">
                        {/* Free Tier */}
                        <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all">
                             <div className="text-xs font-mono tracking-widest text-zinc-500 mb-4">TIER 01</div>
                             <h3 className="text-3xl font-serif text-white mb-2">Observer</h3>
                             <div className="text-zinc-400 mb-8">Free / Restricted Access</div>
                             <ul className="space-y-4 mb-8 text-sm text-zinc-300">
                                 <li className="flex gap-3"><Check size={16} className="text-zinc-500"/> Daily System Intel</li>
                                 <li className="flex gap-3"><Check size={16} className="text-zinc-500"/> 3 Diagnostic Queries / Day</li>
                                 <li className="flex gap-3"><Check size={16} className="text-zinc-500"/> Local-Only Storage</li>
                             </ul>
                             <button onClick={onLogin} className="w-full py-3 rounded-full border border-white/10 text-xs font-mono tracking-widest text-white hover:bg-white/10 transition-all">
                                 INITIATE FREE
                             </button>
                        </div>

                        {/* Paid Tier */}
                        <div className="p-8 border border-white/20 rounded-2xl bg-gradient-to-b from-white/10 to-black/40 backdrop-blur-md relative overflow-hidden group">
                             <div className="absolute top-0 left-0 w-full h-1 bg-tech-gold"></div>
                             <div className="text-xs font-mono tracking-widest text-tech-gold mb-4 flex justify-between">
                                 <span>TIER 02</span>
                                 <span className="text-[10px] border border-tech-gold/50 px-2 py-0.5 rounded text-tech-gold">RECOMMENDED</span>
                             </div>
                             <h3 className="text-3xl font-serif text-white mb-2">Sovereign</h3>
                             <div className="text-zinc-400 mb-8">$12/mo or $120/yr</div>
                             <ul className="space-y-4 mb-8 text-sm text-white">
                                 <li className="flex gap-3"><Check size={16} className="text-tech-gold"/> Unlimited Diagnostic Access</li>
                                 <li className="flex gap-3"><Check size={16} className="text-tech-gold"/> Full System Integration (Wallet/Health)</li>
                                 <li className="flex gap-3"><Check size={16} className="text-tech-gold"/> Deep History Analysis</li>
                                 <li className="flex gap-3"><Check size={16} className="text-tech-gold"/> Priority Neural Access</li>
                             </ul>
                             <button onClick={onLogin} className="w-full py-3 rounded-full bg-white text-black text-xs font-mono tracking-widest hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                 BECOME SOVEREIGN
                             </button>
                        </div>
                    </div>
                </div>
            </section>

             {/* PRIVACY */}
             <section id="privacy" className="relative py-24 px-6 snap-start bg-obsidian border-t border-white/5 text-center">
                 <div className="max-w-2xl mx-auto">
                     <Lock className="w-8 h-8 text-zinc-500 mx-auto mb-6" />
                     <h3 className="text-xl font-serif text-white mb-4">Zero-Knowledge Architecture</h3>
                     <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                         We cannot read your ledger. We cannot sell your data. 
                         DEFRAG is built on a local-first architecture. Your psyche remains air-gapped from the surveillance state.
                     </p>
                     <div className="flex justify-center gap-6 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                         <span>Encrypted At Rest</span>
                         <span>•</span>
                         <span>No Tracking Pixels</span>
                         <span>•</span>
                         <span>User Owned Keys</span>
                     </div>
                 </div>
             </section>
            
            {/* NAV DOCK */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4">
                <nav className="flex items-center justify-between px-1 py-1 backdrop-blur-2xl bg-black/80 border border-white/10 rounded-full shadow-2xl overflow-x-auto" aria-label="Main navigation">
                    <div className="flex items-center gap-1">
                        {[
                            { id: 'core', label: 'HOME' },
                            { id: 'modules', label: 'MODULES' },
                            { id: 'method', label: 'METHOD' },
                            { id: 'plans', label: 'PLANS' },
                            { id: 'privacy', label: 'PRIVACY' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                aria-label={`Scroll to ${item.label} section`}
                                className="px-3 py-2 rounded-full text-[9px] font-mono tracking-widest text-zinc-400 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                     <button 
                        onClick={onLogin}
                        className="ml-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-[9px] font-mono tracking-widest text-white hover:bg-white/20 flex items-center gap-2 whitespace-nowrap"
                    >
                        <Lock size={10} />
                        LOGIN
                    </button>
                </nav>
            </div>
        </motion.main>
    );
}

export default memo(LandingPage);
