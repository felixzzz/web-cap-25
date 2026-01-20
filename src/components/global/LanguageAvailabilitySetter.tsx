"use client"

import { useLanguageAvailability } from "@/contexts/LanguageAvailabilityContext"
import { useEffect } from "react"

export default function LanguageAvailabilitySetter({
    availableLanguages,
}: {
    availableLanguages: { en: boolean; id: boolean }
}) {
    const { setAvailableLanguages } = useLanguageAvailability()

    useEffect(() => {
        setAvailableLanguages(availableLanguages)

        // Cleanup to reset when unmounting (optional, or reset to true/true)
        return () => {
            setAvailableLanguages({ en: true, id: true })
        }
    }, [availableLanguages, setAvailableLanguages])

    return null
}
