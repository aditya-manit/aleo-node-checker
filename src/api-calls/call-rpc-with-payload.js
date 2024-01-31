export async function CallRpcWithPayload(endpoint, port, token, path) {
    if (!endpoint.startsWith("http")) {
        endpoint = "http://" + endpoint;
    }

    const url = `https://cors-proxy.kingsuper.services/?targetApi=${encodeURIComponent(`${endpoint}:${port}${path}`)}`;


    const options = {
        method: "GET", headers: {
            "Content-Type": "application/json",
        }
    };


    const response = await fetch(url, options);
    const data = await response.json();
    console.log("data", data);
    return data;
}
