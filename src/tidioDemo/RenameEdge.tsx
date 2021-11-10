import React, { FC, useEffect, useState, useRef } from "react";
import { Menu, Dropdown } from "antd";
interface IProps {
  selectedEdge: any;
  changeEdge: (label: string) => void;
}

const RenameEdge: FC<IProps> = ({ selectedEdge, changeEdge }) => {
  const inputEl = useRef(null);
  const [menuList , setMenuList] = useState([]);
  const menu = (
    <Menu onClick={(e) => handleClick(e)}>
      {menuList.map(menu => <Menu.Item key={menu}>{menu}</Menu.Item>)}
    </Menu>
  );
  const handleClick = (e) => {
    changeEdge(e.key);
    setVisible(false);
  };

  useEffect(() => {
    if (selectedEdge) {
      // 获取两点之间的位置
      const {start, end} = selectedEdge.getPolyline();
      setMenuList(selectedEdge.getSourceNode().data.answer);
      inputEl.current.style.left = `${(end.x + start.x) / 2}px`;
      inputEl.current.style.top = `${(end.y + start.y) / 2}px`;
      setVisible(true);
    }
  }, [selectedEdge]);

  const [visible, setVisible] = useState(false);
  return (
    <div ref={inputEl} style={{width: '200px', height: '200px', position: 'absolute', left: '-1000px', top: '-1000px'}}>
      <Dropdown overlay={menu} visible={visible}>
        <p></p>
      </Dropdown>
    </div>
  );
};

export default RenameEdge;
