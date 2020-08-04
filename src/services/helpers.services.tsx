export async function postToServer(path, body = {}) {
    let responseData = null
    try {
        const response = await fetch(// process.env.REACT_APP_URL_BASE + 
            path,
            {
                method: 'POST',
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        if (!response.ok)
            return Promise.reject(response);
        else {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }
        }
    } catch (error) {
        return Promise.reject(error);
    }
    return responseData
}

export async function getFromServer(path) {
    let responseData = null
    try {
        const response = await fetch(// process.env.REACT_APP_URL_BASE  +
            path);
        if (!response.ok)
            return Promise.reject(response);
        else {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }
        }
    } catch (error) {
        return Promise.reject(error);
    }
    return responseData
}