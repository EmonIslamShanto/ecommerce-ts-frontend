import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MesssageResponse } from "../types/api-types";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

type ResType =
    | {
        data: MesssageResponse;
    }
    | {
        error: FetchBaseQueryError | SerializedError;
    }

export const responseToast = (res: ResType, navigate: NavigateFunction | null, url: string) => {
    if ("data" in res) {
        toast.success(res.data.message);
        if (navigate) {
            navigate(url);
        }
    } else {
        const error = res.error as FetchBaseQueryError;
        const MesssageResponse = error.data as MesssageResponse;
        toast.error(MesssageResponse.message);
    }
};


export const lastMonths = () => {
    const currentDate = moment();

    currentDate.date(1);

    const last6Months: string[] = [];
    const last12Months: string[] = [];

    for (let i = 0; i < 6; i++) {
        const monthDate = currentDate.clone().subtract(i, "months");
        last6Months.unshift(monthDate.format("MMMM"));
    }

    for (let i = 0; i < 12; i++) {
        const monthDate = currentDate.clone().subtract(i, "months");
        last12Months.unshift(monthDate.format("MMMM"));
    }

    return { last6Months, last12Months };
};