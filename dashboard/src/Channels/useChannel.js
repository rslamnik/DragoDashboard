import { useEffect } from "react";
import { useQuery } from "react-query";

import API from "lib/utils";
import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";

export const useChannel = (id) => {
    const { showNotification } = useNotifications();

    const { data, isLoading, isError, isSuccess } = useQuery(
        ["channels", id],
        async () => {
            const response = await API.instance.get(`channels/${id}`);
            return response.data;
        },
        {
            enabled: !!id, // query won't execute until id exists
        }
    );

    useEffect(() => {
        if (isError) {
            showNotification("Failed to retrieve channel", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    return [data, isLoading, isError, isSuccess];
};
