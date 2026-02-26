const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_SECRET = import.meta.env.VITE_PINATA_SECRET;

export const uploadToIPFS = async (key, value) => {
  const data = {
    version: "1.0",
    timestamp: new Date().toISOString(),
    key: key,
    value: value,
  };

  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET,
      },
      body: JSON.stringify({
        pinataContent: data,
        pinataMetadata: { name: `prefledger-${key}-${Date.now()}` },
      }),
    }
  );

  const result = await response.json();
  return result.IpfsHash;
};

export const fetchFromIPFS = async (cid) => {
  const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
  return await response.json();
};