import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { FaChevronUp, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import usePermissionOnMenu from "./usePermissionOnMenu";
import ActiveLink from "./ActiveLink";

export const styles = {
  styledLink: {
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: '400',
    textDecoration: 'none',
    borderRadius: '8px',
    padding: '0.8rem 1rem',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  styledLinkHover: {
    backgroundColor: '#F0F0FA',
    fontWeight: '500',
    height: '45px',
  },
  collapsedDiv: {
    fontFamily: 'Roboto',
    fontSize: '14px',
    textDecoration: 'none',
    borderRadius: '8px',
    display: 'flex',
    cursor: 'pointer',
    height: '45px',
    color: 'black'
  },
  collapsedDivHover: {
    backgroundColor: '#F0F0FA',
    height: '45px',
  },
  styledUl: {
    listStyle: 'none',
    margin: '0px',
    padding: '0px',
  },
  wrapper: {
    position: 'relative',
    backgroundColor: '#FAFAFF',
  },
  arrowWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
  },
  subMenuMainTitle: {
    marginLeft: '0.5rem',
    whiteSpace: 'nowrap',
    flexGrow: 1, 
  },
  subMenuMainTitleHover: {
    fontWeight: '500',
  },
  sidebar: {
    height: '100vh',
    transition: 'width 200ms',
    paddingTop: '16px',
    paddingBottom: '0px',
    paddingLeft: '10px',
    paddingRight: '10px',
    position: 'sticky',
    top: '0',
  },
  sidebarLogo: {
    cursor: 'pointer',
    color: 'gray'
  },
  sidebarTop: {
    width: 'max-content',
    display: 'flex',
    alignItems: 'center',
    justifySelf: 'center',
    gap: '0.5rem',
    paddingBottom: '1rem',
    marginLeft: '1rem',
    height: '40px',
  },
  logoName: {
    color: '#65657E',
    fontSize: '14px',
    lineHeight: '3',
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  sidebarList: {
    listStyle: 'none',
  },
  divider: {
    borderBottom: '1px solid #D5D5E7',
    height: '0.5px',
  },
  sidebarIcon: {
    fontSize: '1.2rem',
    display: 'inline-block',
  },
  sidebarName: {
    marginLeft: '0.5rem',
  },
  submenuIcon: {
    fontSize: '0.8rem',
    display: 'inline-block',
  },
  submenuName: {
    whiteSpace: 'nowrap',
  },
  closeBtn: {
    position: 'absolute',
    right: '0',
    top: '4.7rem',
    border: '1px solid #e5e7eb',
    borderRadius: '50%',
    backgroundColor: '#fff',
    width: '1.5rem',
    height: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transform: 'translateX(50%)',
    fontSize: '1.1rem',
  },
};

export const getIconColor = (active) => {
  return active ? '#5A2DB2' : '#65657E';
};

export const getDividerWidth = (isOpen) => {
  return isOpen ? '55px' : '248px';
};

export const getPointerEvents = (hasPermission) => {
  return hasPermission ? 'auto' : 'none';
};


export const Wrapper = ({ children, isOpenMenu }) => (
  <div style={{ ...styles.wrapper, width: isOpenMenu ? "74px" : "268px" }}>
    {children}
  </div>
);

export const Sidebar = ({ children, isOpenMenu }) => (
  <aside style={{ ...styles.sidebar, width: isOpenMenu ? "57px" : "250px" }}>
    {children}
  </aside>
);
export const SidebarTop = ({ children, isOpenMenu }) => (
  <div style={{ ...styles.sidebarTop, marginLeft: isOpenMenu ? "" : "1rem", justifySelf: isOpenMenu ? "center" : "" }}>{children}</div>
);
export const SidebarLogo = ({ children, onClick }) => (
  <span style={styles.sidebarLogo} onClick={onClick}>{children}</span>
);
export const LogoName = ({ children, isOpenMenu }) => (
  <p style={{ ...styles.logoName, display: isOpenMenu ? "none" : "" }}>{children}</p>
);
export const SidebarIcon = ({ children }) => <span style={styles.sidebarIcon}>{children}</span>;
export const SidebarName = ({ children, isOpenMenu }) => (
  <span style={{ ...styles.sidebarName, display: isOpenMenu ? "none" : "" }}>{children}</span>
);
export const SubmenuName = ({ children, isOpenMenu }) => (
  <span style={{ ...styles.submenuName, display: isOpenMenu ? "none" : "" }}>{children}</span>
);
export const CollapsedDiv = ({ children, style, onClick, onMouseEnter, onMouseLeave }) => (
  <div onClick={onClick} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    {children}
  </div>
);
export const StyledUl = ({ children }) => <ul style={styles.styledUl}>{children}</ul>;
export const ArrowWrapper = ({ children }) => <span style={styles.arrowWrapper}>{children}</span>;
export const SubMenuMainTitle = ({ children, isMainElementActive, isOpenMenu }) => (
  <span style={{ ...styles.subMenuMainTitle, fontWeight: isMainElementActive ? "500" : "400", display: isOpenMenu ? "none" : "" }}>{children}</span>
);
export const Divider = ({ isOpenMenu }) => (
  <div style={{ ...styles.divider, width: getDividerWidth(isOpenMenu) }} />
);

const menuReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return { ...state, isOpenMenu: !state.isOpenMenu };
    case "TOGGLE_SUBMENU":
      return {
        ...state,
        items: state.items.map((item) =>
          item.name === action.payload ? { ...item, isOpen: !item.isOpen } : item
        ),
      };
    case "UPDATE_ITEMS":
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

const SidebarMenu = ({ handleNavigation, isActive, items, permissions }) => {
  const [state, dispatch] = useReducer(menuReducer, {
    isOpenMenu: false,
    items: items,
  });
  const { isOpenMenu, items: menuItems } = state;
  const checkPermission = usePermissionOnMenu(permissions);

  useEffect(() => {
    dispatch({ type: "UPDATE_ITEMS", payload: items });
  }, [items]);

  const toggleMenu = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };

  const toggleSubmenu = (itemName) => {
    dispatch({ type: "TOGGLE_SUBMENU", payload: itemName });
  };

  const updateList = (item) => {
    toggleSubmenu(item.name);
  };

  return (
    <Wrapper isOpenMenu={isOpenMenu}>
      <Sidebar isOpenMenu={isOpenMenu}>
        <SidebarTop isOpenMenu={isOpenMenu}>
          <SidebarLogo onClick={toggleMenu}>
            {isOpenMenu ? <FaBars data-id="barsIcon" /> : <FaTimes data-id="closeButton" />}
          </SidebarLogo>
          <LogoName isOpenMenu={isOpenMenu}>Cerrar</LogoName>
        </SidebarTop>

        <span style={{ display: "block", marginBottom: "1rem" }}>
          <Divider isOpenMenu={isOpenMenu} />
        </span>

        <StyledUl>
          {menuItems?.map((item) => (
            <li key={item.name}>
              {!item.submenu && (
                <ActiveLink
                  href={item.href || ""}
                  isOpenMenu={isOpenMenu}
                  hasPermission={checkPermission(item.permissions || [])}
                  onClick={handleNavigation}
                  isActive={isActive}
                >
                  <SidebarIcon>{item.icon}</SidebarIcon>
                  <SidebarName isOpenMenu={isOpenMenu}>{item.name}</SidebarName>
                </ActiveLink>
              )}
              {item.submenu && (
                <SubMenu
                  item={item}
                  isOpenMenu={isOpenMenu}
                  updateList={updateList}
                  handleNavigation={handleNavigation}
                  isActive={isActive}
                  permissions={permissions}
                />
              )}
            </li>
          ))}
        </StyledUl>
      </Sidebar>
    </Wrapper>
  );
};

SidebarMenu.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
  isActive: PropTypes.func.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      isOpen: PropTypes.bool,
      href: PropTypes.string,
      permissions: PropTypes.arrayOf(PropTypes.string),
      icon: PropTypes.node,
      submenu: PropTypes.array,
    })
  ).isRequired,
};

const SubMenuButton = ({ active, isOpenMenu }) => {
  if (isOpenMenu) return null;
  return (
    <ArrowWrapper>
      {active ? <FaChevronUp size="14px" /> : <FaChevronDown size="14px" />}
    </ArrowWrapper>
  );
};

SubMenuButton.propTypes = {
  active: PropTypes.bool,
  isOpenMenu: PropTypes.bool,
};

const SubMenu = ({ item, isOpenMenu, updateList, handleNavigation, isActive, permissions }) => {
  const isSubmenuActive = isActive(item.href || "", isOpenMenu);
  const isMainElementActive = isActive(item.href || "");
  const hasPermission = usePermissionOnMenu(permissions);
  const itemIsOpen = item.isOpen;

  const collapsedDivStyle = {
    ...styles.collapsedDiv,
    fontWeight: isSubmenuActive ? "500" : "400",
    justifyContent: isOpenMenu ? "center" : "",
    alignItems: "center",
    padding: isOpenMenu ? "8px" : "0.8rem 1rem",
    backgroundColor: isSubmenuActive ? "#EAE5FF" : "",
  };

  return (
    <span>
      <CollapsedDiv
        onClick={(event) => {
          event.stopPropagation();
          updateList(item);
        }}
        style={collapsedDivStyle}
      >
        <SidebarIcon>{item.icon}</SidebarIcon>
        <SubMenuMainTitle isMainElementActive={isMainElementActive} isOpenMenu={isOpenMenu}>
          {item.name}
        </SubMenuMainTitle>
        <SubMenuButton active={itemIsOpen} isOpenMenu={isOpenMenu} />
      </CollapsedDiv>
      {itemIsOpen &&
        !isOpenMenu &&
        item.submenu?.map((submenu) => (
          <span key={submenu.name}>
            <ActiveLink
              href={submenu.href || ""}
              isOpenMenu={isOpenMenu}
              hasPermission={hasPermission(submenu.permissions || [])}
              isSubmenu={true}
              onClick={handleNavigation}
              isActive={isActive}
            >
              <SubmenuName isOpenMenu={isOpenMenu}>{submenu.name}</SubmenuName>
            </ActiveLink>
          </span>
        ))}
    </span>
  );
};

SubMenu.propTypes = {
  item: PropTypes.object.isRequired,
  isOpenMenu: PropTypes.bool.isRequired,
  updateList: PropTypes.func.isRequired,
  handleNavigation: PropTypes.func.isRequired,
  isActive: PropTypes.func.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SidebarMenu;
