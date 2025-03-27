/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";

import { ISelectOption } from "@/shared/types";

interface IPaginatedData {
  totalPages: number;
  page: number;
  items: any[];
}

interface IUsePaginationProps<T> {
  data?: {
    data: T & IPaginatedData;
  };
  isLoading: boolean;
  queryParams: {
    page?: number;
  };
  onQueryChange: (params: { page: number }) => void;
}

const usePagination = <T>({ data, isLoading, queryParams, onQueryChange }: IUsePaginationProps<T>) => {
  const hasMore = useMemo(() => {
    if (!data?.data) return false;
    const { totalPages, page } = data.data;
    return totalPages > page;
  }, [data?.data]);

  const handleLoadMore = () => {
    if (isLoading || !hasMore) return;
    onQueryChange({
      page: (queryParams.page || 1) + 1,
    });
  };

  return {
    hasMore,
    handleLoadMore,
  };
};

interface IUseInfiniteOptionsProps<T> {
  data?: {
    items: T[];
  };
  getOptionLabel: (item: T) => string;
  getOptionValue: (item: T) => number | string | T;
  optionsUniqBy?: string;
}

const useInfiniteOptions = <T>({
  data,
  getOptionLabel,
  getOptionValue,
  optionsUniqBy,
}: IUseInfiniteOptionsProps<T>) => {
  const [options, setOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    if (data) {
      const newOptions = data.items.map(item => ({
        label: getOptionLabel(item),
        value: getOptionValue(item),
      }));

      const newUniqOptions = _.uniqBy([...options, ...newOptions], optionsUniqBy || "value");

      if (!_.isEqual(options, newUniqOptions)) {
        setOptions(newUniqOptions);
      }
    }
  }, [data?.items]);

  return options;
};

export { useInfiniteOptions, usePagination };
export type { IUseInfiniteOptionsProps, IUsePaginationProps };
