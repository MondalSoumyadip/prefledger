import { writeFileSync } from "fs";

const content = `import { useState } from 'react'`;
import { connectWallet } from './utils/wallet';
import { uploadToIPFS, fetchFromIPFS } from './utils/ipfs';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [wallet, setWallet] = useState(null);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [status, setStatus] = useState('');

  const handleConnect = async () => {
    const w = await connectWallet();
    if (w) {
      setWallet(w);
      setStatus('Wallet connected!');
      await loadPreferences(w);
    }
  };

  const loadPreferences = async (w) => {
    try {
      const keys = await w.contract.getUserKeys(w.address);
      const prefs = [];
      for (let k of keys) {
        const [cid, timestamp] = await w.contract.getPreference(w.address, k);
        const data = await fetchFromIPFS(cid);
        prefs.push({
          key: ethers.decodeBytes32String(k),
          value: data.value,
          cid,
          timestamp: new Date(Number(timestamp) * 1000).toLocaleString(),
        });
      }
      setPreferences(prefs);
    } catch (err) {
      console.error('Error loading preferences:', err);
    }
  };

  const handleSetPreference = async () => {
    if (!key || !value) {
      alert('Please fill in both fields!');
      return;
    }
    try {
      setLoading(true);
      setStatus('Uploading to IPFS...');
      const cid = await uploadToIPFS(key, value);
      setStatus('Writing to Avalanche...');
      const bytes32Key = ethers.encodeBytes32String(key);
      const tx = await wallet.contract.setPreference(bytes32Key, cid);
      setStatus('Waiting for confirmation...');
      await tx.wait();
      setTxHash(tx.hash);
      setStatus('Preference saved on-chain! ✅');
      setKey('');
      setValue('');
      await loadPreferences(wallet);
    } catch (err) {
      console.error(err);
      setStatus('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>⛰️ PrefLedger</h1>
        <p className="subtitle">Decentralized Preference Registry on Avalanche</p>
        {!wallet ? (
          <button className="connect-btn" onClick={handleConnect}>
            Connect Wallet
          </button>
        ) : (
          <p className="address">
            Connected: {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
          </p>
        )}
      </header>
      {wallet && (
        <main>
          <section className="write-section">
            <h2>Set Preference</h2>
            <input
              type="text"
              placeholder="Key for example: theme, language"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              maxLength={31}
            />
            <input
              type="text"
              placeholder="Value for example: dark, english"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button className="save-btn" onClick={handleSetPreference} disabled={loading}>
              {loading ? 'Saving...' : 'Save Preference'}
            </button>
            {status && <p className="status">{status}</p>}
            {txHash && (
              
                className="tx-link"
                href={'https://testnet.snowtrace.io/tx/' + txHash}
                target="_blank"
                rel="noreferrer"
              >
                View Transaction on Snowtrace
              </a>
            )}
          </section>
          <section className="read-section">
            <h2>My Preferences</h2>
            {preferences.length === 0 ? (
              <p className="empty">No preferences set yet.</p>
            ) : (
              <div className="pref-list">
                {preferences.map((pref, i) => (
                  <div className="pref-card" key={i}>
                    <div className="pref-header">
                      <span className="pref-key">{pref.key}</span>
                      <span className="pref-value">{pref.value}</span>
                    </div>
                    <div className="pref-meta">
                      <span>{pref.timestamp}</span>
                      
                        href={'https://gateway.pinata.cloud/ipfs/' + pref.cid}
                        target="_blank"
                        rel="noreferrer"
                      >
                        IPFS
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
`;

writeFileSync("src/App.jsx", content);
console.log("Done");