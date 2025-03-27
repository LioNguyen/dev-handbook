import { X } from "lucide-react";
import { ChangeEvent, ComponentPropsWithRef, FC, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useDebounce } from "@/shared/hooks/useDebounce";
import { IComponentBase } from "@/shared/types";
import { cn } from "@/shared/utils";
import { Button } from "@designSystem/components/button";
import { Input } from "@designSystem/components/input";

interface ISearchBoxProps extends IComponentBase {
  inputDelay?: number;
  inputProps?: Omit<ComponentPropsWithRef<typeof Input>, "id" | "onChange" | "placeholder" | "type" | "value">;
  placeholder?: string;
  value?: string;
}

const SearchBox: FC<ISearchBoxProps> = ({ className, inputDelay, inputProps, onChange, placeholder, value }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  const debounceValue = useDebounce(inputValue, inputDelay ?? 400);

  const { className: inputClassName, ...restInputProps } = inputProps || {};

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue("");
    onChange?.("");
  };

  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  useEffect(() => {
    onChange?.(debounceValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  return (
    <div data-testid="search-box-test" className={cn("search-box relative flex items-center", className)}>
      <Input
        className={cn("h-full px-4 py-2 rounded-md bg-white focus:outline-hidden w-full", inputClassName)}
        onChange={handleInputChange}
        placeholder={placeholder || t("form.search_placeholder")}
        type="text"
        value={inputValue}
        {...restInputProps}
      />
      {inputValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 text-text-muted-foreground hover:text-text hover:bg-transparent"
          onClick={clearInput}
          aria-label={t("form.clear_search")}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default memo(SearchBox);
export type { ISearchBoxProps };
