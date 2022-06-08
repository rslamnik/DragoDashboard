import { useEffect } from "react";
import { useMutation } from "react-query";

import API from "lib/utils";
import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";

export const useCreateChannel = () => {
    const { showNotification } = useNotifications();

    const {
        isLoading,
        isError,
        isSuccess,
        error,
        data,
        mutate: createChannel,
    } = useMutation(async (data) => {
        const response = await API.instance.post("channels", data);
        return response.data;
    });

    useEffect(() => {
        if (isError) {
            showNotification("Failed to save channel", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    useEffect(() => {
        if (isSuccess) {
            showNotification("Successfully created channel");
        }
    }, [isSuccess, showNotification]);

    return { isLoading, isError, isSuccess, error, data, createChannel };
};
