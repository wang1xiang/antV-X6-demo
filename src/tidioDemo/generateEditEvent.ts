const generateEditEvent = (graph, refContainer, setSelectedEdge, setSelectedNode, setDrawerVisible) => {
  // 控制连接桩显示/隐藏
  const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? "visible" : "hidden";
    }
  };
  graph.on("node:click", ({ node }) => {
    setSelectedNode(node);
    setDrawerVisible(true);
  });
  graph.on("node:mouseenter", ({ node }) => {
    const container = refContainer!;
    const ports = container.current.querySelectorAll(
      ".x6-port-body"
    ) as NodeListOf<SVGElement>;
    showPorts(ports, true);
    console.log(node)
  });
  graph.on("node:mouseleave", () => {
    const container = refContainer!;
    const ports = container.current.querySelectorAll(
      ".x6-port-body"
    ) as NodeListOf<SVGElement>;
    showPorts(ports, false);
  });
  // 边添加完成后选择
  graph.on('edge:connected', ({ isNew, edge }) => {
    if (isNew) {
      setSelectedEdge(edge);
    }
  })
  graph.on('cell:mouseenter', ({ cell }) => {
    if (cell.isNode()) {
      cell.addTools([
        {
          name: 'boundary',
          args: {
            attrs: {
              fill: '#7c68fc',
              stroke: '#333',
              'stroke-width': 1,
              'fill-opacity': 0.2,
            },
          },
        },
        {
          name: 'button',
          args: {
            markup: [
              {
                tagName: 'circle',
                selector: 'button',
                attrs: {
                  r: 8,
                  stroke: 'white',
                  fill: 'white',
                  cursor: 'pointer',
                },
              },
              {
                tagName: 'text',
                textContent: 'x',
                selector: 'icon',
                attrs: {
                  fill: '#fe854f',
                  'font-size': 10,
                  'text-anchor': 'middle',
                  'pointer-events': 'none',
                  y: '0.3em',
                },
              },
            ],
            x: 8,
            y: 8,
            onClick({ view }: any) {
              const node = view.cell
              graph.removeCell(node.id)
            },
          },
        },
        {
          name: 'button',
          args: {
            markup: [
              {
                tagName: 'circle',
                selector: 'button',
                attrs: {
                  r: 8,
                  stroke: 'white',
                  fill: 'white',
                  cursor: 'pointer',
                },
              },
              {
                tagName: 'text',
                textContent: 'c',
                selector: 'icon',
                attrs: {
                  fill: '#fe854f',
                  'font-size': 10,
                  'text-anchor': 'middle',
                  'pointer-events': 'none',
                  y: '0.3em',
                },
              },
            ],
            x: 48,
            y: 8,
            onClick({ view }: any) {
              const node = view.cell
              graph.copy([node]);
              const cells = graph.paste({ offset: 32 });
              graph.cleanSelection();
              graph.select(cells);
            },
          },
        }
      ])
    } else {
      cell.addTools([{
        name: 'button-remove',
        args: { distance: -40 },
      }])
    }
  })
  
  graph.on('cell:mouseleave', ({ cell }) => {
    cell.removeTools();
  })
};
export default generateEditEvent;
