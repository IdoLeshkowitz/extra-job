interface FetcherParams {
    url: string;
    method?: string;
    body?: Record<string, any>
    json?: boolean
    revalidate?: number | false
}

export const fetcher = async ({url, method, json, body, revalidate}: FetcherParams) => {
    const res = await fetch(url, {
        method : method || 'GET',
        body   : body && JSON.stringify(body),
        headers: {
            Accept        : 'application/json',
            'Content-Type': 'application/json'
        },
        next   : {
            revalidate
        }
    },)
    if (!res.ok) {
        return Promise.reject(await res.json())
    }
    if (!json) {
        return res
    }
    return await res.json()
}