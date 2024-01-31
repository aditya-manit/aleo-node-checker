import {CallRpcWithPayload} from "../call-rpc-with-payload";

async function processData(data) {
    return data
}

export async function getNodeInfo(endpoint, port, token) {
    const path = "/testnet3/latest/stateRoot"
    const data = await CallRpcWithPayload(endpoint, port, token, path)
    return await processData(data);
}
