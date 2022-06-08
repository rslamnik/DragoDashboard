import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";

import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";
import API from "lib/utils";

export const useDeleteChannel = () => {
    const { showNotification } = useNotifications();
    const queryClient = useQueryClient();

    const {
        isLoading,
        isError,
        isSuccess,
        error,
        data,
        mutate: deleteChannel,
    } = useMutation(
        async (id) => {
            const response = await API.instance.delete(`channels/${id}`, data);
            return response.data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries("channels"),
        }
    );

    useEffect(() => {
        if (isError) {
            showNotification("An error occured, failed to delete channel", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    useEffect(() => {
        if (isSuccess) {
            showNotification("Successfully deleted channel");
        }
    }, [isSuccess, showNotification]);

    return { isLoading, isError, isSuccess, error, data, deleteChannel };
};
