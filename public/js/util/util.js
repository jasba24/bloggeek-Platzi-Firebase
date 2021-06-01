class Utilidad {
	static obtenerFecha(timeStamp) {
		const d = new Date(timeStamp)
		let month = "" + (d.getMonth() + 1)
		let day = "" + d.getDate()
		let year = d.getFullYear()

		if (month.length < 2) month = "0" + month
		if (day.length < 2) day = "0" + day

		return [day, month, year].join("/")
	}
	static configurarUrlYoutube(url) {
		const varEmbed = "embed/"
		const varWatch = "watch?v="
		if (!url.includes(varWatch)) {
			return `${url.slice(0, 24)}embed/${url.slice(24)}`
		}
		if (url) {
			let newUrl = url.replace(varWatch, varEmbed)
			return newUrl
		}
	}
}
