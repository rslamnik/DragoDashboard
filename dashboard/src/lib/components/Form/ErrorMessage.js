import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Error = styled.p`
  margin-top: 5px;
  color: red;
  font-size: 12px;
`;

export const ErrorMessage = ({ message, ...rest }) => {
    if (!message) {
        return null;
    }

    return (
        <Error {...rest} className="my-2">
            {message}
        </Error>
    );
};

ErrorMessage.propTypes = {
    message: PropTypes.string,
};
