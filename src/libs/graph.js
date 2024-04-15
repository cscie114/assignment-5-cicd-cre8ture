const d3 = require('d3');
export function createGraph(container, nodes, links) {
    const width = 800, height = 600;

    d3.select(container).selectAll("*").remove();
    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

         // Create the title at the top of the graph
    svg.append('text')
    .attr('x', width / 2)  // Center the title
    .attr('y', 20)  // Position the title within the titleHeight area
    .attr('text-anchor', 'middle')  // Center the text around the x coordinate
    .style('font-size', '16px')  // Font size of the title
    .style('fill', '#007BA7')  // Using the blueprint-style blue
    .text('Visualizing the Paper');  // Text of the title

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-50))
        .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link')
        .style('stroke', '#ccc')
        .style('stroke-width', 2);

    // Create edge labels with blueprint blue color
    const edgeLabels = svg.selectAll('.edgeLabel')
        .data(links)
        .enter().append('text')
        .attr('class', 'edgeLabel')
        .text(d => d.relation)  // Assuming each link has a 'relation' property
        .style('font-family', 'sans-serif')
        .style('font-size', '10px')
        .style('fill', '#007BA7');  // Blueprint blue color for edge labels

    const node = svg.selectAll('.node')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'node')
        .attr('r', 5)
        .style('fill', 'red');

    // Node labels with blueprint blue color
    const labels = svg.selectAll('.label')
        .data(nodes)
        .enter().append('text')
        .attr('class', 'label')
        .text(d => d.label)
        .style('font-family', 'sans-serif')
        .style('font-size', '10px')
        .style('pointer-events', 'none')
        .style('fill', '#007BA7');  // Blueprint blue color for node labels

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

    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => Math.max(5, Math.min(width - 155, d.x)))
            .attr('cy', d => Math.max(5, Math.min(height - 55, d.y)));

        labels
            .attr('x', d => d.x + 8)
            .attr('y', d => d.y + 3);

        edgeLabels
            .attr('x', d => (d.source.x + d.target.x) / 2)
            .attr('y', d => (d.source.y + d.target.y) / 2);
    });
}
