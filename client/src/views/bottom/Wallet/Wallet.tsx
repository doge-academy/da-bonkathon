import { useCallback } from "react";
import Button from "../../../components/Button";
import Tooltip from "../../../components/Tooltip";
import { useWallet } from "../../../hooks";
import { PgCommand } from "../../../utils/pg";

export const Wallet = () => {
  const { wallet, walletPkStr } = useWallet();

  // Using a callback because this function might be resolved later than the
  // mount of this component
  const connect = useCallback(() => PgCommand.connect.run(), []);

  return (
    <Tooltip element="Toggle Playground Wallet">
      <Button
        kind="transparent"
        onClick={connect}
        className="h-full px-3 hover:bg-opacity-30 flex items-center"
      >
        <WalletStatus isConnected={!!walletPkStr} />
        <span className="ml-2">
          {wallet
            ? wallet.isPg
              ? "Connected to Playground Wallet"
              : `Connected to ${wallet.name}`
            : "Not connected"}
        </span>
      </Button>
    </Tooltip>
  );
};

const WalletStatus = ({ isConnected }: { isConnected: boolean }) => (
  <span
    className={`inline-block w-3 h-3 rounded-full ${
      isConnected ? 'bg-green-500' : 'bg-red-500'
    }`}
  />
);
