import { TableHead } from '../types';
import CustomTableRow from './table-row';

type BodyProps = {
  headConfig: TableHead[];
  data: any[];
  onMutate: () => void;
};
export default function Body({ headConfig, data, onMutate }: BodyProps) {
  const renderRow = () =>
    data.map((row, index) => (
      <CustomTableRow
        key={`${row.id}-${index}`}
        row={row}
        headConfig={headConfig}
        onMutate={onMutate}
      />
    ));

  return <>{renderRow()}</>;
}
