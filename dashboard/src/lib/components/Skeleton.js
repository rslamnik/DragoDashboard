import React from "react";
import ReactPlaceholder from "react-placeholder";

export const Skeleton = ({
    ready = false,
    rows = 6,
    type = "text",
    firstLaunchOnly = false,
    children,
    ...rest
}) => {
    return (
        <ReactPlaceholder
            type={type}
            ready={ready}
            rows={rows}
            firstLaunchOnly={firstLaunchOnly}
            showLoadingAnimation={true}
            {...rest}
        >
            {children}
        </ReactPlaceholder>
    );
};
