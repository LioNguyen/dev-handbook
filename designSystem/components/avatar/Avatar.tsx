import { type FC, type HTMLAttributes, memo, useState } from "react";

import { IComponentBase } from "@/shared/types";
import { cn } from "@/shared/utils";

interface IAvatarProps extends IComponentBase {
  src?: string;
  name: string;
  size?: number | string;
  imgProps?: Omit<HTMLAttributes<HTMLImageElement>, "src" | "alt" | "onClick">;
  onClick?: () => void;
}

const Avatar: FC<IAvatarProps> = ({ className, src, name, size = 40, imgProps, onClick }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { className: imgClassName, ...restImgProps } = imgProps || {};

  const handleLoad = () => {
    setIsImageLoaded(true);
  };

  const getDisplayChars = (name: string) => {
    if (!name) {
      return "";
    }

    const words = name?.split(" ").filter(Boolean);
    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    return words[0].charAt(0).toUpperCase();
  };

  const displayChars = getDisplayChars(name);

  return (
    <div
      data-testid="avatar-test"
      className={cn(
        "avatar relative flex items-center justify-center rounded-full bg-background-secondary overflow-hidden",
        onClick ? "cursor-pointer" : "",
        className,
      )}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <span
        className={cn("text-white font-medium", isImageLoaded ? "hidden" : "block")}
        style={{ fontSize: `${Number(size) * 0.4}px` }}
      >
        {displayChars}
      </span>
      <img
        className={cn("w-full h-full object-cover", imgClassName, isImageLoaded ? "block" : "hidden")}
        src={src}
        alt={name}
        onLoad={handleLoad}
        {...restImgProps}
      />
    </div>
  );
};

export default memo(Avatar);
export type { IAvatarProps };
