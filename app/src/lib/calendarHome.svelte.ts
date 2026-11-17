export const calendarHomeRequests = $state({ count: 0 })

export function requestCalendarHome() {
	calendarHomeRequests.count++
}
