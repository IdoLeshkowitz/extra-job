interface FetcherParams {
    url: string;
    method?: string;
    body?: Record<string, any>
    json?: boolean
}

export const fetcher = async ({url, method, json, body}: FetcherParams) : Promise<unknown> => {
    const res = await fetch(url, {
        method : method || 'GET',
        body   : body && JSON.stringify(body),
        headers: {
            Accept        : 'application/json',
            'Content-Type': 'application/json'
        }
    })
    if (!res.ok) {
        throw new Error(res.statusText)
    }
    if (!json) {
        return res
    }
    return await res.json()
}