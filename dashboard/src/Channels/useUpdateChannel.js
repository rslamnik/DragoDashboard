import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";

import API from "lib/utils";
import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";

export const useUpdateChannel = (id) => {
    const { showNotification } = useNotifications();
    const queryClient = useQueryClient();

    const {
        isLoading,
        isError,
        isSuccess,
        data,
        mutate: updateChannel,
    } = useMutation(
        async (data) => {
            const response = await API.instance.put(`channels/${id}`, data);
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("channels");
            },
        }
    );

    useEffect(() => {
        if (isError) {
            showNotification("An error occured, failed to update channel", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    useEffect(() => {
        if (isSuccess) {
            showNotification("Successfully updated channel");
        }
    }, [isSuccess, showNotification]);

    return { data, isLoading, updateChannel };
};
