import Panels from "./Panels";
import Global from "./Global";
import Helpers from "./Helpers";
import Delayed from "../../components/Delayed";
import FadeIn from "../../components/FadeIn";
import { PgWallet } from "../../utils/pg";
import styled, { css } from "styled-components";
import Img from "../../components/Img";
import Button from "../../components/Button";

const WalletButton = () => (
  <WalletWrapper>
    <Button
      onClick={() => (PgWallet.show = !PgWallet.show)}
      kind="icon"
      fontWeight="bold"
    >
      <Img src="/icons/sidebar/wallet.png" alt="Wallet" />
      Wallet
    </Button>
  </WalletWrapper>
);

const IDE = () => (
  <FadeIn>
    <WalletButton />
    <Panels />
    <Global />
    <Delayed delay={1000}>
      <Helpers />
    </Delayed>
  </FadeIn>
);

const WalletWrapper = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    & > button {
      background: ${theme.colors.default.bgPrimary};
      border-top-left-radius: ${theme.default.borderRadius};
      border-bottom-left-radius: ${theme.default.borderRadius};
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;

      & img {
        filter: invert(0.5);
        margin-right: 0.375rem;
      }

      &:hover img {
        filter: invert(${theme.isDark ? 1 : 0});
      }
    }
  `}
`;

export default IDE;
