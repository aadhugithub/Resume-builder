"use client";

import React, { createContext, useContext, useReducer } from "react";

const OptimizerContext = createContext(null);

const initialState = {
    // User background input
    background: {
        name: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
        summary: "",
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
    },

    // Job requirements input
    jobRequirements: "",
    parsedRequirements: null,

    // AI-generated optimized resume
    optimizedResume: null,

    // UI state
    isLoading: false,
    error: null,
    uploadedFileName: null,
};

function optimizerReducer(state, action) {
    switch (action.type) {
        case "SET_BACKGROUND":
            return { ...state, background: { ...state.background, ...action.payload } };

        case "SET_JOB_REQUIREMENTS":
            return { ...state, jobRequirements: action.payload };

        case "SET_PARSED_REQUIREMENTS":
            return { ...state, parsedRequirements: action.payload };

        case "SET_OPTIMIZED_RESUME":
            return { ...state, optimizedResume: action.payload };

        case "SET_LOADING":
            return { ...state, isLoading: action.payload };

        case "SET_ERROR":
            return { ...state, error: action.payload, isLoading: false };

        case "SET_UPLOADED_FILE":
            return { ...state, uploadedFileName: action.payload };

        case "RESET":
            return initialState;

        default:
            return state;
    }
}

export function OptimizerProvider({ children }) {
    const [state, dispatch] = useReducer(optimizerReducer, initialState);

    return (
        <OptimizerContext.Provider value={{ state, dispatch }}>
            {children}
        </OptimizerContext.Provider>
    );
}

export function useOptimizer() {
    const context = useContext(OptimizerContext);
    if (!context) {
        throw new Error("useOptimizer must be used within OptimizerProvider");
    }
    return context;
}
