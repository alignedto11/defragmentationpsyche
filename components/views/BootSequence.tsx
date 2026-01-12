
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 1500); 
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div 
            key="boot-sequence"
            className="fixed inset-0 z-[100] bg-obsidian flex flex-col items-center justify-center"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-mono text-white tracking-[0.2em] flex items-center gap-2"
            >
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                DEFRAG // INITIALIZING...
            </motion.div>
        </motion.div>
    )
};

export default BootSequence;
