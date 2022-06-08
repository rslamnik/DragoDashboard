import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";

import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";
import API from "lib/utils";

export const useDeleteKeyword = (categoryId) => {
    const { showNotification } = useNotifications();
    const queryClient = useQueryClient();

    const {
        isLoading,
        isError,
        isSuccess,
        error,
        data,
        mutate: deleteKeyword,
    } = useMutation(
        async (id) => {
            const response = await API.instance.delete(`keywords/${id}`, data);
            return response.data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries(["keywords", categoryId]),
        }
    );

    useEffect(() => {
        if (isError) {
            showNotification("An error occured, failed to delete keyword", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    useEffect(() => {
        if (isSuccess) {
            showNotification("Successfully deleted keyword");
        }
    }, [isSuccess, showNotification]);

    return { isLoading, isError, isSuccess, error, data, deleteKeyword };
};
