import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";

import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";
import API from "lib/utils";

export const useDeleteProxy = () => {
    const { showNotification } = useNotifications();
    const queryClient = useQueryClient();

    const {
        isLoading,
        isError,
        isSuccess,
        error,
        data,
        mutate: deleteProxy,
    } = useMutation(
        async (id) => {
            const response = await API.instance.delete(`proxies/${id}`, data);
            return response.data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries("proxies"),
        }
    );

    useEffect(() => {
        if (isError) {
            showNotification("An error occured, failed to delete proxy", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    useEffect(() => {
        if (isSuccess) {
            showNotification("Successfully deleted proxy");
        }
    }, [isSuccess, showNotification]);

    return { isLoading, isError, isSuccess, error, data, deleteProxy };
};
