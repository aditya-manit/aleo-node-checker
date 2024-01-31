import './App.css';
import './components/css/Button.css';
import React, {useState} from 'react';
import {getPeers} from './api-calls/requests/p2p-peers';
import {ReturnApp} from "./components/AppUI";
import config from './config';
import {getP2pInfo} from "./api-calls/requests/p2p-info";
import {getLocalHead} from "./api-calls/requests/header-local-head";
import {getSamplingStats} from "./api-calls/requests/daser-sampling-stats";
import {getAccountAddress} from "./api-calls/requests/state-account-address";
import {getProbabilityOfAvailability} from "./api-calls/requests/share-probability-of-availability";
import {getNodeInfo} from "./api-calls/requests/node-info";
import {jsonToHtml} from "./helper/pretty-print-json";

function App() {
    const [loadOnClick, setLoadOnClick] = useState(false);
    const load = async () => {
        console.log('Calculating...');
        addLoadingClass();
        try {
            await new Promise(resolve => {
                setTimeout(computeResults, 2000); // Add a delay of 2 seconds
            });
        } catch (error) {
            console.error(error);
            handleError(config.backend.apiFailureMessage)
        } finally {
            removeLoadingClass();
        }
    };

    const addLoadingClass = () => {
        const button = document.getElementById('button');
        if (button) {
            button.classList.add('loading');
            const progress = document.createElement('div');
            progress.className = 'progress';
            button.appendChild(progress);
        }
    };

    const removeLoadingClass = () => {
        const button = document.getElementById('button');
        if (button) {
            button.classList.remove('loading');
            const progress = button.lastChild;
            if (progress instanceof Node) {
                button.removeChild(progress);
            }
        }
    };

    const computeResults = async () => {
        console.log('loading');
        let {ipAddress, port} = readInput();

        // todo: remove this: testing purpose
        // ipAddress = "165.232.182.75"
        // port = "26658"
        // authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJwdWJsaWMiLCJyZWFkIiwid3JpdGUiLCJhZG1pbiJdfQ.6Vt55wvPNw1uk5z0NB4ufPj-IOnR77pG7i0LjwtRkOU"


        console.log(ipAddress, port)

        if (!ipAddress || !port) {
            handleError(config.missingValuesMessage);
            return;
        }

        try {
            const [
                peerCount,
                // info,
                localHead,
                // samplingStats,
                accountAddress,
                probabilityOfAvailability,
                apiVersion
            ] = await Promise.all([
                getPeers(ipAddress, port, "authToken"),
                // getP2pInfo(ipAddress, port, "authToken"),
                getLocalHead(ipAddress, port, "authToken"),
                // getSamplingStats(ipAddress, port, "authToken"),
                getAccountAddress(ipAddress, port, "authToken"),
                getProbabilityOfAvailability(ipAddress, port, "authToken"),
                getNodeInfo(ipAddress, port, "authToken")
            ]);

            console.log(`peerCount: ${peerCount}`);
            console.log(`localHead: ${localHead}`);
            console.log(`accountAddress: ${accountAddress}`);
            console.log(`probabilityOfAvailability: ${probabilityOfAvailability}`);
            console.log(`apiVersion: ${apiVersion}`);

            if ([peerCount, localHead, accountAddress, probabilityOfAvailability, apiVersion].some((value) => value === null || value === undefined || Number.isNaN(value))) {
                handleError(config.backend.apiFailureMessage);
                return;
            }

            const uiResponsePrettyJson = await jsonToHtml(probabilityOfAvailability);

            updateUI(peerCount, localHead, accountAddress, apiVersion, uiResponsePrettyJson)
            removeLoadingClass();
            setLoadOnClick(true);
        } catch (e) {
            console.error('Error:', e);
            console.log(config.backend.apiFailureMessage)
            handleError(config.backend.apiFailureMessage);
        }

    };

    const readInput = () => {
        const ipAddress = document.getElementById('field-0').value;
        const port = document.getElementById('field-1').value;

        return {ipAddress, port};
    };

    const handleError = (message) => {
        alert(message);
        removeLoadingClass();
    };

    const updateUI = (peerCount, blockHeight, blockHash, stateRootHash, allPeers) => {
        document.getElementById('resultBox-0').innerHTML = blockHeight
        document.getElementById('resultBox-1').innerHTML = peerCount
        document.getElementById('resultBox-2').innerHTML = blockHash
        document.getElementById('resultBox-3').innerHTML = stateRootHash
        document.getElementById('resultBox-4').innerHTML = allPeers

    };

    return (<ReturnApp load={load} config={config}/>);
}

export default App;
