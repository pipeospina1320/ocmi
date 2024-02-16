import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { fCurrency } from '../../../utils/format-number';

import { CellType, TableHead } from '../types';
import TableLabel from '../components/table-label';
import { dotNotationExtractor } from '@front/utils/dot-notation';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  headConfig: TableHead[];
  onMutate: () => void;
};

export default function CustomTableRow({
  row,
  headConfig,
  onMutate, // selected, onViewRow, onSelectRow, onDeleteRow
}: Props) {
  const renderRow = (cell: TableHead, index: number) => {
    const { id, type, component } = cell;

    const align = cell?.align ?? 'center';
    const width = cell?.width ?? 'auto';

    if (component) {
      return (
        <TableCell key={index} align={align} sx={{ width }}>
          {component(row, onMutate)}
        </TableCell>
      );
    }

    const label = dotNotationExtractor(row, id)

    if (type === CellType.STATE) {
      return (
        <TableCell key={index} align={align} sx={{ width }}>
          <TableLabel key={index} label={label} color={'default'}/>
        </TableCell>
      );
    }

    if (type === CellType.NUMBER) {
      return (
        <TableCell key={index} align={align} sx={{ width }}>
          {fCurrency(label)}
        </TableCell>
      );
    }

    return (
      <TableCell key={index} align={align} sx={{ width }}>
        {label}
      </TableCell>
    );
  };

  return (
    <TableRow hover>
      {headConfig.map((cell, index) => renderRow(cell, index))}
    </TableRow>
  );
}
