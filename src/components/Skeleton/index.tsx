import classNames from "classnames";
import { SkeletonStyle } from "./style";
import { ReactNode } from "react";

interface SkeletonProps {
  shape?: string;
  width?: string;
  height?: number;
  children?: ReactNode;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  shape,
  width,
  height,
  children,
  className,
  ...props
}) => {
  return (
    <SkeletonStyle
      style={{ width, height }}
      className={classNames(shape, className)}
      {...props}
    >
      {children}
    </SkeletonStyle>
  );
};

export default Skeleton;
