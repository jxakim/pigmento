import { describe, expect, it } from "vitest"
import { getTickPosition, getTrackPosition, trackTickHours } from "./workHoursTrack.ts"

describe("the hour track", () => {
	it("runs from 06:00 to midnight with a tick every second hour", () => {
		expect(trackTickHours).toEqual([6, 8, 10, 12, 14, 16, 18, 20, 22, 24])
		expect(getTickPosition(6)).toBe("0%")
		expect(getTickPosition(15)).toBe("50%")
		expect(getTickPosition(24)).toBe("100%")
	})

	it("places hours by where they start and how long they last", () => {
		expect(getTrackPosition({ start: "10:30", end: "19:30" })).toEqual({ left: "25%", width: "50%" })
		expect(getTrackPosition({ start: "06:00", end: "24:00" })).toEqual({ left: "0%", width: "100%" })
	})
})
