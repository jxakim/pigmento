import type { Attachment } from "svelte/attachments"

const pressDurationMs = 500
const allowedFingerMovementPx = 10

// Kaller onLongPress når en finger har holdt stille lenge nok og slippes.
// Den kalles ved slipp og ikke under holdet, ellers ville slippet lukket en meny som nettopp ble åpnet.
export function longPress(onLongPress: (event: PointerEvent) => void): Attachment<HTMLElement> {
	return (element) => {
		let pressTimer: number | undefined
		let pressStart: PointerEvent | undefined
		let hasPressedLongEnough = false

		function startPress(event: PointerEvent) {
			if (event.pointerType !== "touch") {
				return
			}
			pressStart = event
			hasPressedLongEnough = false
			pressTimer = window.setTimeout(() => {
				hasPressedLongEnough = true
				navigator.vibrate?.(15)
			}, pressDurationMs)
		}

		function cancelPress() {
			window.clearTimeout(pressTimer)
			pressStart = undefined
			hasPressedLongEnough = false
		}

		function cancelPressIfFingerMoves(event: PointerEvent) {
			if (pressStart && Math.hypot(event.clientX - pressStart.clientX, event.clientY - pressStart.clientY) > allowedFingerMovementPx) {
				cancelPress()
			}
		}

		function endPress() {
			if (pressStart && hasPressedLongEnough) {
				onLongPress(pressStart)
			}
			cancelPress()
		}

		element.addEventListener("pointerdown", startPress)
		element.addEventListener("pointermove", cancelPressIfFingerMoves)
		element.addEventListener("pointerup", endPress)
		element.addEventListener("pointercancel", cancelPress)

		return () => {
			cancelPress()
			element.removeEventListener("pointerdown", startPress)
			element.removeEventListener("pointermove", cancelPressIfFingerMoves)
			element.removeEventListener("pointerup", endPress)
			element.removeEventListener("pointercancel", cancelPress)
		}
	}
}
