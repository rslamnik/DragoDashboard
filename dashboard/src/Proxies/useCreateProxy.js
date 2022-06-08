import { useEffect } from "react";
import { useMutation } from "react-query";

import API from "lib/utils";
import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";

export const useCreateProxy = () => {
    const { showNotification } = useNotifications();

    const {
        isLoading,
        isError,
        isSuccess,
        error,
        data,
        mutate: createProxy,
    } = useMutation(async (data) => {
        const response = await API.instance.post("proxies", data);
        return response.data;
    });

    useEffect(() => {
        if (isError) {
            showNotification("Failed to save proxy", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    useEffect(() => {
        if (isSuccess) {
            showNotification("Successfully created proxy");
        }
    }, [isSuccess, showNotification]);

    return {isLoading, isError, isSuccess, error, data, createProxy};
};
