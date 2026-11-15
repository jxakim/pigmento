import { createContext, type Snippet } from "svelte"

export interface TopbarContent {
	end?: Snippet
}

export const [getTopbarContent, setTopbarContent] = createContext<TopbarContent>()
