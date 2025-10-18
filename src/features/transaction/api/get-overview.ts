import { useQuery } from "@tanstack/react-query";
import { keys } from "@/shared/constants/key";
import { api } from "@/shared/lib/api-client";
import { Api } from "@/shared/types";

type Params = {
  date?: string;
  enabled?: boolean;
  type?: string;
};

export const useGetOverview = (params?: Params) => {
  return useQuery({
    queryFn: () => {
      const { date, type } = params || {};
      return api
        .get<
          Api<
            {
              id: string;
              name: string;
              color: string;
              imageUrl: string;
              total: number;
              imageVariant: string;
            }[]
          >
        >("transaction/overview", {
          searchParams: {
            date,
            type,
          },
        })
        .json();
    },
    queryKey: [keys.Overview, params?.date, params?.type],
    enabled: params?.enabled || false,
    select: (res) => {
      const total = res.data.reduce((acc, trx) => acc + Number(trx.total), 0);
      return {
        ...res,
        total,
      };
    },
  });
};
