import { type LucideIcon } from "lucide-react";
import { type FC, type HTMLAttributes, memo, useState } from "react";

import { IComponentBase } from "@/shared/types";
import { cn } from "@/shared/utils";

interface IImageProps extends IComponentBase {
  src?: string;
  alt?: string;
  size?: number | string;
  imgProps?: Omit<HTMLAttributes<HTMLImageElement>, "src" | "alt" | "onClick">;
  onClick?: () => void;
  icon?: LucideIcon;
  iconSize?: number;
  iconColor?: string;
  iconHoverColor?: string;
}

const Image: FC<IImageProps> = ({
  className,
  src,
  alt,
  size,
  imgProps,
  onClick,
  icon: Icon,
  iconSize = 24,
  iconColor,
  iconHoverColor = "text-black",
}) => {
  const [isImageLoaded, setIsLoaded] = useState(false);
  const { className: imgClassName, ...restImgProps } = imgProps || {};

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      data-testid="image-test"
      className={cn("relative", "image", onClick ? "cursor-pointer" : "", className)}
      onClick={onClick}
    >
      {src && !Icon && (
        <img
          className={cn("transition-opacity duration-300", imgClassName, isImageLoaded ? "block" : "hidden")}
          src={src}
          alt={alt || src}
          width={size}
          height={size}
          onLoad={handleLoad}
          {...restImgProps}
        />
      )}
      {Icon && (
        <Icon size={iconSize} className={cn("transition-colors duration-200", iconColor, `hover:${iconHoverColor}`)} />
      )}
    </div>
  );
};

export default memo(Image);
export type { IImageProps };
