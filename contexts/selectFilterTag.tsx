/** React context for selecting category filters. */

import {
  useState,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  ReactNode,
  Context,
} from "react"
import { CardContentType, mockData } from "../pages"

export interface SelectFilterTagContextType {
  selectedTags: string[]
  setSelectedTags: Dispatch<SetStateAction<string[]>>
}

const SelectedFilterTagContext = createContext<SelectFilterTagContextType>({
  selectedTags: [],
  setSelectedTags: (selectedTags: string[]) => {},
})

export function useSelectedFilterTagContext(): SelectFilterTagContextType {
  return useContext(SelectedFilterTagContext)
}

interface ProviderPropType {
  children: ReactNode
}

export function SelectFilterTagContextProvider({ children }: ProviderPropType) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  return (
    <SelectedFilterTagContext.Provider
      value={{ selectedTags, setSelectedTags }}
    >
      {children}
    </SelectedFilterTagContext.Provider>
  )
}
