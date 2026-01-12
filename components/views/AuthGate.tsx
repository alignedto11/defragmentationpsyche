
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Hexagon, ArrowRight, CheckSquare, Square, ShieldCheck } from 'lucide-react';

const OnboardingVisual = ({ step }: { step: number }) => {
    const variants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: "easeInOut" } }
    };
    return (
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 pointer-events-none">
            <motion.svg viewBox="0 0 200 200" className="w-96 h-96">
                <AnimatePresence>
                    {step >= 0 && ( // Base Grid
                        <motion.path
                            key="grid"
                            d="M 20 20 L 180 20 L 180 180 L 20 180 Z"
                            fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 4"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        />
                    )}
                    {step >= 1 && ( // Date Axis
                        <motion.path
                            key="date-axis"
                            d="M 20 100 L 180 100"
                            fill="none" stroke="white" strokeWidth="0.75"
                            variants={variants} initial="hidden" animate="visible" exit="hidden"
                        />
                    )}
                    {step >= 2 && ( // Time Vectors
                        <motion.path
                            key="time-vectors"
                            d="M 100 20 L 100 180"
                            fill="none" stroke="white" strokeWidth="0.75"
                            variants={variants} initial="hidden" animate="visible" exit="hidden"
                        />
                    )}
                    {step >= 3 && ( // Place / Origin Point
                        <motion.circle
                            key="origin"
                            cx="100" cy="100" r="5"
                            fill="white"
                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        />
                    )}
                </AnimatePresence>
            </motion.svg>
        </div>
    );
};

const AuthGate = ({ onClose, onLogin }: { onClose: () => void, onLogin: (data: any) => void }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({ name: '', birthDate: '', birthTime: '12:00', birthPlace: '' });
    const [useNoonChart, setUseNoonChart] = useState(false);
    const [tosAccepted, setTosAccepted] = useState(false);
    
    const totalSteps = 5;

    const handleNext = () => {
        // Validation checks
        if (step === 0 && !formData.name) return;
        if (step === 1 && !formData.birthDate) return;
        if (step === 4 && !tosAccepted) return;

        if (step < totalSteps - 1) {
            setStep(step + 1);
        } else {
            onLogin({ handle: formData.name, natalData: formData });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleNext();
        }
    }

    const steps = [
        {
            id: 'name',
            label: 'Identity Hash Input',
            placeholder: 'First Middle Last',
            type: 'text',
            description: 'Calculates the numerological resonance of your primary user profile.'
        },
        {
            id: 'birthDate',
            label: 'Temporal Origin Point',
            placeholder: '',
            type: 'date',
            description: 'The geometric origin point of your timeline.'
        },
        {
            id: 'birthTime',
            label: 'Time of Birth',
            placeholder: '',
            type: 'time',
            description: 'Precise angular calculation required for accurate calibration.'
        },
        {
            id: 'birthPlace',
            label: 'Spatial Coordinates',
            placeholder: 'City, Country',
            type: 'text',
            description: 'Location of system entry.'
        },
        {
            id: 'tos',
            label: 'Sovereign Agreement',
            description: 'DEFRAG is a navigational instrument. You retain full authority over your trajectory.'
        }
    ]

    const currentStep = steps[step];

    return (
        <motion.div 
            key="auth-gate"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-6"
            aria-modal="true"
            role="dialog"
        >
             <div className="w-full max-w-md">
                 <div className="mb-8 text-center">
                     <Hexagon className="w-8 h-8 text-white mx-auto mb-4 animate-pulse" />
                     <h2 className="text-2xl font-serif text-white italic">System Calibration</h2>
                 </div>

                 <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                     <OnboardingVisual step={step} />
                     {/* Step Indicator */}
                     <div className="flex justify-between mb-8 px-2 relative z-10" aria-label={`Step ${step + 1} of ${totalSteps}`}>
                         {[...Array(totalSteps)].map((_, i) => (
                             <div key={i} className={`h-1 w-full mx-1 rounded-full transition-colors duration-500 ${i <= step ? 'bg-white' : 'bg-zinc-800'}`} />
                         ))}
                     </div>

                     <div className="h-64 relative z-10">
                         <AnimatePresence mode="wait">
                            <motion.div 
                                key={step} 
                                initial={{ x: 30, opacity: 0 }} 
                                animate={{ x: 0, opacity: 1 }} 
                                exit={{ x: -30, opacity: 0 }} 
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="h-full flex flex-col justify-center"
                            >
                                <label htmlFor={currentStep.id} className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3 block">{currentStep.label}</label>
                                
                                {step < 4 ? (
                                    <input 
                                        id={currentStep.id}
                                        autoFocus
                                        type={currentStep.type}
                                        value={(formData as any)[currentStep.id]}
                                        onChange={e => setFormData({...formData, [currentStep.id]: e.target.value})}
                                        onKeyDown={handleKeyDown}
                                        disabled={step === 2 && useNoonChart}
                                        className="w-full bg-transparent border-b border-zinc-700 text-3xl text-white py-2 focus:outline-none focus:border-white transition-colors placeholder-zinc-800 font-serif disabled:opacity-30 disabled:border-zinc-800"
                                        placeholder={currentStep.placeholder}
                                        aria-required="true"
                                    />
                                ) : (
                                    <div 
                                        onClick={() => setTosAccepted(!tosAccepted)}
                                        className="flex items-start gap-4 p-4 rounded-lg bg-black/20 border border-white/10 cursor-pointer hover:border-white/30 transition-colors"
                                    >
                                        {tosAccepted ? <CheckSquare size={24} className="text-white flex-shrink-0 mt-1" /> : <Square size={24} className="text-zinc-600 flex-shrink-0 mt-1" />}
                                        <p className="text-sm text-zinc-300">
                                            {currentStep.description}
                                        </p>
                                    </div>
                                )}
                                
                                { step < 4 && 
                                  <p className="mt-4 text-xs text-zinc-400 leading-relaxed">
                                    {currentStep.description}
                                  </p>
                                }

                                {step === 2 && (
                                     <div 
                                        className="flex items-center gap-3 mt-4 cursor-pointer" 
                                        onClick={() => {
                                            const noon = !useNoonChart;
                                            setUseNoonChart(noon);
                                            if (noon) {
                                                setFormData({...formData, birthTime: '12:00'});
                                            }
                                        }}
                                    >
                                        {useNoonChart ? <CheckSquare className="text-white" size={16}/> : <Square className="text-zinc-600" size={16}/>}
                                        <span className="text-xs text-zinc-400">Time of birth is unknown (use Noon chart)</span>
                                    </div>
                                )}
                                
                                { step === 4 && 
                                    <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-mono">
                                        <ShieldCheck size={14} />
                                        <span>Your data is processed locally and never stored on our servers.</span>
                                    </div>
                                }
                            </motion.div>
                         </AnimatePresence>
                     </div>

                     <div className="flex justify-between items-center mt-8 relative z-10">
                         <button onClick={onClose} className="text-xs font-mono text-zinc-500 hover:text-white transition-colors">CANCEL</button>
                         <button 
                            onClick={handleNext}
                            disabled={(step === 0 && !formData.name) || (step === 1 && !formData.birthDate) || (step === 4 && !tosAccepted)}
                            className="px-6 py-3 bg-white text-black rounded-full font-mono text-xs tracking-widest hover:bg-zinc-200 transition-colors flex items-center gap-2 disabled:bg-zinc-600 disabled:text-zinc-800 disabled:cursor-not-allowed"
                         >
                             {step === totalSteps - 1 ? 'CALIBRATE' : 'NEXT'} <ArrowRight size={14} />
                         </button>
                     </div>
                 </div>
             </div>
        </motion.div>
    )
};

export default AuthGate;
