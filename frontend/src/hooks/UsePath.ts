import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setCurrentLocation } from "../store/slices/app-slice";

export const UsePath = () => {
    const location = useLocation();

    /* Dispatch */
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCurrentLocation(location.pathname));
    }, [location]);

    return { location };
};
