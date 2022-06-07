import {authenticationService} from "../services/authentication/authenticationService";
import {SecurityUtil} from "./SecurityUtil";

export const tokenStorage = {
    saveToken(token: any) {
        localStorage.setItem('spmToken', token.idToken);
        let jsonPayload = SecurityUtil.parseJwt(token.idToken);
        if (jsonPayload !== undefined && jsonPayload !== null && jsonPayload !== '') {
            let exp = jsonPayload["exp"];
            localStorage.setItem("spmTokenExpireTime", exp);
        }
        localStorage.setItem('spmRefreshToken', token.refreshToken);
        let refreshTokenJsonPayload = SecurityUtil.parseJwt(token.refreshToken);
        if (refreshTokenJsonPayload !== undefined && refreshTokenJsonPayload !== null && refreshTokenJsonPayload !== '') {
            let exp = refreshTokenJsonPayload["exp"];
            localStorage.setItem("spmRefreshTokenExpireTime", exp);
        }
    },
    getToken(): string {
        let token = localStorage.getItem('spmToken');
        try {
            let expireTime = localStorage.getItem("spmTokenExpireTime");
            if (expireTime !== null && expireTime !== undefined) {
                let currentTime = new Date().getTime() / 1000;
                if (parseInt(expireTime) < currentTime) {
                    return '';
                }
                return token && parseInt(expireTime) > currentTime ? token : '';
            }
        } catch (e) {
        }
        return token ? token : '';
    },
    clearToken(): void {
        localStorage.removeItem('spmToken');
        localStorage.removeItem('spmTokenExpireTime');
        localStorage.removeItem('spmRefreshToken');
        localStorage.removeItem('spmRefreshTokenExpireTime');
    },
    canRefreshToken(): boolean {
        let currentTime = new Date().getTime() / 1000;
        let refreshToken = localStorage.getItem('spmRefreshToken');
        let isAvailableRefreshToken = refreshToken !== null && refreshToken !== '' && refreshToken !== undefined;
        let refreshTokenExpireTime = localStorage.getItem('spmRefreshTokenExpireTime');
        let isTokenValid = refreshTokenExpireTime !== null && refreshTokenExpireTime !== undefined && parseInt(refreshTokenExpireTime) > currentTime;
        if (isAvailableRefreshToken && isTokenValid) {
            return true;
        }
        return false;
    },
    refreshToken(): void {
        if (this.getToken() === '' && this.canRefreshToken()) {
            let refreshToken = localStorage.getItem('spmRefreshToken');
            if (refreshToken !== null && refreshToken !== undefined) {
                authenticationService.refreshToken(refreshToken);
            }
        } else {
            this.clearToken();
            window.location.reload();
        }
    }
}