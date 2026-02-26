import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PrefLedgerModule = buildModule("PrefLedgerModule", (m) => {
  const prefLedger = m.contract("PrefLedger");
  return { prefLedger };
});

export default PrefLedgerModule;