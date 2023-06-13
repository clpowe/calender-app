class PubSub {
	subscribers = []

	subscribe(callback) {
		this.subscribers.push(callback)
	}

	publish(data) {
		this.subscribers.forEach((callback) => callback(data))
	}
}

export const state = {
	$element: null,

	calendar: {
		$element: null,
		view: 'month',
		date: new Date(),
		onDateChanges$: new PubSub(),
		setDate: () => {}
	},

	version: '1.0.0'
}
