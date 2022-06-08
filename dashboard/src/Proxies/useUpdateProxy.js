import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";

import API from "lib/utils";
import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";

export const useUpdateProxy = (id) => {
    const { showNotification } = useNotifications();
    const queryClient = useQueryClient();

    const {
        isLoading,
        isError,
        isSuccess,
        data,
        mutate: updateProxy,
    } = useMutation(
        async (data) => {
            const response = await API.instance.put(`proxies/${id}`, data);
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("proxies");
            },
        }
    );

    useEffect(() => {
        if (isError) {
            showNotification("An error occured, failed to update proxy", ALERT_VARIANTS.DANGER);
        }
    }, [isError, showNotification]);

    useEffect(() => {
        if (isSuccess) {
            showNotification("Successfully updated proxy");
        }
    }, [isSuccess, showNotification]);

    return { data, isLoading, updateProxy };
};
