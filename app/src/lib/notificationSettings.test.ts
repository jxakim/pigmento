import { describe, expect, it } from "vitest"
import { formatDayCount } from "./notificationSettings.svelte.ts"

describe("formatDayCount", () => {
	it("uses singular for one day and plural for the rest", () => {
		expect(formatDayCount(1)).toBe("1 dag")
		expect(formatDayCount(3)).toBe("3 dager")
		expect(formatDayCount(14)).toBe("14 dager")
	})
})
