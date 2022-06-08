import React from "react";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

export const Notification = ({ message, variant, className }) => {
    return <Alert variant={variant} className={className}>{message}</Alert>;
};

Notification.propTypes = {
    message: PropTypes.string,
    variant: PropTypes.string,
    duration: PropTypes.number,
};
