import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

import Balance from "./Balance";
import Send from "./Send";
import Settings from "./Settings";
import Transactions from "./Transactions";
import Img from "../Img";
import Input from "../Input";
import Menu, { MenuItemProps } from "../Menu";
import Tooltip from "../Tooltip";
import { Close, ShortArrow } from "../Icons";
import { Id } from "../../constants";
import { Fn, PgCommon, PgWallet } from "../../utils/pg";
import {
  useAutoAirdrop,
  useDarken,
  useStandardAccountChange,
  useSyncBalance,
} from "./hooks";
import {
  useKeybind,
  useOnClickOutside,
  useRenderOnChange,
  useWallet,
} from "../../hooks";

const Wallet: FC = () => {
  useRenderOnChange(PgWallet.onDidChangeShow);

  useStandardAccountChange();
  useSyncBalance();
  useAutoAirdrop();

  const tabHeight = document
    .getElementById(Id.TABS)
    ?.getBoundingClientRect().height;

  if (!PgWallet.show) return null;

  return (
    <>
      <div id={Id.WALLET_BOUND} className="absolute z-[-1] m-2.5"></div>
      <Rnd
        default={{
          x: window.innerWidth - (WALLET_WIDTH + 12),
          y: tabHeight ?? 32,
          width: "fit-content",
          height: "fit-content",
        }}
        minWidth={WALLET_WIDTH}
        maxWidth={WALLET_WIDTH}
        enableResizing={false}
        bounds={"#" + Id.WALLET_BOUND}
        enableUserSelectHack={false}
        style={{ position: "fixed", top: "1rem", right: "1rem" }}
      >
        <div className="p-4 shadow-lg rounded-lg bg-[#3b3b3b] z-[1000]">
          <WalletTop />
          <WalletMain />
        </div>
      </Rnd>
    </>
  );
};

const WALLET_WIDTH = 320;

const WalletTop = () => {
  const [rename, setRename] = useState(false);

  const showRename = useCallback(() => {
    setRename(true);
  }, []);

  const hideRename = useCallback(() => {
    setRename(false);
  }, []);

  return (
    <div className="relative h-8 flex justify-center items-center p-2">
      <Settings showRename={showRename} />
      {rename ? <WalletRename hideRename={hideRename} /> : <WalletName />}
      <WalletClose />
    </div>
  );
};

const WalletName = () => {
  const { wallet, walletPkStr } = useWallet();

  const { darken, lighten } = useDarken();

  const getAccountDisplayName = useCallback(
    (accountName: string, pkStr: string) => {
      return (
        PgCommon.withMaxLength(accountName, 12) +
        ` - (${PgCommon.shorten(pkStr)})`
      );
    },
    []
  );

  const pgAccounts: MenuItemProps[] = PgWallet.accounts.map((acc, i) => ({
    name: getAccountDisplayName(
      acc.name,
      PgWallet.createWallet(acc).publicKey.toBase58()
    ),
    onClick: () => PgWallet.switch(i),
    hoverColor: "textPrimary",
  }));

  const standardAccounts: MenuItemProps[] =
    PgWallet.getConnectedStandardWallets().map((wallet) => ({
      name: getAccountDisplayName(wallet.name, wallet.publicKey!.toBase58()),
      onClick: () => {
        PgWallet.update({ state: "sol", standardName: wallet.name });
      },
      icon: <Img src={wallet.icon} alt={wallet.name} />,
      hoverColor: "secondary",
    }));

  if (!wallet) return null;

  return (
    <Menu.Dropdown
      items={pgAccounts.concat(standardAccounts)}
      onShow={darken}
      onHide={lighten}
    >
      <Tooltip element="Accounts">
        <div className="flex justify-center items-center cursor-pointer hover:text-primary">
          {!wallet.isPg && (
            <Img
              className="w-4 h-4 mr-1"
              src={wallet.icon}
              alt={wallet.name}
            />
          )}
          <span className="flex items-center p-1 text-secondary font-bold text-sm transition-all">
            {getAccountDisplayName(wallet.name, walletPkStr!)}
          </span>
          <ShortArrow rotate="90deg" />
        </div>
      </Tooltip>
    </Menu.Dropdown>
  );
};

const WalletRename: FC<{ hideRename: Fn }> = ({ hideRename }) => {
  const [name, setName] = useState(PgWallet.current!.name);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  useOnClickOutside(inputRef, hideRename);

  useKeybind([
    {
      keybind: "Enter",
      handle: () => {
        PgWallet.rename(name);
        hideRename();
      },
    },
    {
      keybind: "Escape",
      handle: hideRename,
    },
  ]);

  return (
    <div>
      <Input
        ref={inputRef}
        value={name}
        onChange={(ev) => setName(ev.target.value)}
        validator={PgWallet.validateAccountName}
        placeholder="Rename wallet..."
      />
    </div>
  );
};

const WalletClose = () => (
  <button
    onClick={() => (PgWallet.show = false)}
    className="absolute right-4"
  >
    <Close />
  </button>
);

const WalletMain = () => (
  <div id={Id.WALLET_MAIN} className="relative p-4">
    <Balance />
    <Send />
    <Transactions />
  </div>
);

export default Wallet;
