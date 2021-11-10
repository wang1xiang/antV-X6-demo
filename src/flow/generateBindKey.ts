const generateBindKey = (graph) => {
    
  // #region 快捷键与事件
  // copy cut paste
  graph.bindKey(["meta+c", "ctrl+c"], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.copy(cells);
    }
    return false;
  });
  graph.bindKey(["meta+x", "ctrl+x"], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.cut(cells);
    }
    return false;
  });
  graph.bindKey(["meta+v", "ctrl+v"], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 });
      graph.cleanSelection();
      graph.select(cells);
    }
    return false;
  });

  //undo redo
  graph.bindKey(["meta+z", "ctrl+z"], () => {
    if (graph.history.canUndo()) {
      graph.history.undo();
    }
    return false;
  });
  graph.bindKey(["meta+shift+z", "ctrl+shift+z"], () => {
    if (graph.history.canRedo()) {
      graph.history.redo();
    }
    return false;
  });

  // select all
  graph.bindKey(["meta+a", "ctrl+a"], () => {
    const nodes = graph.getNodes();
    if (nodes) {
      graph.select(nodes);
    }
  });

  //delete
  graph.bindKey("backspace", () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.removeCells(cells);
    }
  });

  //delete
  graph.bindKey("del", () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.removeCells(cells);
    }
  });

  // zoom
  graph.bindKey(["ctrl+-", "meta+1"], () => {
    const zoom = graph.zoom();
    if (zoom < 1.5) {
      graph.zoom(0.1);
    }
  });
  graph.bindKey(["ctrl++", "meta+2"], () => {
    const zoom = graph.zoom();
    if (zoom > 0.5) {
      graph.zoom(-0.1);
    }
  });
}

export default generateBindKey;