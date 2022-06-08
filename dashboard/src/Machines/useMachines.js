import { useEffect } from "react";
import { useQuery } from "react-query";

import API from "lib/utils";
import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";

export const useMachines = () => {
    const { showNotification } = useNotifications();

    const {
        data,
        isLoading,
        isError,
        isSuccess,
        error
    } = useQuery(
        "machines",
        async () => {
            const response = await API.instance.get("machines");
            return response.data;
        }
    );

    useEffect(() => {
        if (isError) {
            showNotification("Failed to retrieve machines", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    return [
        data,
        isLoading,
        isError,
        isSuccess,
        error
    ];
};
