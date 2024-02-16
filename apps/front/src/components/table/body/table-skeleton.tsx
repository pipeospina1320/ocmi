import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableRow, { TableRowProps } from '@mui/material/TableRow';

import { TableHead } from '../types';

// ----------------------------------------------------------------------
type SkeletonProps = TableRowProps & {
  headConfig: TableHead[];
  rowsPerPage: number;
};

export default function TableSkeleton({ headConfig, rowsPerPage = 5, ...other }: SkeletonProps) {
  const renderCell = () =>
    headConfig.map((_cell, index) => (
      <TableCell key={index}>
        <Skeleton key={index} sx={{ height: 35 }} />
      </TableCell>
    ));

  const renderRow = () => {
    const rows = Array.from(Array(rowsPerPage));
    return rows.map((_val, index) => (
      <TableRow key={index} {...other}>
        {renderCell()}
      </TableRow>
    ));
  };

  return <>{renderRow()}</>;
}
