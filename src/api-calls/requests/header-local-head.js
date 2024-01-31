import {CallRpcWithPayload} from "../call-rpc-with-payload";

async function processData(data) {
    return parseInt(data)
}

export async function getLocalHead(endpoint, port, token) {
    const path = "/testnet3/latest/height"
    const data = await CallRpcWithPayload(endpoint, port, token, path)
    return await processData(data);
}
