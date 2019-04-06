import React from "react";
import { withRouter, Link } from "react-router-dom";
import cwApi from "../../axios-ew";
import SideNav, {
  NavItem,
  NavIcon,
  NavText,
  Toggle
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { getCurrentUser } from "../../services/authService";
import history from "../../history";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { functions: [] };
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
      <SideNav
        onSelect={selected => {
          // Add your code here
          history.push(selected)
        }}
      >
        <Toggle />
        <SideNav.Nav defaultSelected="home">
       
          <NavItem eventKey="home">
          
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
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
                      className="fa fa-fw fa-user"
                      style={{ fontSize: "1.75em" }}
                    />
                  </NavIcon>
                  <NavText>{item.name}</NavText>
                  {item.childFunctions &&
                    item.childFunctions.map((item, i) => (
                      <NavItem key={item.id} eventKey={item.url}>
                        <NavText><Link to={item.url}>{item.name}</Link></NavText>
                      </NavItem>
                    ))}
                </NavItem>
              );
            }
          })}
          {/* </NavItem> */}
        </SideNav.Nav>
      </SideNav>
    );
  }
}
export default withRouter(Sidebar);
