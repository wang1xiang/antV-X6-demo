// 清空事件
const clearEvent = (graph) => {
  graph.off('node:click')
  graph.off('node:mouseenter')
  graph.off('node:mouseleave')
  graph.off('cell:mouseenter')
  graph.off('cell:mouseenter')
};
export default clearEvent;
