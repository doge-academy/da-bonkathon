import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import Img from "../../../../../components/Img";
import Tooltip from "../../../../../components/Tooltip";

interface SidebarButtonProps extends ComponentPropsWithoutRef<"div"> {
  src: string;
  tooltipEl: ReactNode;
  isActive?: boolean;
}

const SidebarButton: FC<SidebarButtonProps> = ({
  src,
  tooltipEl,
  isActive,
  ...props
}) => (
  <Tooltip element={tooltipEl} placement="right" arrow={{ size: 4 }}>
    <div
      {...props}
      className={`p-2 transition duration-200 ease-in-out ${isActive ? 'bg-selection border-l-2 border-default-secondary filter invert' : 'hover:bg-state-hover-bg'} ${props.className}`}
    >
      <Img
        src={src}
        className={`w-8 h-8 p-1 transition duration-200 ease-in-out invert ${isActive ? '' : 'hover:brightness-0 hover:invert'}`}
      />
    </div>
  </Tooltip>
);

export default SidebarButton;
