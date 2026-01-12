/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { useState, useEffect, useRef, useCallback } from 'react';

export const useAudioSystem = () => {
    const [isMuted, setIsMuted] = useState(true);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const masterGainRef = useRef<GainNode | null>(null);
    
    const initAudio = useCallback(() => {
        if (audioCtxRef.current) {
            if (audioCtxRef.current.state === 'suspended') {
                audioCtxRef.current.resume().catch(console.error);
            }
            return;
        }
        
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        try {
            const ctx = new AudioContext();
            const masterGain = ctx.createGain();
            masterGain.gain.value = isMuted ? 0 : 0.05;
            masterGain.connect(ctx.destination);

            audioCtxRef.current = ctx;
            masterGainRef.current = masterGain;

            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();

            osc1.type = 'sine';
            osc1.frequency.value = 55;
            
            osc2.type = 'sine';
            osc2.frequency.value = 55.5;

            filter.type = 'lowpass';
            filter.frequency.value = 200;

            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(masterGain);
            
            osc1.start();
            osc2.start();
        } catch (e) {
            console.warn("Audio context could not be initialized (likely due to browser autoplay restrictions).", e);
        }
    }, [isMuted]);

    useEffect(() => {
        if (masterGainRef.current && audioCtxRef.current) {
            const now = audioCtxRef.current.currentTime;
            masterGainRef.current.gain.cancelScheduledValues(now);
            masterGainRef.current.gain.linearRampToValueAtTime(isMuted ? 0 : 0.05, now + 0.2);
        }
    }, [isMuted]);

    const speakNarrative = useCallback((text: string) => {
        if (isMuted || !('speechSynthesis' in window)) return;
        
        window.speechSynthesis.cancel(); // Cancel any previous speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 0.9;
        
        // Find a suitable voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) || voices.find(v => v.lang.startsWith('en-US')) || voices[0];
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }
        
        window.speechSynthesis.speak(utterance);
    }, [isMuted]);

    return { isMuted, setIsMuted, initAudio, speakNarrative };
};