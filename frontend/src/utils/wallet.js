import { ethers } from "ethers";
import PrefLedger from "../contracts/PrefLedger.json";

export const connectWallet = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Switch to Fuji first
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xA869" }],
    });
  } catch (err) {
    alert("Please switch MetaMask to Avalanche Fuji Testnet!");
    return null;
  }

  // Wait a moment for network to settle
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Reinitialize provider after network switch
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  const contract = new ethers.Contract(
    PrefLedger.address,
    PrefLedger.abi,
    signer
  );

  return { provider, signer, address, contract };
};