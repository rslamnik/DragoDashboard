import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Notification } from "./Notification";
import { useNotifications } from "./NotificationContext";

export const Notifications = () => {
    const { notifications } = useNotifications();

    return (
        <Container>
            {notifications.map((n, i) => {
                return <Notification message={n.message} variant={n.variant} key={i} />;
            })}
        </Container>
    );
};

const Container = styled.div`
  box-sizing: border-box;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  pointer-events: none;
  position: fixed;
  bottom: 0px;
  left: 0px;
  padding: 8px;
  min-width: 20%;
`;

Notifications.propTypes = {
    items: PropTypes.array,
};
