
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Sun, Loader2, AlertTriangle, Play, ImageIcon, Check, Info } from 'lucide-react';
import { OmnipresenceScene } from '../QuantumScene';

// --- Reusable UI Component ---
const StreamingText = ({ text, speed = 15 }: { text: string, speed?: number }) => {
    // Logic to insert line breaks every ~80 characters for better readability
    const formattedText = React.useMemo(() => {
        if (!text) return "";
        const words = text.split(' ');
        let currentLine = '';
        const lines = [];
        
        words.forEach(word => {
            if ((currentLine + word).length > 80) {
                lines.push(currentLine.trim());
                currentLine = word + ' ';
            } else {
                currentLine += word + ' ';
            }
        });
        lines.push(currentLine.trim());
        return lines.join('\n');
    }, [text]);

    const chars = React.useMemo(() => formattedText.split(''), [formattedText]);

    return (
        <span className="relative font-serif text-xl leading-relaxed inline-block min-h-[1.5em] whitespace-pre-wrap break-words">
            {chars.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 5, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                        duration: 0.1,
                        delay: index * 0.01,
                        ease: "easeOut"
                    }}
                >
                    {char}
                </motion.span>
            ))}
            <motion.span 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="inline-block w-2 h-5 ml-1 bg-tech-gold/80 align-bottom"
                aria-hidden="true"
            />
        </span>
    );
}

const DashboardErrorState = ({ message, onRetry }: { message: string, onRetry: () => void }) => (
    <div className="text-center p-8 border border-friction-red/20 rounded-xl bg-friction-red/5 flex flex-col items-center justify-center min-h-[140px]">
        <AlertTriangle className="w-8 h-8 text-friction-red/50 mb-4" />
        <p className="text-lg text-zinc-300 font-serif mb-6">{message}</p>
        <button
            onClick={onRetry}
            className="px-6 py-2 bg-white/5 border border-white/10 rounded-full font-mono text-xs tracking-widest text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
        >
            RECALIBRATE SYSTEM
        </button>
    </div>
);

const NarrativeContent = ({ isLoading, data, onRetry }: { isLoading: boolean, data: any, onRetry: () => void }) => {
    if (isLoading) {
        return (
            <div className="flex items-center gap-2 text-zinc-500 h-full" aria-live="polite">
                <Loader2 size={16} className="animate-spin" />
                <span>Calibrating geometric data...</span>
            </div>
        );
    }
    if (data?.error) {
        return <DashboardErrorState message={data.error} onRetry={onRetry} />;
    }
    if (data?.narrative) {
        return <StreamingText text={data.narrative} speed={15} />;
    }
    return <div className="text-zinc-500 italic">System is idle. Awaiting synthesis.</div>;
};

// --- Telemetry Strip Component ---
const TelemetryStrip = ({ data }: { data: any }) => (
    <div className="w-full flex gap-4 overflow-x-auto pb-4 mb-8 snap-x">
        {data?.metrics?.map((m: any, i: number) => (
             <div key={i} className="flex-shrink-0 snap-start bg-white/5 border border-white/10 rounded-lg p-3 min-w-[140px] backdrop-blur-md hover:bg-white/10 transition-colors">
                 <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{m.label}</div>
                 <div className="text-sm font-mono text-white">{m.value}</div>
             </div>
        ))}
    </div>
)

const Dashboard = ({ user, data, isLoading, onRetry, onLogout, audio }: { user: any, data: any, isLoading: boolean, onRetry: () => void, onLogout: () => void, audio: any }) => {
    return (
        <motion.div 
            key="dashboard-view"
            className="relative min-h-screen pt-24 px-6 pb-12 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="absolute inset-0 z-0">
                <OmnipresenceScene />
            </div>
            
            <div className="container mx-auto relative z-10">
                <motion.header 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex justify-between items-end mb-8 border-b border-white/10 pb-6 backdrop-blur-sm"
                >
                    <div>
                        <h1 className="text-4xl font-serif italic text-white mb-2">Daily Transit Feed</h1>
                        <p className="text-zinc-400 font-mono text-xs tracking-widest">
                            OPERATOR: {user.handle} // {new Date().toLocaleDateString()}
                        </p>
                    </div>
                    <div className="text-right">
                         <div className="text-xs font-mono text-zinc-500 mb-1 tracking-widest">CURRENT TRANSIT</div>
                         <div className="text-xl text-white font-medium">{data?.transit || "CALCULATING..."}</div>
                    </div>
                </motion.header>
                
                {/* Live Telemetry Data */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <TelemetryStrip data={data} />
                </motion.div>

                <div className="grid md:grid-cols-12 gap-12">
                    {/* Left Col: Narrative */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="md:col-span-8 space-y-12"
                    >
                        <section aria-labelledby="narrative-heading">
                             <div className="flex items-center gap-3 mb-6">
                                 <Sparkles className="text-tech-gold" size={18} />
                                 <h3 id="narrative-heading" className="text-sm font-mono tracking-widest text-white uppercase">System Diagnostic</h3>
                             </div>
                             <div className="prose prose-invert prose-lg max-w-none">
                                 <div className="text-zinc-200 leading-relaxed text-xl min-h-[200px] font-serif border-l-2 border-white/10 pl-6" aria-live="polite">
                                     <NarrativeContent isLoading={isLoading} data={data} onRetry={onRetry} />
                                 </div>
                             </div>

                             {/* Interactive Media Actions */}
                             <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 }} 
                                className={`flex gap-4 mt-8 ${data?.error ? 'opacity-30 pointer-events-none' : ''}`}
                             >
                                <button 
                                    onClick={() => data?.narrative && audio.speakNarrative(data.narrative + ". " + data.curriculum.map((c:any) => c.task).join(". "))}
                                    disabled={!data?.narrative || audio.isMuted}
                                    aria-label="Generate audio reading of the diagnostic"
                                    className="px-5 py-2.5 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/20 transition-all flex items-center gap-2 group disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <Play size={12} className="group-hover:text-tech-gold transition-colors" /> GENERATE AUDIO
                                </button>
                                <button aria-label="Generate visual data representation" className="px-5 py-2.5 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/20 transition-all flex items-center gap-2 group">
                                    <ImageIcon size={12} className="group-hover:text-emerald-400 transition-colors" /> VISUALIZE
                                </button>
                             </motion.div>
                        </section>

                        <section aria-labelledby="curriculum-heading">
                            <div className="flex items-center gap-3 mb-6">
                                <Compass className="text-emerald-500" size={18} />
                                <h3 id="curriculum-heading" className="text-sm font-mono tracking-widest text-white uppercase">Integration Protocols</h3>
                            </div>
                            <div className="grid gap-4">
                                {data?.curriculum?.map((item: any, i: number) => (
                                    <motion.div 
                                        key={item.id || i} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1 + i * 0.1 }}
                                        className="group p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all flex items-start gap-4 cursor-pointer hover:shadow-lg hover:translate-x-1 duration-300"
                                    >
                                        <div className="mt-1 w-5 h-5 rounded border border-zinc-600 flex items-center justify-center text-zinc-400 group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                                            <Check size={12} className="opacity-0 group-hover:opacity-100" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-mono text-zinc-500 mb-1 uppercase tracking-widest">{item.type} Protocol</div>
                                            <p className="text-zinc-200 group-hover:text-white transition-colors leading-relaxed">{item.task}</p>
                                        </div>
                                    </motion.div>
                                )) || (isLoading ? <div className="text-zinc-500 italic">Awaiting protocols...</div> : null)}
                            </div>
                        </section>
                    </motion.div>

                    {/* Right Col: Metrics */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="md:col-span-4 space-y-8"
                    >
                        <div className="p-6 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-md hover:border-white/20 transition-colors shadow-lg">
                            <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">System Load</h4>
                            <div className="space-y-4">
                                {data?.metrics?.map((m: any, i: number) => (
                                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 group relative">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">{m.label}</span>
                                            <div className="group/tooltip relative">
                                                <Info size={12} className="text-zinc-600 cursor-help hover:text-tech-gold transition-colors" />
                                                <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-48 p-2 bg-black border border-white/10 rounded-lg text-[10px] text-zinc-300 pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity z-20 backdrop-blur-xl shadow-xl">
                                                    Telemetry for {m.label.toLowerCase()}.
                                                    <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white/10"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-sm text-white font-mono">{m.value}</span>
                                    </div>
                                )) || <div className="text-zinc-500">Scanning...</div>}
                            </div>
                        </div>

                         <div className="p-6 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-2">
                                <Sun className="text-white" size={20} />
                                <h4 className="text-white font-medium">Solar Return</h4>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Your solar geometric alignment is approaching optimal friction. Prepare for structural audits.
                            </p>
                        </div>

                         <button 
                            onClick={onLogout}
                            className="w-full mt-4 py-3 rounded-full border border-white/10 text-xs font-mono tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                         >
                            LOGOUT
                         </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default memo(Dashboard);
