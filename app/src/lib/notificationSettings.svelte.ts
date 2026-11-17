export const notificationSettings = $state({
	inquiryWaitDays: 3,
	depositLeadDays: 3,
	aftercareDays: 14,
	sendEveningSummary: true
})

export function formatDayCount(days: number): string {
	return days === 1 ? "1 dag" : `${days} dager`
}
