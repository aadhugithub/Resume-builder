"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ResumeContext = createContext(null);

const initialState = {
    meta: {
        templateId: "minimal",
        accentColor: "#000000",
        fontFamily: "inter",
        fontSize: "medium", // small, medium, large
        spacing: "normal", // compact, normal, airy
        sectionOrder: ["summary", "certifications", "projects", "education", "skills", "experience"],
    },
    profile: {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
    },
    summary: "",
    experience: [], // { id, role, company, location, startDate, endDate, current, description }
    education: [], // { id, degree, school, location, startDate, endDate, current, description }
    projects: [], // { id, name, link, tech, description }
    skills: [], // { id, category, items }
    certifications: [], // { id, name, issuer, date }
    awards: [], // { id, name, issuer, date }
    custom: [], // Custom sections
};

// Reducer
function resumeReducer(state, action) {
    switch (action.type) {
        case "LOAD_DATA":
            return { ...state, ...action.payload };

        case "UPDATE_META":
            return { ...state, meta: { ...state.meta, ...action.payload } };

        case "UPDATE_PROFILE":
            return { ...state, profile: { ...state.profile, ...action.payload } };

        case "UPDATE_SUMMARY":
            return { ...state, summary: action.payload };

        // Generic list actions
        case "ADD_ITEM":
            return {
                ...state,
                [action.section]: [
                    ...state[action.section],
                    { id: uuidv4(), ...action.payload },
                ],
            };

        case "UPDATE_ITEM":
            return {
                ...state,
                [action.section]: state[action.section].map((item) =>
                    item.id === action.id ? { ...item, ...action.payload } : item
                ),
            };

        case "DELETE_ITEM":
            return {
                ...state,
                [action.section]: state[action.section].filter(
                    (item) => item.id !== action.id
                ),
            };

        case "REORDER_ITEMS":
            return {
                ...state,
                [action.section]: action.payload, // Expects reordered array
            };

        case "RESET_RESUME":
            return initialState;

        default:
            return state;
    }
}

export function ResumeProvider({ children }) {
    const [state, dispatch] = useReducer(resumeReducer, initialState);
    const [isLoaded, setIsLoaded] = React.useState(false);

    // Load from local storage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem("resume-data");
            if (saved) {
                dispatch({ type: "LOAD_DATA", payload: JSON.parse(saved) });
            }
        } catch (e) {
            console.error("Failed to load resume data", e);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem("resume-data", JSON.stringify(state));
            } catch (e) {
                console.error("Failed to save resume data", e);
            }
        }
    }, [state, isLoaded]);

    return (
        <ResumeContext.Provider value={{ resume: state, dispatch, isLoaded }}>
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error("useResume must be used within a ResumeProvider");
    }
    return context;
}
