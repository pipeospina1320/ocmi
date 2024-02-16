import { TimeSheetEditView } from '@front/sections/app/time-sheet/edit-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Editar Documento',
};

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const { id } = params;
  return <TimeSheetEditView id={id} />;
}
