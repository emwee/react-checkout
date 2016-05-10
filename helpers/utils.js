import $ from 'jquery'
import 'jquery.scrollto'

export const scrollToField = node => {
	$.scrollTo($(node), 300, {
		onAfter: () => {

		},
	})
}
