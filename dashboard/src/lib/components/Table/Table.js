import React from "react";
import { Table as BootstrapTable } from "react-bootstrap";
import styled from "styled-components";

import { HeadCell } from "./HeadCell";
import { Skeleton } from "../Skeleton";
import { Spinner } from "../Spinner";
import { If } from "../If";
import { useFirstLoad } from "lib/hooks";

export const DEFAULT_PAGE_SIZE = 10;

export const SORT_ORDER = { ASC: 0, DESC: 1 };

const Container = styled((
    { loading, ...props } // filter all non-standard props
) => <BootstrapTable {...props} />)`
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.04);
  border: solid 1px #eaedf3;
  background-color: #ffffff;
  border-radius: 4px;
  border-collapse: separate;
  border-spacing: 0;
  opacity: ${(props) => (props.loading ? 0.5 : 1)};

  && th,
  td,
  thead th div {
    font-size: 14px;
    vertical-align: middle;
  }

  && th {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.57;
  }

  & td:first-child,
  th:first-child {
    padding-left: 3.5rem;
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

export const Table = ({ columns, onSort, loading = false, children }) => {
    const firstLoad = useFirstLoad(loading);
    const load = loading && !firstLoad;

    return (
        <Skeleton type="text" ready={!firstLoad} rows={6} firstLaunchOnly={true}>
            <If predicate={load}>
                <SpinnerWrapper>
                    <Spinner />
                </SpinnerWrapper>
            </If>
            <Container loading={load}>
                <thead>
                    <tr>
                        {columns.map((c, i) => {
                            return <HeadCell column={c} onSort={onSort} key={i} />;
                        })}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </Container>
        </Skeleton>
    );
};
