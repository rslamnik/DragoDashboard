import { useEffect } from "react";
import { useQuery } from "react-query";

import API from "lib/utils";
import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";

export const useKeywordCategories = () => {
    const { showNotification } = useNotifications();

    const {
        data,
        isLoading,
        isError,
        isSuccess,
        error
    } = useQuery(
        "keyword_categories",
        async () => {
            const response = await API.instance.get("keywords/categories");
            return response.data;
        }
    );

    useEffect(() => {
        if (isError) {
            showNotification("Failed to retrieve keyword categories", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    return {
        data,
        isLoading,
        isError,
        isSuccess,
        error
    };
};
