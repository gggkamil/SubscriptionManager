import { TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
  name: string;
  label?: string;
}

export default function MyDateInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);
  const error = meta.touched && !!meta.error;

  return (
    <TextField
      type="date"
      {...field}
      label={props.label}
      fullWidth
      margin="normal"
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      error={error}
      helperText={error ? meta.error : ""}
      onChange={(e) => helpers.setValue(e.target.value)}
    />
  );
}
