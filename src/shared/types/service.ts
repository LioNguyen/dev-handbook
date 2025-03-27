interface IApiResponse {
  data: any;
  messageCode: string;
}

interface IPagination {
  items: any[];
  page: number;
  limit: number;
  totalPages: number;
}

interface IPaginationFilter {
  page: number;
  limit: number;
}

type TQuerryError = string;

export type { IApiResponse, IPagination, IPaginationFilter, TQuerryError };
