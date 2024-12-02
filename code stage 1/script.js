// Sample data
const data = [
    { category: 'A', value: 30 },
    { category: 'B', value: 80 },
    { category: 'C', value: 45 },
    { category: 'D', value: 60 },
    { category: 'E', value: 20 },
    { category: 'F', value: 90 },
    { category: 'G', value: 50 }
];

// Set dimensions
const width = 800;
const height = 400;
const margin = { top: 20, right: 30, bottom: 40, left: 40 };

// Create SVG
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// X and Y scales
const x = d3.scaleBand()
    .domain(data.map(d => d.category))
    .range([margin.left, width - margin.right])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

// Add bars
svg.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.category))
    .attr('y', d => y(d.value))
    .attr('height', d => y(0) - y(d.value))
    .attr('width', x.bandwidth());

// X axis
svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

// Y axis
svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));
