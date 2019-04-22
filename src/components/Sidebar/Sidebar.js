import React from "react";
import { withRouter, Link } from "react-router-dom";
import cwApi from "../../axios-ew";
import SideNav, {
  NavItem,
  Nav,
  NavIcon,
  NavText,
  NavHeader,
  Toggle,
  NavTitle,
  NavSubTitle
} from "./SidebarStyled";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { getCurrentUser } from "../../services/authService";
import history from "../../history";
import ClickOutside from "./ClickOutside";

class Sidebar extends React.Component {
  state = { functions: [], expanded: false };
  showSettings(event) {
    event.preventDefault();
  }

  componentDidMount = async () => {
    if (localStorage.getItem("tokenKey") === null) {
      this.props.history.push("/login");
    } else {
      var { Id: userId } = getCurrentUser();
      let functions = [];
      await cwApi.get("permission/" + userId + "/functions-view").then(
        res =>
          (functions = res.data.sort((n1, n2) => {
            if (n1.SortOrder > n2.SortOrder) return 1;
            else if (n1.SortOrder < n2.SortOrder) return -1;
            return 0;
          }))
      );
      this.setState({
        functions
      });
    }
  };

  render() {
    const { functions } = this.state;

    return (
      <ClickOutside
        onClickOutside={() => {
          this.setState({ expanded: false });
        }}
      >
        <SideNav
          expanded={this.state.expanded}
          onToggle={expanded => {
            this.setState({ expanded });
          }}
          onSelect={selected => {
            const to = "/" + selected;
            if (window.location.pathname !== to) {
              history.push(to);
            }
          }}
        >
          <Toggle />
          <NavHeader expanded={this.state.expanded}>
            <NavTitle>COMP1640</NavTitle>
            <NavSubTitle>Contribution management</NavSubTitle>
          </NavHeader>
          <Nav defaultSelected="">
            <NavItem eventKey="">
              <NavIcon>
                <i
                  className="fa fa-fw fa-home"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            {/* <NavItem eventKey="demo"> */}
            {/* <NavIcon>
              <i className="fa fa-fw fa-user" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>System</NavText> */}
            {functions.map((item, i) => {
              if (!item.parentId) {
                return (
                  <NavItem eventKey={item.url} key={item.id}>
                    <NavIcon>
                      <i
                        className={item.iconCss}
                        style={{ fontSize: "1.75em" }}
                      />
                    </NavIcon>
                    <NavText>{item.name}</NavText>
                    {item.childFunctions &&
                      item.childFunctions.map((item, i) => (
                        <NavItem key={item.id} eventKey={item.url}>
                          <NavText>
                            <Link to={item.url}>{item.name}</Link>
                          </NavText>
                        </NavItem>
                      ))}
                  </NavItem>
                );
              }
            })}
            {/* </NavItem> */}
          </Nav>
        </SideNav>
      </ClickOutside>
    );
  }
}
export default withRouter(Sidebar);
