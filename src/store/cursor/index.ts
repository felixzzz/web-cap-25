import { create } from "zustand"

type CursorStore = {
  isHovered: boolean
  setIsHovered: (isHovered: boolean) => void

  text: string
  setText: (text: string) => void
}

export const useCursorStore = create<CursorStore>((set) => ({
  isHovered: false,
  setIsHovered: (isHovered: boolean) => set(() => ({ isHovered })),

  text: "",
  setText: (text: string) => set(() => ({ text })),
}))
