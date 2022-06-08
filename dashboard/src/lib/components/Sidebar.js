import React from "react";
import styled from "styled-components";

import { Navigation } from "./Navigation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  height: 100vh;
  flex: 0 0 15rem; // this means that width is fixed to 15rem
  background-color: #f0eeeb;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  padding: 0.5rem;
  overflow-y: auto;
`;

const Footer = styled.div`
  padding: 1rem;
  color: #f0f0f0;
  font-size: 0.8rem;
  p {
    color: #6b6c6f;
  }
`;

export const Sidebar = () => {
    return (
        <Wrapper>
            <Content>
                <Navigation />
            </Content>

            <Footer>
                © Reuf & Partners
            </Footer>
        </Wrapper>
    );
};
