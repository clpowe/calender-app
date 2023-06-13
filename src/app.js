import { state } from './state'
import { initHeader } from './header'
import { initCalendar } from './calendar'

export function initApp(selector) {
	state.$element = document.querySelector(selector)
	initHeader()
	initCalendar()
}
