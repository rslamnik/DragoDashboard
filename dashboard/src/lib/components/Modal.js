import React from "react";
import { Modal as BootstrapModal } from "react-bootstrap";

import { Button } from "lib/components";

export const Modal = ({
    show,
    title,
    text,
    confirmText,
    onConfirm,
    declineText,
    onDecline,
}) => {
    return (
        <BootstrapModal show={show} onHide={onDecline}>
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>{title}</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>{text}</BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button variant="secondary" onClick={onDecline}>
                    {declineText}
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    {confirmText}
                </Button>
            </BootstrapModal.Footer>
        </BootstrapModal>
    );
};
