import { TextField, MenuItem } from "@mui/material";
import { useField } from "formik";

interface Option {
  text: string;
  value: string | number;
}

interface Props {
  name: string;
  label?: string;
  options: Option[];
}

export default function MySelectInput(props: Props) {
  const [field, meta] = useField(props.name);
  const error = meta.touched && !!meta.error;

  return (
    <TextField
      {...field}
      select
      fullWidth
      label={props.label}
      margin="normal"
      variant="outlined"
      error={error}
      helperText={error ? meta.error : ""}
    >
      {props.options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.text}
        </MenuItem>
      ))}
    </TextField>
  );
}
