export const SecurityUtil = {
    parseJwt(token: string) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    },
    getAuthorities() {
        let token = localStorage.getItem('spmToken');
        if (token === null) return [];
        let jsonPayload = SecurityUtil.parseJwt(token);
        if (jsonPayload && jsonPayload === '') {
            return [];
        }
        let auth = jsonPayload["auth"];
        return auth.split(",");
    }
}