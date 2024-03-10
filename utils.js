async function sort(order, data) {
	return await data.sort(function (a, b) {
		return new Date(a.date).getTime() > new Date(b.date).getTime()
			? order === "asc"
				? -1
				: 1
			: order === "desc"
			? 1
			: -1
	})
}

module.exports = { sort }
