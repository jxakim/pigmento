import { describe, expect, it } from "vitest"
import type { AppNotification } from "#lib/sampleData.ts"
import { matchesFilter } from "./notificationFilters.ts"

const urgentDeposit: AppNotification = {
	id: "deposit-kasper",
	urgency: "urgent",
	category: "deposit",
	title: "Kasper Aas mangler depositum",
	description: "Tatovering i morgen kl. 11:00",
	dueLabel: "I morgen",
	actionLabel: "Åpne kalenderen",
	actionHref: "/calendar"
}

describe("matchesFilter", () => {
	it("shows every notification when all are wanted", () => {
		expect(matchesFilter(urgentDeposit, "all")).toBe(true)
	})

	it("filters on urgency", () => {
		expect(matchesFilter(urgentDeposit, "urgent")).toBe(true)
		expect(matchesFilter({ ...urgentDeposit, urgency: "soon" }, "urgent")).toBe(false)
	})

	it("filters on category", () => {
		expect(matchesFilter(urgentDeposit, "deposit")).toBe(true)
		expect(matchesFilter(urgentDeposit, "inquiry")).toBe(false)
	})
})
