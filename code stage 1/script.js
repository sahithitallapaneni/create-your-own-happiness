// Sample data
const data = [10, 20, 30, 40, 50];

// Set dimensions for the chart
const width = 500;
const height = 300;
const barWidth = width / data.length;

// Create an SVG container
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// Create bars for the bar chart
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * barWidth)
    .attr('y', d => height - d * 5)
    .attr('width', barWidth - 10)
    .attr('height', d => d * 5)
    .attr('fill', 'steelblue');

// Add labels to each bar
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', (d, i) => i * barWidth + barWidth / 2 - 5)
    .attr('y', d => height - d * 5 - 5)
    .text(d => d)
    .attr('fill', 'black')
    .attr('font-size', '12px');
