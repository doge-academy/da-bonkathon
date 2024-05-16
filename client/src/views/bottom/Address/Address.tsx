import Link from "../../../components/Link";
import Tooltip from "../../../components/Tooltip";
import { useBlockExplorer, useWallet } from "../../../hooks";

export const Address = () => {
  const blockExplorer = useBlockExplorer();
  const { walletPkStr } = useWallet();

  if (!walletPkStr) return null;

  return (
    <>
      <span className="mx-3">|</span>

      <Tooltip element="Your address">
        <Link
          href={blockExplorer.getAddressUrl(walletPkStr)}
          className="text-current flex items-center justify-center"
        >
          {walletPkStr}
        </Link>
      </Tooltip>
    </>
  );
};
