// Set up the SVG canvas dimensions
const svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

// Read the CSV file located in the 'Data' folder
d3.csv("data/IEA-EV-dataEV charging pointsHistoricalEV.csv").then(function(data) {
    // Convert the 'value' column to a number for proper scaling
    data.forEach(d => {
        d.value = +d.value;
        d.year = +d.year;
    });

    // Set up the x and y scales
    const x = d3.scaleBand()
                .domain(data.map(d => d.year))
                .range([0, width])
                .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value)])
                .nice()
                .range([height, 0]);

    // Append bars for each year
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.year))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value));

    // Append x-axis
    svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x));

    // Append y-axis
    svg.append("g")
       .attr("class", "y axis")
       .call(d3.axisLeft(y));
});

