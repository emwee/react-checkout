import $ from 'jquery'
import 'jquery.scrollto'

export const scrollToField = node => {
	console.log('scrollToField', node)
	$.scrollTo($(node), 300, {
		onAfter: function() {
			console.log('scrollTo onAfter callback')
		}
  })
}