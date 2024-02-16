import Label, { LabelColor } from '../../../components/label';

interface TableLabelProps {
  label: string;
  color: LabelColor;
}

export default function TableLabel({ label, color }: TableLabelProps) {
  return (
    <Label variant="soft" color={color}>
      {label}
    </Label>
  );
}
