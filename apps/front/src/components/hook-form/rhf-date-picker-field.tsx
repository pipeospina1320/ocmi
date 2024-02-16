import { Controller, useFormContext } from 'react-hook-form';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  label: string;
};

export default function RHFDatePickerField({ name, label, ...other }: Props) {
  const { control, getValues } = useFormContext();

  if (moment.locale() !== 'en-gb') {
    moment.locale('en-gb');
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <LocalizationProvider
            dateAdapter={AdapterMoment}
            adapterLocale="en-gb"
          >
            <DatePicker
              name={name}
              label={label}
              value={moment(field.value)}
              onChange={(date) => {
                field.onChange(date?.format('YYYY-MM-DD'));
              }}
              format="DD-MM-YYYY"
              slotProps={{
                actionBar: {
                  actions: ['today', 'accept'],
                },
                textField: {
                  error: !!error,
                  helperText: error?.message,
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}
