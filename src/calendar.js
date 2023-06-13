import { getMonth, getYear, getDay, getDaysInMonth } from './dates'
import { state } from './state'

const template = `
<section class="calendar" data-view="${state.calendar.view}" >
  <div class="inner"></div>
</section>
`

export function initCalendar() {
	state.$element.insertAdjacentHTML('beforeend', template)
	state.calendar.$element = state.$element.querySelector('section.calendar')
	updateView()

	state.calendar.setDate = (date) => {
		state.calendar.date = date
		updateView()
	}
}

function updateView() {
	const { date } = state.calendar

	const currentYear = getYear()
	const currentMonth = getMonth()
	const currentDay = getDay()

	const year = getYear(date)
	const month = getMonth(date)

	const days = getDaysInMonth(year, month)

	let content = ''
	for (let day = 1; day <= days; day++) {
		let isCurrentDay =
			currentYear === year && currentMonth === month && currentDay === day
		content += `
      <div class="cell ${
				isCurrentDay ? 'act' : ''
			}" data-date="${year}-${month}-${day}">
        <label>${day}</label>
      </div>
    `
	}

	state.calendar.$element.querySelector('.inner').innerHTML = content

	state.calendar.onDateChanges$.publish(date)
}
