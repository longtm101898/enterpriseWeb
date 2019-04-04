import React from "react";
import { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
const SidebarNav = ({ Sidebar: item }) => {
  return (
    <NavItem eventKey={item.url}>
      <NavIcon>
        <i className="fa fa-fw fa-user" style={{ fontSize: "1.75em" }} />
      </NavIcon>
      <NavText>{item.name}</NavText>
      {item.childFunctions &&
        item.childFunctions.map((item, i) => (
          <NavItem key={item.id} eventKey={item.url}>
            <NavText>{item.name}</NavText>
          </NavItem>
        ))}
    </NavItem>
  );
};

export default SidebarNav;
