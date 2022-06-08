import React, { Suspense } from "react";
import styled from "styled-components";
import { Navbar } from "react-bootstrap";

import { Sidebar } from "./Sidebar";

const HEADER_HEIGHT = 4; // rem

const Header = styled.div`
  height: ${HEADER_HEIGHT}rem;
  box-shadow: 0px 1px 0 0 #eaedf3;
`;

const Content = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT}rem);
  width: 100%;
  overflow-y: auto;
  will-change: transform;
  padding-top: 1rem;
`;

const Main = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: stretch;
`;

export const AppLayout = ({ children, title }) => {
    return (
        // TODO: implement proper loader
        <Suspense fallback={<div>Loading...</div>}>
            <Wrapper>
                <Sidebar />
                <Main>
                    <Header>
                        <Navbar>
                            <Navbar.Brand>{title}</Navbar.Brand>
                            <Navbar.Toggle />
                            {/* <Navbar.Collapse className="justify-content-end">
                                <LanguageSelect />
                                <HeaderMenu />
                            </Navbar.Collapse> */}
                        </Navbar>
                    </Header>
                    <Content className="content-wrapper">{children}</Content>
                </Main>
            </Wrapper>
        </Suspense>
    );
};
