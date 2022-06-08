import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";
import styled, { css } from "styled-components";

import { Skeleton } from "./Skeleton";

const HeadFoot = css`
  background-color: var(--white);
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const CardHeader = styled(BootstrapCard.Header)`
  ${HeadFoot}
  height: 100px;
`;

export const CardFooter = styled(BootstrapCard.Footer)`
  ${HeadFoot}
  height: 80px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Card = ({ loading = false, rows = 6, children, ...rest }) => {
    return (
        <BootstrapCard {...rest}>
            <Skeleton
                type="text"
                ready={!loading}
                rows={rows}
                firstLaunchOnly={true}
                style={{ padding: "20px" }}
            >
                {children}
            </Skeleton>
        </BootstrapCard>
    );
};
