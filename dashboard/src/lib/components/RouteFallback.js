import React from "react";
import styled from "styled-components";

import { AppLayout } from "./AppLayout";
import { Spinner } from "./Spinner";

const LoadingWrapper = styled.div`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--secondary);
  animation: fadein 2s;
`;

export const RouteFallback = () => {
    return (
        <AppLayout>
            <LoadingWrapper>
                <Spinner />
                <span>Loading...</span>
            </LoadingWrapper>
        </AppLayout>
    );
};
