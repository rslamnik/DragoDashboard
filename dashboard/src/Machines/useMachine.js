import { useEffect } from "react";
import { useQuery } from "react-query";

import API from "lib/utils";
import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";

export const useMachine = (id) => {
    const { showNotification } = useNotifications();

    const { data: machine, isLoading, isError, isSuccess } = useQuery(
        ["machines", id],
        async () => {
            const response = await API.instance.get(`machines/${id}`);
            return response.data;
        },
        {
            enabled: !!id, // query won't execute until id exists
        }
    );

    useEffect(() => {
        if (isError) {
            showNotification("Failed to retrieve machine", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    return [machine, isLoading, isError, isSuccess];
};
