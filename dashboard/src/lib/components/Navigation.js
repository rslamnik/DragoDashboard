import React from "react";
import styled from "styled-components";
import { Nav } from "react-bootstrap";

import { useAppRoutes } from "AppRoutes";
import { LinkContainer } from "react-router-bootstrap";

const NavLink = styled(Nav.Link)`
  color: var(--light);
  margin-bottom: 5px;
  background-color: transparent !important;

  &.nav-link.active {
    color: var(--light);
  }

  &:hover {
    background-color: #d9d6d2 !important;
    opacity: 0.8;
  }
`;

export const Navigation = () => {
  const { routes } = useAppRoutes();

  const links = [
    { name: "Machines", link: routes.MACHINES.path },
    { name: "Proxies", link: routes.PROXIES.path },
    { name: "Channels", link: routes.CHANNELS.path },    
    { name: "Keyword Categories", link: routes.KEYWORD_CATEGORIES.path },
  ];

  return (
    <Nav variant="pills" className="flex-column">
      {links.map((l, i) => (
        <LinkContainer to={l.link} key={i}>
          <NavLink>{l.name}</NavLink>
        </LinkContainer>
      ))}
    </Nav>
  );
};
