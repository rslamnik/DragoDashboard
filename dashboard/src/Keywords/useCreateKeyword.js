import { useEffect } from "react";
import { useMutation } from "react-query";

import API from "lib/utils";
import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";

export const useCreateKeyword = () => {
    const { showNotification } = useNotifications();

    const {
        isLoading,
        isError,
        isSuccess,
        error,
        data,
        mutate: createKeyword,
    } = useMutation(async (data) => {
        const response = await API.instance.post("keywords", data);
        return response.data;
    });

    useEffect(() => {
        if (isError) {
            showNotification("Failed to save keyword", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    useEffect(() => {
        if (isSuccess) {
            showNotification("Successfully created keyword");
        }
    }, [isSuccess, showNotification]);

    return { isLoading, isError, isSuccess, error, data, createKeyword };
};
