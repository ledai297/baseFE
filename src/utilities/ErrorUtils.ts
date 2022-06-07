const ErrorUtils = {
    getErrorMessage: (error: any) => {
        return error && error.messages && error.messages.length > 0
            ? error.messages[0]
            : 'Có lỗi xảy ra';
    }
}

export default ErrorUtils;
