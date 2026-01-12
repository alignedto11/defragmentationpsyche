/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, Activity, Lock, Database, Zap, RefreshCw, Layers, BarChart3, Shield, Brain, Check } from 'lucide-react';

// --- Shared Components ---

const DetailPanel = ({ title, subtitle, metrics, onClose, color = "text-tech-gold" }: any) => (
    <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute right-0 top-0 bottom-0 w-64 bg-black/90 border-l border-white/10 p-6 z-30 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
    >
        {/* Scanline Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:100%_3px]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
                <h4 className={`font-serif text-xl leading-none italic text-white`}>{title}</h4>
                <div className="h-px w-12 bg-tech-gold my-2"></div>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{subtitle}</p>
            </div>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X size={14} />
            </button>
        </div>
        <div className="space-y-6 relative z-10">
            {metrics.map((m: any, i: number) => (
                <div key={i} className="group">
                    <div className="flex items-center gap-2 mb-2">
                        {m.icon && <m.icon size={12} className="text-zinc-600 group-hover:text-tech-gold transition-colors" />}
                        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{m.label}</div>
                    </div>
                    <div className="text-sm font-light text-zinc-200 font-mono pl-5 border-l border-zinc-800 group-hover:border-tech-gold transition-colors duration-300">
                        {m.value}
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-auto pt-4 border-t border-white/10 relative z-10">
             <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-zinc-600">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                 DEFRAG: Observing
             </div>
        </div>
    </motion.div>
);

// --- Tilt Container ---
const TiltContainer = ({ children, onClick }: { children?: React.ReactNode, onClick?: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 30 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={ref}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="relative w-full h-64 md:h-80 bg-black/20 border border-white/10 rounded-sm backdrop-blur-md flex items-center justify-center overflow-hidden group cursor-default shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] perspective-1000"
        >
            {children}
        </motion.div>
    )
}

// --- Diagrams ---

export const SurfaceCodeDiagram: React.FC = () => {
  const [activeStabilizers, setActiveStabilizers] = useState<number[]>([0, 3]);
  const [selectedStabilizer, setSelectedStabilizer] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStabilizers(prev => {
        const next = [];
        if (Math.random() > 0.5) next.push(0);
        if (Math.random() > 0.5) next.push(1);
        if (Math.random() > 0.5) next.push(2);
        if (Math.random() > 0.5) next.push(3);
        return next;
      });
    }, 2500); 
    return () => clearInterval(interval);
  }, []);

  return (
    <TiltContainer onClick={() => setSelectedStabilizer(null)}>
        {/* Holographic Scanline */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:100%_4px] translate-z-0"></div>
        
        <div className="relative w-48 h-48 rotate-45 transform-style-3d">
            {/* Frame */}
            <div className={`absolute inset-0 border border-white/10 transition-all duration-500 ${selectedStabilizer !== null ? 'opacity-10 blur-sm' : 'opacity-100'}`}></div>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <line x1="0%" y1="0%" x2="100%" y2="100%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="100%" y1="0%" x2="0%" y2="100%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            </svg>

            {/* Qubits */}
            {['-translate-x-1 -translate-y-1', 'translate-x-1 -translate-y-1', '-translate-x-1 translate-y-1', 'translate-x-1 translate-y-1'].map((pos, i) => (
                <div key={i} className={`absolute w-2 h-2 bg-zinc-800 border border-zinc-600 rounded-full transition-all duration-500 ${selectedStabilizer !== null ? 'opacity-20' : 'opacity-100'}`}
                     style={{ 
                         top: i < 2 ? -4 : 'calc(100% - 4px)', 
                         left: i % 2 === 0 ? -4 : 'calc(100% - 4px)' 
                     }} 
                />
            ))}

             {/* Interactive Stabilizers */}
             {[
                 {id: 0, x: '50%', y: '0%', type: 'Z'},
                 {id: 1, x: '0%', y: '50%', type: 'X'},
                 {id: 2, x: '100%', y: '50%', type: 'X'},
                 {id: 3, x: '50%', y: '100%', type: 'Z'},
             ].map(stab => {
                 const isActive = activeStabilizers.includes(stab.id);
                 const isSelected = selectedStabilizer === stab.id;
                 const isDimmed = selectedStabilizer !== null && !isSelected;

                 return (
                     <motion.div
                        key={`stab-${stab.id}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedStabilizer(stab.id); }}
                        animate={isActive ? { 
                            scale: [1, 1.1, 1],
                            backgroundColor: ['#18181b', '#E4E4E7', '#18181b'],
                            borderColor: ['#3f3f46', '#ffffff', '#3f3f46'],
                            boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 15px rgba(255,255,255,0.3)', '0 0 0px rgba(255,255,255,0)']
                        } : { 
                            scale: 1,
                            backgroundColor: '#000000',
                            borderColor: '#27272a',
                            boxShadow: '0 0 0px rgba(0,0,0,0)'
                        }}
                        transition={{ duration: 2, ease: "easeInOut", repeat: isActive ? Infinity : 0 }}
                        className={`absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center rounded-full border z-20 cursor-pointer transition-all duration-300 transform-style-3d
                            ${isDimmed ? 'opacity-10 grayscale scale-75' : 'opacity-100'}
                            ${isSelected ? 'border-white scale-125 z-30 bg-white text-black' : 'hover:border-white/50'}
                        `}
                        style={{ left: stab.x, top: stab.y, transform: 'translateZ(20px)' }}
                     >
                         {isSelected ? <Activity size={12} /> : <span className={`text-[8px] font-mono ${isActive ? 'text-inherit' : 'text-zinc-700'}`}>{stab.type}</span>}
                     </motion.div>
                 );
             })}
        </div>
        
        <div className={`absolute bottom-4 right-4 text-[9px] font-mono text-zinc-600 uppercase tracking-widest transition-opacity duration-500 ${selectedStabilizer !== null ? 'opacity-0' : 'opacity-100'}`}>
            Nav_System: Idle
        </div>

        <AnimatePresence>
            {selectedStabilizer !== null && (
                <DetailPanel 
                    title={`Node ${selectedStabilizer < 2 ? 'Alpha' : 'Beta'}-${selectedStabilizer}`}
                    subtitle="Archetypal Node"
                    metrics={[
                        { label: "State", value: activeStabilizers.includes(selectedStabilizer) ? "Resonant" : "Dormant", icon: Activity },
                        { label: "Trajectory", value: "Calculating...", icon: RefreshCw },
                        { label: "Protocol", value: selectedStabilizer % 2 === 0 ? "Integration" : "Alignment", icon: Shield }
                    ]}
                    onClose={() => setSelectedStabilizer(null)}
                />
            )}
        </AnimatePresence>
    </TiltContainer>
  );
};

export const TransformerDecoderDiagram: React.FC = () => {
    const [selectedLayer, setSelectedLayer] = useState<number | null>(null);

    return (
        <TiltContainer onClick={() => setSelectedLayer(null)}>
             {/* Holographic Scanline */}
             <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:100%_4px] translate-z-0"></div>

            <div className="flex flex-col gap-4 items-center justify-center w-full max-w-[240px] transform-style-3d">
                {[0, 1, 2].map((i) => {
                    const isSelected = selectedLayer === i;
                    const isDimmed = selectedLayer !== null && !isSelected;
                    
                    return (
                        <motion.div
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setSelectedLayer(i); }}
                            className={`w-full h-12 border flex items-center justify-between px-6 relative overflow-hidden transition-all duration-500 cursor-pointer
                                ${isDimmed ? 'opacity-20 scale-90 border-white/5' : 'opacity-100 border-white/20'}
                                ${isSelected ? 'border-white bg-white/10 scale-105 z-20 shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'hover:border-white/40 hover:bg-white/5'}
                            `}
                            style={{ transform: `translateZ(${i * 10}px)` }}
                        >
                            <div className="flex items-center gap-3 z-10">
                                <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></div>
                                <div className="text-[10px] font-mono text-zinc-300 uppercase tracking-[0.2em]">Layer 0{i + 1}</div>
                            </div>
                            
                            {/* Animated Data Flow */}
                            <motion.div
                                className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/50"
                                animate={{ x: ['-10%', '110%'] }}
                                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: i * 0.5 }}
                            />
                            
                            {i === 1 && <Brain size={14} className="text-zinc-500 z-10" />}
                        </motion.div>
                    );
                })}
            </div>
            <div className={`absolute top-4 left-4 text-[9px] font-mono text-zinc-600 uppercase tracking-widest transition-opacity duration-500 ${selectedLayer !== null ? 'opacity-0' : 'opacity-100'}`}>
                Memory Engine
            </div>
            
            <AnimatePresence>
                {selectedLayer !== null && (
                    <DetailPanel 
                        title={selectedLayer === 0 ? "Input Embeddings" : selectedLayer === 1 ? "Temporal Echoes" : "Shadow Output"}
                        subtitle="DEFRAG_CORE Processing"
                        metrics={[
                            { label: "Capacity", value: "12.4M Tokens", icon: Database },
                            { label: "Recurrence", value: selectedLayer === 1 ? "Detected" : "Scanning", icon: RefreshCw },
                            { label: "Tone", value: "Calmly Authoritative", icon: Activity }
                        ]}
                        onClose={() => setSelectedLayer(null)}
                    />
                )}
            </AnimatePresence>
        </TiltContainer>
    )
}

export const PerformanceMetricDiagram: React.FC = () => {
    const [selectedBar, setSelectedBar] = useState<number | null>(null);
    const bars = [40, 65, 45, 85, 55, 70, 90];

    return (
        <TiltContainer onClick={() => setSelectedBar(null)}>
             {/* Holographic Scanline */}
             <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:100%_4px] translate-z-0"></div>

            {/* Grid Lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none translate-z-0">
                 <div className="border-b border-dashed border-zinc-700 w-full absolute bottom-12"></div>
                 <div className="border-b border-dashed border-zinc-700 w-full absolute bottom-[40%]"></div>
                 <div className="border-b border-dashed border-zinc-700 w-full absolute bottom-[70%]"></div>
            </div>

            {bars.map((height, i) => {
                 const isSelected = selectedBar === i;
                 const isDimmed = selectedBar !== null && !isSelected;

                 return (
                    <motion.div
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setSelectedBar(i); }}
                        className={`w-8 border-t border-x border-white/20 relative group cursor-pointer transition-all duration-500 transform-style-3d
                            ${isDimmed ? 'opacity-20 grayscale' : 'opacity-100'}
                            ${isSelected ? 'bg-white/10 border-white z-20 shadow-[0_0_20px_rgba(255,255,255,0.15)]' : 'bg-black/40 hover:bg-white/5'}
                        `}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        style={{ transform: `translateZ(${isSelected ? 20 : 0}px)` }}
                    >
                        {/* "Data Stream" Effect inside bar */}
                        <motion.div 
                            className="absolute inset-x-0 top-0 h-[1px] bg-white/80 shadow-[0_0_5px_white]"
                            animate={{ top: ['100%', '0%'], opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "linear" }}
                        />
                        
                        {/* Reflection */}
                        <div className="absolute top-full left-0 right-0 h-full bg-gradient-to-b from-white/10 to-transparent transform scale-y-[-0.5] origin-top opacity-30 pointer-events-none"></div>
                    </motion.div>
                 );
            })}
            
            <div className={`absolute top-4 right-4 text-[9px] font-mono text-zinc-600 uppercase tracking-widest transition-opacity duration-500 ${selectedBar !== null ? 'opacity-0' : 'opacity-100'}`}>
                Network Coherence
            </div>

            <AnimatePresence>
                {selectedBar !== null && (
                    <DetailPanel 
                        title={`Node ${selectedBar + 1}`}
                        subtitle="Trust Metric"
                        metrics={[
                            { label: "Trust Score", value: `${bars[selectedBar]} / 100`, icon: Shield },
                            { label: "Status", value: "Verified", icon: Check },
                            { label: "Latency", value: "1ms", icon: Activity }
                        ]}
                        onClose={() => setSelectedBar(null)}
                    />
                )}
            </AnimatePresence>
        </TiltContainer>
    )
}