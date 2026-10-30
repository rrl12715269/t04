d3.csv("data/tvBrandCount.csv", row => {
	const count = Number(row.count);

	if (!row.brand || !Number.isFinite(count)) {
		throw new Error(`Invalid television brand data: ${JSON.stringify(row)}`);
	}

	return { brand: row.brand, count };
})
	.then(data => createBarChart("#brand-chart", data))
	.catch(error => {
		console.error("Could not load the television brand chart.", error);
		d3.select("#brand-chart")
			.append("p")
			.attr("class", "chart-error")
			.text("The television brand chart could not be loaded.");
	});