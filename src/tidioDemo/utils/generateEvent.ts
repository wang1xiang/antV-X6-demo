// 注册事件、包含节点、边
const generateEvent = (graph, refContainer, setSelectedEdge, setSelectedNode, setDrawerVisible) => {
  // 控制连接桩显示/隐藏
  const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? "visible" : "hidden";
    }
  };
  graph.on("node:click", ({ node }) => {
    if (node.label === '首次访问') return;
    setSelectedNode(node);
    setDrawerVisible(true);
  });
  graph.on("node:mouseenter", ({ node }) => {
    const container = refContainer!;
    const ports = container.current.querySelectorAll(
      ".x6-port-body"
    ) as NodeListOf<SVGElement>;
    showPorts(ports, true);
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
    console.log(edge.getSourceNode())
    // 如果有线段时 通过vertices可以调整
    if (isNew && edge.getSourceNode().data.type !== 'trigger') {
      setSelectedEdge(edge);
    }
  })
  graph.on('cell:mouseenter', ({ cell }) => {
    if (cell.isNode()) {
      cell.addTools([
        // {
        //   name: 'boundary',
        //   args: {
        //     attrs: {
        //       fill: '#7c68fc',
        //       stroke: '#333',
        //       'stroke-width': 1,
        //       'fill-opacity': 0.2,
        //     },
        //   },
        // },
        {
          name: 'button',
          args: {
            markup: [
              {
                tagName: 'circle',
                selector: 'button',
                attrs: {
                  r: 12,
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
            x: 0,
            y: 0,
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
                  r: 12,
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
            x: 68,
            y: 0,
            onClick({ view }: any) {
              const node = view.cell
              graph.copy([node]);
              const cells = graph.paste({ offset: 52 });
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
export default generateEvent;
