import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Button } from "./Button";

export const LinkButton = ({ to, children, ...rest }) => {
    return (
        <Link to={to}>
            <Button color="primary" {...rest}>
                {children}
            </Button>
        </Link>
    );
};

LinkButton.propTypes = {
    to: PropTypes.string.isRequired,
};
