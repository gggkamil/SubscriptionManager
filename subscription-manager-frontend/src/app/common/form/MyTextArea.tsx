import { TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  rows?: number;
}

export default function MyTextArea(props: Props) {
  const [field, meta] = useField(props.name);
  const error = meta.touched && !!meta.error;

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      label={props.label}
      placeholder={props.placeholder}
      multiline
      rows={props.rows || 3}
      error={error}
      helperText={error ? meta.error : ""}
      margin="normal"
      variant="outlined"
    />
  );
}
