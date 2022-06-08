import React from "react";
import { Form } from "react-bootstrap";

export const Checkbox = ({ value, ...rest }) => {
    return <Form.Check type="checkbox" {...rest} checked={value} />;
};
