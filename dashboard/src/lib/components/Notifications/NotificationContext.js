import React, { useMemo, useContext, useCallback } from "react";
import { useImmer } from "use-immer";

export const ALERT_VARIANTS = {
    SUCCESS: "success",
    WARNING: "warning",
    DANGER: "danger",
    INFO: "info",
};

export const NOTIFICATION_DISMISS_TIMEOUT = 5000;

const NotificationContext = React.createContext();

// Math.random should be unique because of its seeding algorithm.
// Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
const generateID = () => {
    return `id_${new Date().getTime()}`;
};

export const NotificationProvider = (props) => {
    const [notifications, setNotifications] = useImmer([]);

    const clearNotification = useCallback(
        (notificationId) => {
            setNotifications((draft) => {
                const index = draft.findIndex((n) => n.id === notificationId);
                const notification = draft[index];
                clearInterval(notification.timeout);
                draft.splice(index, 1);
            });
        },
        [setNotifications]
    );

    const showNotification = useCallback(
        (
            message,
            variant = ALERT_VARIANTS.SUCCESS,
            duration = NOTIFICATION_DISMISS_TIMEOUT
        ) => {
            const id = generateID();

            // create timeout object for deleting notification when expires
            const timeout = setTimeout(() => {
                clearNotification(id);
            }, duration);

            setNotifications((draft) => {
                draft.push({
                    message,
                    variant,
                    id,
                    timeout,
                });
            });
        },
        [setNotifications, clearNotification]
    );

    const context = useMemo(
        () => ({
            notifications,
            showNotification,
            clearNotification,
        }),
        [notifications, showNotification, clearNotification]
    );

    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            `useNotifications must be used within a NotificationsProvider`
        );
    }
    return context;
}

export const Consumer = NotificationContext.Consumer;
