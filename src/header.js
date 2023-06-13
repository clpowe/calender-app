import { state } from './state'
import { addMonths, getMonth, getYear } from './dates'
import { i18n } from './i18n'

const template = `
 <header class="main">
  <a class="logo">📅</a>
  <button>Today</button>

  <nav>
    <button data-dir="prev">←</button>
    <button data-dir="next">→</button>
  </nav>

  <h2>June 2023</h2>
 </header>
`

export function initHeader() {
	state.$element.insertAdjacentHTML('beforeend', template)

	const header = document.querySelector('header.main')
	header.addEventListener('click', (ev) => {
		const { target } = ev

		switch (target.tagName) {
			case 'BUTTON':
				const parent = target.parentElement
				parent.tagName === 'NAV' ? onNavClick(target) : onTodayClick()
		}

		const label = header.querySelector('h2')
		state.calendar.onDateChanges$.subscribe((date) => {
			const month = getMonth(date)
			const year = getYear(date)
			label.innerHTML = `${i18n['month-' + month]} ${year}`
		})
	})

	function onNavClick(target) {
		const direction = target.getAttribute('data-dir')
		const next = addMonths(state.calendar.date, direction === 'prev' ? -1 : +1)
		state.calendar.setDate(next)
	}

	function onTodayClick() {
		state.calendar.setDate(getExactDate())
	}
}
