import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import './GraphContainer.css'; // CSS for additional styling

const CytoscapeComponent: React.FC = () => {
  const cyRef = useRef<HTMLDivElement>(null); // Ref for the Cytoscape container

  useEffect(() => {
    if (cyRef.current) {
      // Create nodes with image URLs
      const nodes = [
        { data: { id: 'node1', label: 'goku', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/640px-Python.svg.png' } },
        { data: { id: 'node2', label: 'Node 2', imageUrl: 'https://okhosting.com/wp-content/uploads/2019/01/java.jpg' } },
        { data: { id: 'node3', label: 'Node 3', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png' } },
        { data: { id: 'node4', label: 'Node 4', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png' } },
        { data: { id: 'node5', label: 'Node 5', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png' } },
        { data: { id: 'node6', label: 'Node 6', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg' } },
      ];

      // Create edges connecting all nodes to each other
      const edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          edges.push({ data: { source: nodes[i].data.id, target: nodes[j].data.id } });
        }
      }

      // Initialize Cytoscape
      const cy = cytoscape({
        container: cyRef.current,
        elements: [...nodes, ...edges],
        style: [
          {
            selector: 'node',
            style: {
              'background-color': '#888',
              'background-image': 'data(imageUrl)',
              'background-fit': 'cover',
              'border-color': '#333',
              'border-width': 2,
              'width': 50,
              'height': 50,
              'label': 'data(label)',
              'text-valign': 'bottom',
              'color': '#333',
              'font-size': '12px',
              'transition-property': 'width, height',
            },
          },
          {
            selector: 'node:hover',
            style: {
              'width': 70,
              'height': 70,
            },
          },
          {
            selector: 'edge',
            style: {
              'width': 2,
              'line-color': '#FF4136',
              'target-arrow-color': '#FF4136',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
            },
          },
        ],
        layout: {
          name: 'circle',
        },
      });

      // Clean up Cytoscape instance on component unmount
      return () => cy.destroy();
    }
  }, []);

  return <div ref={cyRef} className="cy-container" />;
};

export default CytoscapeComponent;
