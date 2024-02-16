import useSWR from 'swr';
import { endpoints } from '../endpoints';
import { fetcher } from '@front/utils/axios';

export function useInitFormTimeSheet(id: string = '') {
  const url = endpoints.timeSheet.initForm;

  const { data, isLoading, error, isValidating } = useSWR(
    [
      url,
      {
        params: {
          id,
        },
      },
    ],
    fetcher,
  );

  return {
    timeSheet: data?.timeSheet || {},
    isLoading,
    error,
    isValidating,
  };
}
