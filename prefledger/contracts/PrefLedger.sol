// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PrefLedger {
    struct Preference {
        string ipfsCID;
        uint256 timestamp;
    }

    // user address => key => list of preferences (history)
    mapping(address => mapping(bytes32 => Preference[])) private preferences;

    // user address => list of all keys they've used
    mapping(address => bytes32[]) private userKeys;

    event PreferenceSet(
        address indexed user,
        bytes32 indexed key,
        string ipfsCID,
        uint256 timestamp
    );

    // Store a preference
    function setPreference(bytes32 key, string calldata ipfsCID) external {
        preferences[msg.sender][key].push(Preference({
            ipfsCID: ipfsCID,
            timestamp: block.timestamp
        }));

        // Track key if first time
        if (preferences[msg.sender][key].length == 1) {
            userKeys[msg.sender].push(key);
        }

        emit PreferenceSet(msg.sender, key, ipfsCID, block.timestamp);
    }

    // Get latest preference for a key
    function getPreference(address user, bytes32 key) 
        external view returns (string memory ipfsCID, uint256 timestamp) 
    {
        Preference[] storage prefs = preferences[user][key];
        require(prefs.length > 0, "No preference found");
        Preference storage latest = prefs[prefs.length - 1];
        return (latest.ipfsCID, latest.timestamp);
    }

    // Get full history for a key
    function getPreferenceHistory(address user, bytes32 key)
        external view returns (Preference[] memory)
    {
        return preferences[user][key];
    }

    // Get all keys for a user
    function getUserKeys(address user) 
        external view returns (bytes32[] memory) 
    {
        return userKeys[user];
    }
}