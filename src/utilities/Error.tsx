import React from 'react'
import { optionSnackbarError } from "./Option";

 class Error {
    static error422(e: any, enqueueSnackbar :any)
    {
        const fieldErrors = e.response.request.response.fieldErrors;
            let err: React.ReactNode;
            err = fieldErrors.map((error: any) => {
                if (error.message !== null && error.field !== null) {
                    return <div key={error.message}>{error.field} : {error.message}</div>
                }
            })
            return  enqueueSnackbar(err, optionSnackbarError);
    }
}
export default Error;