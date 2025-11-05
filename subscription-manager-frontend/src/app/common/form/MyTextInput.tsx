import { TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
}

export default function MyTextInput(props: Props) {
  const [field, meta] = useField(props.name);
  const error = meta.touched && !!meta.error;

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      label={props.label}
      placeholder={props.placeholder}
      type={props.type || "text"}
      multiline={props.multiline}
      rows={props.rows}
      error={error}
      helperText={error ? meta.error : ""}
      margin="normal"
      variant="outlined"
    />
  );
}
