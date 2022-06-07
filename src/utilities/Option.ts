import { OptionsObject } from "notistack";

export const optionSnackbarSuccess : OptionsObject = {
    variant: 'success',
    anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
    },
    autoHideDuration: 3000,
}
export const optionSnackbarError: OptionsObject = {
    variant: 'error',
    anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
    },
     autoHideDuration: 5000,
}