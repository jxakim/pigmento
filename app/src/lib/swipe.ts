import type { Attachment } from "svelte/attachments"

const minimumDistanceInPixels = 60
const maximumSlopeRatio = 0.5

interface SwipeHandlers {
	onSwipeLeft: () => void
	onSwipeRight: () => void
}

export function swipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers): Attachment<HTMLElement> {
	return (element) => {
		let start: PointerEvent | undefined

		function startSwipe(event: PointerEvent) {
			start = event.pointerType === "touch" ? event : undefined
		}

		function endSwipe(event: PointerEvent) {
			if (!start) {
				return
			}
			const distanceX = event.clientX - start.clientX
			const distanceY = event.clientY - start.clientY
			start = undefined

			const isHorizontalSwipe = Math.abs(distanceX) >= minimumDistanceInPixels && Math.abs(distanceY) <= Math.abs(distanceX) * maximumSlopeRatio
			if (!isHorizontalSwipe) {
				return
			}
			if (distanceX < 0) {
				onSwipeLeft()
			} else {
				onSwipeRight()
			}
		}

		function cancelSwipe() {
			start = undefined
		}

		element.addEventListener("pointerdown", startSwipe)
		element.addEventListener("pointerup", endSwipe)
		element.addEventListener("pointercancel", cancelSwipe)

		return () => {
			element.removeEventListener("pointerdown", startSwipe)
			element.removeEventListener("pointerup", endSwipe)
			element.removeEventListener("pointercancel", cancelSwipe)
		}
	}
}
