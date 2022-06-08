import { useEffect } from "react";
import { useMutation } from "react-query";

import API from "lib/utils";
import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";

export const useCreateKeywordCategory = () => {
    const { showNotification } = useNotifications();

    const {
        isLoading,
        isError,
        isSuccess,
        error,
        data,
        mutate: createKeywordCategory,
    } = useMutation(async (data) => {
        const response = await API.instance.post("keywords/categories", data);
        return response.data;
    });

    useEffect(() => {
        if (isError) {
            showNotification("Failed to save keyword category", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    useEffect(() => {
        if (isSuccess) {
            showNotification("Successfully created keyword category");
        }
    }, [isSuccess, showNotification]);

    return { isLoading, isError, isSuccess, error, data, createKeywordCategory };
};
