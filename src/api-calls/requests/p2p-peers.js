import {CallRpcWithPayload} from "../call-rpc-with-payload";

async function processData(data) {
    return parseInt(data)
}

export async function getPeers(endpoint, port, token) {
    const path = "/testnet3/peers/count"
    const data = await CallRpcWithPayload(endpoint, port, token, path)
    return await processData(data);
}
