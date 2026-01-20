"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface LanguageAvailabilityContextType {
    availableLanguages: {
        en: boolean
        id: boolean
    }
    setAvailableLanguages: (languages: { en: boolean; id: boolean }) => void
}

const LanguageAvailabilityContext = createContext<LanguageAvailabilityContextType | undefined>(
    undefined
)

export function LanguageAvailabilityProvider({
    children,
}: {
    children: ReactNode
}) {
    const [availableLanguages, setAvailableLanguages] = useState({
        en: true,
        id: true,
    })

    return (
        <LanguageAvailabilityContext.Provider
            value={{ availableLanguages, setAvailableLanguages }}
        >
            {children}
        </LanguageAvailabilityContext.Provider>
    )
}

export function useLanguageAvailability() {
    const context = useContext(LanguageAvailabilityContext)
    if (context === undefined) {
        throw new Error(
            "useLanguageAvailability must be used within a LanguageAvailabilityProvider"
        )
    }
    return context
}
