const generateEvent = (graph, refContainer) => {
  // 控制连接桩显示/隐藏
  const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? "visible" : "hidden";
    }
  };
  graph.on("node:mouseenter", () => {
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
  graph.on('edge:dblclick', ({ cell, e }) => {
    cell.addTools({
      name: 'edge-editor',
      args: {
        event: e,
      },
    })
  })
};
export default generateEvent;
