import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";

import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";
import API from "lib/utils";

export const useDeleteKeywordCategory = () => {
    const { showNotification } = useNotifications();
    const queryClient = useQueryClient();

    const {
        isLoading,
        isError,
        isSuccess,
        error,
        data,
        mutate: deleteKeywordCategory,
    } = useMutation(
        async (id) => {
            const response = await API.instance.delete(`keywords/categories/${id}`, data);
            return response.data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries("keyword_categories"),
        }
    );

    useEffect(() => {
        if (isError) {
            showNotification("An error occured, failed to delete category", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    useEffect(() => {
        if (isSuccess) {
            showNotification("Successfully deleted category");
        }
    }, [isSuccess, showNotification]);

    return { isLoading, isError, isSuccess, error, data, deleteKeywordCategory };
};
