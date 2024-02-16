import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

type Props = {
  headLabel: any[];
  sx?: SxProps<Theme>;
};

export default function TableHeadCustom({
  headLabel,
  sx,
}: Props) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'center'}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
