import React from "react";
import PropTypes from "prop-types";
import { styles, getPointerEvents } from "./SidebarMenu";

function ActiveLink({
  children,
  href,
  isOpenMenu,
  hasPermission,
  isSubmenu = false,
  onClick,
  isActive,
}) {
  const active = isActive(href, isSubmenu);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(href);
  };

  const linkStyle = {
    ...styles.styledLink,
    color: active ? "#5A2DB2" : isSubmenu ? "#000" : "#242433",
    justifyContent: isOpenMenu ? "space-between" : "",
    backgroundColor: active ? "#EAE5FF" : "",
    opacity: hasPermission ? 1 : 0.5,
    marginLeft: isSubmenu ? "2.3rem" : "",
    paddingRight: isSubmenu ? "17px" : "",
    pointerEvents: getPointerEvents(hasPermission),
  };

  const handleMouseEnter = (e) => {
    if (!active) {
      e.currentTarget.style.backgroundColor = styles.styledLinkHover.backgroundColor;
      e.currentTarget.style.fontWeight = styles.styledLinkHover.fontWeight;
      e.currentTarget.style.height = styles.styledLinkHover.height;
    }
  };

  const handleMouseLeave = (e) => {
    if (!active) {
      e.currentTarget.style.backgroundColor = '';
      e.currentTarget.style.fontWeight = '';
      e.currentTarget.style.height = '';
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      style={linkStyle}
      data-id={href + "-link"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}

ActiveLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  isOpenMenu: PropTypes.bool.isRequired,
  hasPermission: PropTypes.bool.isRequired,
  isSubmenu: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.func.isRequired,
};

export default ActiveLink;