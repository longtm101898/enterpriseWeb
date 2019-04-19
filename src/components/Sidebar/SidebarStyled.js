import styled from 'styled-components';
import SideNav, {
    Toggle,
    Nav,
    NavItem,
    NavIcon,
    NavText
} from '@trendmicro/react-sidenav';

// SideNav
const SidebarStyled = styled(SideNav)`
    background-color: #fff !important;
    border-right: 1px solid #ddd !important;
`;
SidebarStyled.defaultProps = SideNav.defaultProps;

// Toggle
const StyledToggle = styled(Toggle)`
    background-color: #db3d44 !important;
`;
StyledToggle.defaultProps = Toggle.defaultProps;

// Nav
const StyledNav = styled(Nav)`
    background-color: #fff !important;
    &&[class*="expanded--"] {
        [class*="sidenav-subnav--"] {
            > [class*="sidenav-subnavitem--"],
            > [class*="sidenav-subnavitem--"]:hover {
                > [class*="navitem--"] {
                    color: #222 !important;
                }
            }
            > [class*="sidenav-subnavitem--"]:hover {
                > [class*="navitem--"] {
                    background-color: #eee !important;
                }
            }
            > [class*="sidenav-subnavitem--"][class*="selected--"] {
                > [class*="navitem--"] {
                    color: #db3d44 !important;
                }
                > [class*="navitem--"]::before {
                    border-left: 2px solid #db3d44 !important;
                }
            }
        }
    }
    && > [class*="sidenav-navitem--"] {
        > [class*="navitem--"] {
            background-color: inherit !important;
            color: #222 !important;
        }
    }
    && > [class*="sidenav-navitem--"]:hover {
        > [class*="navitem--"] {
            background-color: #eee !important;
        }
    }
    && > [class*="sidenav-navitem--"],
    && > [class*="sidenav-navitem--"]:hover {
        > [class*="navitem--"] {
            [class*="navicon--"] {
                &, > * {
                    color: #666 !important;
                }
            }
            [class*="sidenav-nav-text--"] {
                &, > * {
                    color: #222 !important;
                }
            }
        }
    }
    && > [class*="sidenav-navitem--"][class*="highlighted--"],
    && > [class*="sidenav-navitem--"][class*="highlighted--"]:hover {
        > [class*="navitem--"] {
            [class*="navicon--"],
            [class*="navtext--"] {
                &, > * {
                    color: #db3d44 !important;
                }
            }
            [class*="sidenav-nav-text--"] {
                font-weight: 700 !important;
            }
        }
    }
`;
StyledNav.defaultProps = Nav.defaultProps;

// NavItem
const StyledNavItem = styled(NavItem)`
    &&&:hover {
        [class*="navtext--"] {
            color: #222 !important;
        }
    }
`;
StyledNavItem.defaultProps = NavItem.defaultProps;

// NavIcon
const StyledNavIcon = styled(NavIcon)`
    color: #222 !important;
`;
StyledNavIcon.defaultProps = NavIcon.defaultProps;

// NavText
const StyledNavText = styled(NavText)`
    color: #222 !important;
`;
StyledNavText.defaultProps = NavText.defaultProps;

const NavHeader = styled.div`
  display: ${props => (props.expanded ? "block" : "none")};
  white-space: nowrap;
  background-color: #db3d44;
  color: #fff;
  > * {
    color: inherit;
    background-color: inherit;
  }
`;
const NavTitle = styled.div`
    font-size: 1.7em;
    line-height: 20px;
    padding: 10px 0;
`;
// height: 20px + 4px = 24px;
const NavSubTitle = styled.div`
    font-size: 0.8em;
    line-height: 20px;
    padding-bottom: 4px;
`;
export {
    StyledToggle as Toggle,
    StyledNav as Nav,
    StyledNavItem as NavItem,
    StyledNavIcon as NavIcon,
    StyledNavText as NavText,
    NavHeader,
    NavTitle,
    NavSubTitle
};
export default SidebarStyled;