function createBarChart(container, data) {
	const width = 720;
	const rowHeight = 29;
	const margin = { top: 4, right: 38, bottom: 4, left: 183 };
	const height = margin.top + margin.bottom + data.length * rowHeight;
	const chart = d3.select(container);

	if (chart.empty()) {
		throw new Error(`Bar chart container not found: ${container}`);
	}

	if (data.length === 0) {
		throw new Error("Cannot create a bar chart without data.");
	}

	const sortedData = [...data].sort((a, b) => b.count - a.count);
	const x = d3.scaleLinear()
		.domain([0, d3.max(sortedData, d => d.count) * 1.12])
		.range([0, width - margin.left - margin.right]);
	const y = d3.scaleBand()
		.domain(sortedData.map(d => d.brand))
		.range([margin.top, height - margin.bottom])
		.padding(0.2);

	chart.selectAll("*").remove();

	const svg = chart.append("svg")
		.attr("viewBox", `0 0 ${width} ${height}`)
		.attr("role", "img")
		.attr("aria-label", "Television model counts by brand, sorted from highest to lowest")
		.attr("preserveAspectRatio", "xMinYMin meet");

	svg.append("rect")
		.attr("class", "bar-chart-border")
		.attr("x", 0.5)
		.attr("y", 0.5)
		.attr("width", width - 1)
		.attr("height", height - 1);

	const rows = svg.selectAll(".bar-row")
		.data(sortedData)
		.join("g")
		.attr("class", "bar-row")
		.attr("transform", d => `translate(0, ${y(d.brand)})`);

	rows.append("text")
		.attr("class", "bar-label")
		.attr("x", margin.left - 5)
		.attr("y", y.bandwidth() / 2)
		.attr("dy", "0.35em")
		.attr("text-anchor", "end")
		.text(d => d.brand);

	rows.append("rect")
		.attr("class", "bar")
		.attr("x", margin.left)
		.attr("y", 0)
		.attr("width", d => x(d.count))
		.attr("height", y.bandwidth());

	rows.append("text")
		.attr("class", "bar-value")
		.attr("x", d => margin.left + x(d.count) + 4)
		.attr("y", y.bandwidth() / 2)
		.attr("dy", "0.35em")
		.text(d => d.count);
}