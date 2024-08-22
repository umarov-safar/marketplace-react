import {AUTH_INFO, MILLISECOND_TO_SECOND} from "../../util/constants";
import {deleteAuthInfo, getAuthInfoFromLocalStorage, updateAuthInfo} from "../../util/helpers";

export class APIClient {

    baseURL = '';

    authURL = 'auth'

    checkRequest = null;

    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    static async returnJSON(response) {

        const json = await response.json();

        if (response.ok || response.status === 500) {
            let errorMessage = 'Request failed';
            let errorCode = '';

            if (json.errors && json.errors.length > 0) {

                json.errors.map(item => {
                    if (item?.message == 'Unauthenticated.') {
                        deleteAuthInfo();
                        // location.href = '/account/login';

                        return;
                    }
                })

                errorMessage = json.errors.map(e => e.message).join(` \n`);
                errorCode = [...new Set(json.errors.map(e => e.code))].join(` & `);

                throw new Error(JSON.stringify({errorMessage, status: response.status, errorCode}));
            }
        }
        return json;
    }


    static async returnBlob(response) {
        return response.blob();
    }

    async unauthorizedClient(
        endpoint,
        {
            data,
            token,
            timeout = 1000000,
            headers: customHeaders = {},
            params,
            ...customConfig
        }
    ) {
        const endpoinWithParams = `${endpoint}${params ? `?${new URLSearchParams(params)}` : ''}`;
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);
        const config = {
            method: data ? 'POST' : 'GET',
            // eslint-disable-next-line no-nested-ternary
            body: data ? (data instanceof FormData ? data : JSON.stringify(data)) : undefined,
            headers: {
                ...(data && !(data instanceof FormData) && {'Content-Type': 'application/json'}),
                ...customHeaders,
                ...(token && {Authorization: `Bearer ${token}`}),
            },
            ...customConfig,
            signal: controller.signal,
        };

        const response = await fetch(`${this.baseURL}${endpoinWithParams}`, config);

        clearTimeout(timer);

        return response;
    }

    async refreshToken(access_token, refresh_token) {
        return this.unauthorizedClient(`${this.authURL}/refresh`, {
            data: {refresh_token},
            token: access_token,
        })
            .then(APIClient.returnJSON)
            .then(updateAuthInfo);
    }

    async checkToken() {
        let token = '';
        try {
            const timeNow = Math.floor(Date.now() / MILLISECOND_TO_SECOND);
            const {expires_at, refresh_token, access_token} = getAuthInfoFromLocalStorage();

            if (expires_at && refresh_token && +expires_at < timeNow) {

                if (!this.checkRequest) {
                    this.checkRequest = this.refreshToken(access_token, refresh_token);
                }

                const result = await this.checkRequest;

                if (result) {
                    updateAuthInfo(result);
                    token = result.data.access_token;
                }

                this.checkRequest = null;
            } else if (access_token) {
                token = access_token;
            }
        } catch (e) {
            console.error(`Unable to check token: ${e}`);
        }

        return token;
    }

    async request(endpoint, config) {
        let token = await this.checkToken();
        return this.unauthorizedClient(endpoint, {...config, token}).then(APIClient.returnJSON);
    }

    async get(endpoint, config) {
        return this.request(endpoint, {...config, method: 'GET'});
    }

    async post(endpoint, config) {
        return this.request(endpoint, {...config, method: 'POST'});
    }

    async patch(endpoint, config) {
        return this.request(endpoint, {...config, method: 'PATCH'});
    }

    async put(endpoint, config) {
        return this.request(endpoint, {...config, method: 'PUT'});
    }

    async delete(endpoint, config) {
        return this.request(endpoint, {...config, method: 'DELETE'});
    }


}

export const apiClient = new APIClient('/api/v1/');