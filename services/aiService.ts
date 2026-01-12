
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// FIX: Removed Schema type from import as it is not part of the documented API for responseSchema.
import { GoogleGenAI, Type } from "@google/genai";

// --- Google GenAI Integration ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define the expected structure of the AI response for the dashboard
// FIX: Removed Schema type annotation to align with documentation examples.
const COSMIC_RESPONSE_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        transit: { type: Type.STRING, description: "The primary astrological transit (e.g., 'Saturn Square Natal Sun')." },
        intensity: { type: Type.STRING, description: "A technical description of system load (e.g., 'High-Gain Friction', 'Latency Detected')." },
        theme: { type: Type.STRING, description: "The systemic theme (e.g., 'Structural Audit', 'Legacy Code Review')." },
        narrative: { type: Type.STRING, description: "A diagnostic paragraph (approx 50 words) written in the DE-FRAG 'Psycho-Spiritual Cartographer' tone. Use technical, precise language (circuitry, algorithm, bandwidth, resonance). Avoid vague spiritual terms. Be a neutral, authoritative system analyst." },
        curriculum: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.INTEGER },
                    task: { type: Type.STRING, description: "A specific, actionable calibration protocol to integrate the energy." },
                    type: { type: Type.STRING, description: "Protocol Category: 'Mental', 'Somatic', or 'Digital'." }
                }
            }
        },
        metrics: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    label: { type: Type.STRING },
                    value: { type: Type.STRING }
                }
            }
        },
        imagePrompt: { type: Type.STRING, description: "A visually descriptive prompt for an abstract, geometric data visualization." },
        audioScapePrompt: { type: Type.STRING, description: "A description for an ambient audio texture." }
    },
    required: ["transit", "intensity", "theme", "narrative", "curriculum", "metrics"]
};

// --- Real AI Service with Robust Error Handling ---
export const generateCosmicNarrative = async (user: any) => {
    if (!process.env.API_KEY) {
        console.error("API_KEY is not set.");
        return {
            error: "System Configuration Error: API key is missing. Please contact support."
        };
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `
                You are DEFRAG, a psycho-spiritual cartographer and cognitive operating system. 
                Your goal is to map the user's internal architecture with the precision of a systems analyst and the reverence of a mystic.

                USER DATA:
                Identity Hash: ${user.handle}
                Temporal Origin: ${user.natalData.birthDate} ${user.natalData.birthTime}
                Spatial Coordinates: ${user.natalData.birthPlace}

                TASK:
                Synthesize a "System Diagnostic" for this user.
                1. Calculate archetypally the current planetary transits.
                2. Analyze the resonance of their Identity Hash.
                3. Explain the internal friction or flow using "Cosmic Mechanics" and "System Theory".
                4. Provide 3 actionable Integration Protocols.
                
                TONAL PILLARS:
                - Radical Neutrality: No judgment. Traits are "high-gain circuits", not "flaws".
                - Systemic Intelligence: Connect the dots. Show how the whole system is interdependent.
                - Precise & Diagnostic: Use terms like 'algorithm', 'circuitry', 'latency', 'bandwidth', 'resonance', 'legacy code'.
                - AVOID: 'Meditation', 'Journaling', 'Mindfulness', 'Vibe', 'Energy', 'Spirituality'.
            `,
            config: {
                responseMimeType: "application/json",
                responseSchema: COSMIC_RESPONSE_SCHEMA,
                temperature: 0.7
            }
        });
        
        // Specific try-catch for parsing to handle malformed AI responses
        try {
            // FIX: Access the 'text' property directly instead of calling it as a method.
            const parsedData = JSON.parse(response.text || "{}");
            
            // Validate critical fields
            if (!parsedData.narrative || !parsedData.curriculum || !parsedData.transit) {
                 throw new Error("Malformed AI response: missing critical data fields.");
            }
            
            return parsedData;
        } catch (parseError) {
            // FIX: Access the 'text' property directly instead of calling it as a method for logging.
            console.error("DEFRAG_PARSE_ERROR:", parseError, "Raw Response:", response.text);
            return {
                error: "Data Stream Corrupted: The diagnostic signal could not be decoded. Please recalibrate the system."
            };
        }

    } catch (apiError) {
        console.error("DEFRAG_API_ERROR:", apiError);
        return {
            error: "Connection Latency: Unable to establish secure link to the integration engine. Check network protocols."
        };
    }
};
