import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";

import API from "lib/utils";
import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";

export const useUpdateKeyword = (id) => {
    const { showNotification } = useNotifications();
    const queryClient = useQueryClient();

    const {
        isLoading,
        isError,
        isSuccess,
        data,
        mutate: updateKeyword,
    } = useMutation(
        async (data) => {
            const response = await API.instance.put(`keywords/${id}`, data);
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["keywords", id]);
            },
        }
    );

    useEffect(() => {
        if (isError) {
            showNotification("An error occured, failed to update keyword", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    useEffect(() => {
        if (isSuccess) {
            showNotification("Successfully updated keyword");
        }
    }, [isSuccess, showNotification]);

    return { data, isLoading, updateKeyword };
};
