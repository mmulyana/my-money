import { useQuery } from "@tanstack/react-query";
import { keys } from "@/shared/constants/key";
import { api } from "@/shared/lib/api-client";
import { Api } from "@/shared/types";

type Params = {
  date?: string;
  range?: string;
  enabled?: boolean;
};

export const useTransactionChart = (params?: Params) => {
  return useQuery({
    queryFn: () => {
      const { date, range } = params || {};
      return api
        .get<
          Api<
            {
              date: string;
              income: number;
              expense: number;
            }[]
          >
        >("transaction/chart", {
          searchParams: {
            date,
            range,
          },
        })
        .json();
    },
    queryKey: [keys.TransactionChart, params],
    enabled: params?.enabled || false,
  });
};
