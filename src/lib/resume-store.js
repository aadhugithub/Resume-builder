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
        github: "",
    },
    summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    certifications: [],
    awards: [],
    custom: [],
};

const initialGlobalState = {
    activeResume: initialState,
    allResumes: [], // { id, name, date, time, type: 'created' | 'uploaded', data }
};

// Reducer
function resumeReducer(state, action) {
    switch (action.type) {
        case "LOAD_ALL_DATA":
            return { ...state, allResumes: action.payload };

        case "LOAD_ACTIVE_DATA":
            return { ...state, activeResume: { ...state.activeResume, ...action.payload } };

        case "UPDATE_META":
            return { ...state, activeResume: { ...state.activeResume, meta: { ...state.activeResume.meta, ...action.payload } } };

        case "UPDATE_PROFILE":
            return { ...state, activeResume: { ...state.activeResume, profile: { ...state.activeResume.profile, ...action.payload } } };

        case "UPDATE_SUMMARY":
            return { ...state, activeResume: { ...state.activeResume, summary: action.payload } };

        case "ADD_ITEM":
            const newStateWithItem = {
                ...state.activeResume,
                [action.section]: [
                    ...state.activeResume[action.section],
                    { id: uuidv4(), ...action.payload },
                ],
            };
            if (action.section === 'custom') {
                const newId = newStateWithItem.custom[newStateWithItem.custom.length - 1].id;
                newStateWithItem.meta = {
                    ...newStateWithItem.meta,
                    sectionOrder: [...newStateWithItem.meta.sectionOrder, `custom-${newId}`]
                };
            }
            return { ...state, activeResume: newStateWithItem };

        case "UPDATE_ITEM":
            return {
                ...state,
                activeResume: {
                    ...state.activeResume,
                    [action.section]: state.activeResume[action.section].map((item) =>
                        item.id === action.id ? { ...item, ...action.payload } : item
                    ),
                }
            };

        case "DELETE_ITEM":
            const deletedState = {
                ...state.activeResume,
                [action.section]: state.activeResume[action.section].filter(
                    (item) => item.id !== action.id
                ),
            };
            if (action.section === 'custom') {
                deletedState.meta = {
                    ...deletedState.meta,
                    sectionOrder: deletedState.meta.sectionOrder.filter(
                        section => section !== `custom-${action.id}`
                    )
                };
            }
            return { ...state, activeResume: deletedState };

        case "REORDER_ITEMS":
            return {
                ...state,
                activeResume: {
                    ...state.activeResume,
                    [action.section]: action.payload,
                }
            };

        case "RESET_RESUME":
            return { ...state, activeResume: initialState };

        case "SAVE_CURRENT_RESUME": {
            const now = new Date();
            const newSaved = {
                id: uuidv4(),
                name: state.activeResume.profile.name || "Untitled Resume",
                date: now.toLocaleDateString(),
                time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'created',
                data: JSON.parse(JSON.stringify(state.activeResume))
            };
            return { ...state, allResumes: [...state.allResumes, newSaved] };
        }

        case "UPLOAD_RESUME": {
            const now = new Date();
            const newUploaded = {
                id: uuidv4(),
                name: action.payload.name || "Uploaded Resume",
                date: now.toLocaleDateString(),
                time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'uploaded',
                data: action.payload.data
            };
            return { ...state, allResumes: [...state.allResumes, newUploaded] };
        }

        case "DELETE_SAVED_RESUME":
            return { ...state, allResumes: state.allResumes.filter(r => r.id !== action.id) };

        case "SET_ACTIVE_RESUME":
            return { ...state, activeResume: action.payload };

        default:
            return state;
    }
}

export function ResumeProvider({ children }) {
    const [state, dispatch] = useReducer(resumeReducer, initialGlobalState);
    const [isLoaded, setIsLoaded] = React.useState(false);

    // Load from local storage on mount
    useEffect(() => {
        try {
            const activeSaved = localStorage.getItem("resume-data");
            const allSaved = localStorage.getItem("all-resumes-data");
            
            if (activeSaved) {
                dispatch({ type: "LOAD_ACTIVE_DATA", payload: JSON.parse(activeSaved) });
            }
            if (allSaved) {
                dispatch({ type: "LOAD_ALL_DATA", payload: JSON.parse(allSaved) });
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
                localStorage.setItem("resume-data", JSON.stringify(state.activeResume));
                localStorage.setItem("all-resumes-data", JSON.stringify(state.allResumes));
            } catch (e) {
                console.error("Failed to save resume data", e);
            }
        }
    }, [state, isLoaded]);

    return (
        <ResumeContext.Provider value={{ resume: state.activeResume, allResumes: state.allResumes, dispatch, isLoaded }}>
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
