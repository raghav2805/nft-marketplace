const endpoint = 'https://eth-mainnet.alchemyapi.io/v2/A4vYJ4kQDOYiXtb3FvhjlLmWMXf1wx_h'

const fetchNFTs = async (owner, contractAddress, setNFTs, retryAttempt) => {
    if (retryAttempt === 5) {
        return;
    }

    let data;

    if (owner) {
        try {
            if (contractAddress) {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddress=${contractAddress}`).then(data => data.json);
            }
            else {
                await fetch(`${endpoint}/getNFTs?owner=${owner}`).then(response => response.json())
                    .then(result => { data = result }).catch(error => console.log('error', error));
            }
        } catch (err) {
            fetchNFTs(endpoint, owner, contractAddress, setNFTs, retryAttempt + 1)
        }

        console.log(data.ownedNfts);
        setNFTs(data.ownedNfts);
    }

}

export default fetchNFTs;