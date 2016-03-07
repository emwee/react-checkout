function parseEntities(entities) {
	return entities.reduce((obj, entity) => {
		obj[entity.id] = entity
		return obj
	}, {})
}

export default function parseCheckoutData(checkout_data) {

	const data = checkout_data

	data.entities = {}

	data.entities.timeslots = parseEntities(data.timeslots)

	data.entities.variants = parseEntities(data.variants)

	return data
}