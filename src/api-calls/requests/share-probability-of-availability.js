import {CallRpcWithPayload} from "../call-rpc-with-payload";

async function processData(data) {
    return data
}

export async function getProbabilityOfAvailability(endpoint, port, token) {
    const path = "/testnet3/peers/all/metrics"
    const data = await CallRpcWithPayload(endpoint, port, token, path)
    return await processData(data);
}
