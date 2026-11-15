export type ZoomDirection = "in" | "out"

interface Point {
	x: number
	y: number
}

const minZoomScale = 1.5
const maxZoomScale = 6
const zoomOutScale = 2.5

export async function animateZoom(container: HTMLElement, changeView: () => Promise<void>, direction: ZoomDirection, zoomTarget?: Element) {
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
	if (!document.startViewTransition || prefersReducedMotion) {
		await changeView()
		return
	}

	const { origin, scale } = direction === "in" && zoomTarget ? zoomTowardsTarget(container, zoomTarget) : zoomFromCenter(container)

	const root = document.documentElement
	root.style.setProperty("--zoom-origin", `${origin.x}px ${origin.y}px`)
	root.style.setProperty("--zoom-old-view-scale", String(direction === "in" ? scale : 1 / scale))
	root.style.setProperty("--zoom-new-view-scale", String(direction === "in" ? 1 / scale : scale))
	root.dataset.zoom = direction

	await document.startViewTransition(changeView).finished.finally(() => {
		delete root.dataset.zoom
	})
}

function zoomFromCenter(container: HTMLElement): { origin: Point; scale: number } {
	const { width, height } = container.getBoundingClientRect()
	return { origin: { x: width / 2, y: height / 2 }, scale: zoomOutScale }
}

// Finner punktet vi må skalere rundt for at målet havner midt i containeren etter zoomen.
function zoomTowardsTarget(container: HTMLElement, target: Element): { origin: Point; scale: number } {
	const containerBox = container.getBoundingClientRect()
	const targetBox = target.getBoundingClientRect()

	const containerCenter = { x: containerBox.width / 2, y: containerBox.height / 2 }
	const targetCenter = {
		x: targetBox.left - containerBox.left + targetBox.width / 2,
		y: targetBox.top - containerBox.top + targetBox.height / 2
	}
	const scale = Math.min(Math.max(containerBox.width / targetBox.width, minZoomScale), maxZoomScale)

	return {
		scale,
		origin: {
			x: (containerCenter.x - scale * targetCenter.x) / (1 - scale),
			y: (containerCenter.y - scale * targetCenter.y) / (1 - scale)
		}
	}
}
