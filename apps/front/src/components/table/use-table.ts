import useSWR from 'swr';
import { useState, useCallback } from 'react';

import { TableProps } from './types';
import { fetcher } from '../../utils/axios';

// ----------------------------------------------------------------------

type ReturnType = TableProps;

export type UseTableProps = {
  url: string;
  defaultDense?: boolean;
  defaultOrder?: 'asc' | 'desc';
  defaultOrderBy?: string;
  defaultSelected?: string[];
  defaultRowsPerPage?: number;
  defaultCurrentPage?: number;
};

export default function useTable(props: UseTableProps): ReturnType {
  const [page, setPage] = useState(props?.defaultCurrentPage || 0);

  const [rowsPerPage, setRowsPerPage] = useState(
    props?.defaultRowsPerPage || 5,
  );

  const { data, isLoading, mutate } = useSWR(
    [
      props.url,
      {
        params: {
          page,
          limit: rowsPerPage,
        },
      },
    ],
    fetcher,
  );

  const onMutate = () => {
    mutate();
  };

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(0);
      setRowsPerPage(parseInt(event.target.value, 10));
    },
    [],
  );

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  return {
    data: data?.data,
    pagination: data?.pagination,
    onMutate,
    isLoading,
    page,
    rowsPerPage,
    //
    onChangePage,
    onChangeRowsPerPage,
    //
    setPage,
    setRowsPerPage,
  };
}
