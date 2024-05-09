import { useMemo } from "react";
import { useLocation } from "react-router";

export const API_URL="http://127.0.0.1:8000";


export const useQuery=()=>{
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}