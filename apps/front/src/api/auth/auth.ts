import useSWR from 'swr';
import { endpoints } from '../endpoints';
import { fetcher } from '@front/utils/axios';

export function useGetUser(token?: string | null) {
  const url = endpoints.auth.user;

  const { data, isLoading, error } = useSWR(
    token
      ? [
          url,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ]
      : null,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data: data ?? {},
    error: error ?? [],
    isLoading,
  };
}
