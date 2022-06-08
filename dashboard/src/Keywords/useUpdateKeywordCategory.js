import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";

import API from "lib/utils";
import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";

export const useUpdateKeywordCategory = (id) => {
    const { showNotification } = useNotifications();
    const queryClient = useQueryClient();

    const {
        isLoading,
        isError,
        isSuccess,
        data,
        mutate: updateKeywordCategory,
    } = useMutation(
        async (data) => {
            const response = await API.instance.put(`keywords/categories/${id}`, data);
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("keyword_categories");
            },
        }
    );

    useEffect(() => {
        if (isError) {
            showNotification("An error occured, failed to update keyword category", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    useEffect(() => {
        if (isSuccess) {
            showNotification("Successfully updated keyword category");
        }
    }, [isSuccess, showNotification]);

    return { data, isLoading, updateKeywordCategory };
};
