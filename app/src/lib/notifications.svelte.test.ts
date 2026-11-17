import { describe, expect, it } from "vitest"
import { countHandled, getOpenNotifications, getUrgentNotifications, markAsDone, snoozeUntilTomorrow } from "./notifications.svelte.ts"
import { notifications } from "./sampleData.ts"

describe("handling notifications", () => {
	it("starts with every notification open", () => {
		expect(getOpenNotifications()).toEqual(notifications)
		expect(countHandled("done")).toBe(0)
		expect(countHandled("snoozed")).toBe(0)
	})

	it("removes a notification from the open ones when it is done", () => {
		markAsDone("inquiry-martin")

		expect(getOpenNotifications().map((notification) => notification.id)).not.toContain("inquiry-martin")
		expect(countHandled("done")).toBe(1)
	})

	it("removes a snoozed notification from the open ones too", () => {
		snoozeUntilTomorrow("deposit-kasper")

		expect(getOpenNotifications().map((notification) => notification.id)).not.toContain("deposit-kasper")
		expect(countHandled("snoozed")).toBe(1)
	})

	it("only counts open notifications as urgent", () => {
		expect(getUrgentNotifications()).toEqual([])
	})
})
