import { useEffect } from "react";
import { useQuery } from "react-query";

import API from "lib/utils";
import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";

export const useKeywords = (id) => {
    const { showNotification } = useNotifications();

    const {
        data,
        isLoading,
        isError,
        isSuccess,
        error,
        isFetching
    } = useQuery(
        ["keywords", id],
        async () => {
            const response = await API.instance.get(`keywords/category/${id}`);
            return response.data;
        }
    );

    useEffect(() => {
        if (isError) {
            showNotification("Failed to retrieve keywords", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    return {
        data,
        isLoading,
        isError,
        isSuccess,
        error,
        isFetching
    };
};
