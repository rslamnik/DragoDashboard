import { useEffect } from "react";
import { useQuery } from "react-query";

import API from "lib/utils";
import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";

export const useKeywordCategory = (id) => {
    const { showNotification } = useNotifications();

    const { data, isLoading, isError, isSuccess } = useQuery(
        ["keyword_category", id],
        async () => {
            const response = await API.instance.get(`keywords/categories/${id}`);
            return response.data;
        },
        {
            enabled: !!id, // query won't execute until id exists
        }
    );

    useEffect(() => {
        if (isError) {
            showNotification("Failed to retrieve keyword category", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    return { data, isLoading, isError, isSuccess };
};
