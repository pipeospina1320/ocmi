// ----------------------------------------------------------------------

export interface ServerSideResponse {
  data: any[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
  };
}

export interface TableProps extends ServerSideResponse {
  page: number;
  isLoading: boolean;
  onMutate: () => void;
  rowsPerPage: number;

  //

  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;

  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export enum CellType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  STATE = 'STATE',
}

// ----------------------------------
export type TableHead = {
  id: string; // Name of column
  label: string; // Label to show
  width?: number;
  type?: CellType;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  component?: (row: any, onMutate: () => void) => React.ReactNode;
};
