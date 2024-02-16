import { Card, Table, TableBody, TableContainer } from '@mui/material';

// import { fetcher } from 'src/utils/axios';

import Body from './body/body';
import useTable from './use-table';
import { TableHead } from './types';
import TableNoData from './body/table-no-data';
import TableSkeleton from './body/table-skeleton';
import TableHeadCustom from './header/table-head-custom';
import TablePaginationCustom from './pagination/table-pagination-custom';

type TableConfigProps = {
  headConfig: TableHead[];
  url: string;
};

export default function ServerSideTable({ headConfig, url }: TableConfigProps) {
  const {
    data,
    isLoading,
    pagination,
    onMutate,
    page,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    url,
    defaultCurrentPage: 0,
  });

  return (
    <Card>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Table size="small">
          <TableHeadCustom
            headLabel={headConfig}
          />

          <TableBody>
            {isLoading ? (
              <TableSkeleton
                headConfig={headConfig}
                rowsPerPage={rowsPerPage}
              />
            ) : (
              <Body data={data} headConfig={headConfig} onMutate={onMutate} />
            )}

            {!isLoading && <TableNoData notFound={!data?.length} />}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePaginationCustom
        count={pagination?.totalRecords || -1}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        disabled={!pagination?.totalRecords}
        //
        // dense={table.dense}
        // onChangeDense={table.onChangeDense}
      />
    </Card>
  );
}
