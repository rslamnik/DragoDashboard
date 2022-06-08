import { useEffect, useState } from "react";

export const useFirstLoad = (loading) => {
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (!loading) {
            setFirstLoad(false);
        }
    }, [loading]);

    return firstLoad;
};
