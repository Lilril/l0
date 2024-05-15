const axios = require('axios');

const addresses = [
    /*sybils*/ 
];

async function getTransactions(address) {
    try {
        const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=${API_KEY}`);
        return response.data.result || [];
    } catch (error) {
        console.error(`Failed to fetch transactions for address ${address}`);
        return [];
    }
}

async function findSimilarAddresses(addresses) {
    const similarAddresses = new Set();
    for (const address of addresses) {
        const transactions = await getTransactions(address);
        if (Array.isArray(transactions)) {
            transactions.forEach(tx => {
                similarAddresses.add(tx.to);
                similarAddresses.add(tx.from);
            });
        }
    }
    return Array.from(similarAddresses);
}

findSimilarAddresses(addresses)
    .then(similarAddresses => {
        console.log('Similar Addresses:', similarAddresses);
    })
    .catch(error => {
        console.error('Error:', error);
    });
