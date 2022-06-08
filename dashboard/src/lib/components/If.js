import PropTypes from "prop-types";

export const If = ({ predicate = false, children }) =>
    predicate ? children : null;

If.propTypes = {
    predicate: PropTypes.bool,
    children: PropTypes.node,
};
