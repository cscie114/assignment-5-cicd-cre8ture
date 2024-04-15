const d3 = require('d3');

// Your existing code...
export function createGraph(container, nodes, links) {
    const width = 800, height = 600;

    // Clear existing contents in the container
    d3.select(container).selectAll("*").remove();

    // Create a new SVG element inside the specified container
    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    console.log("Nodes:", nodes);

    // Create the simulation
    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2));

    // Add lines for every link in the dataset
    const link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link')
        .style('stroke', '#ccc')
        .style('stroke-width', 2);

    const node = svg.selectAll('.node')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'node')
        .attr('r', 5)
        .style('fill', 'red');

    // Add drag capabilities
    const dragHandler = d3.drag()
        .on('start', function (event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        })
        .on('drag', function (event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        })
        .on('end', function (event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        });

    dragHandler(node);

    // Define the tick function for the simulation
    function ticked() {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    }

    // Run the simulation
    simulation.on('tick', ticked);
}
