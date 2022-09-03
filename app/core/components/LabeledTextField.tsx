import { forwardRef, PropsWithoutRef } from "react";
import { useField, useFormikContext, ErrorMessage } from "formik";
import TextField, { StandardTextFieldProps } from "@mui/material/TextField";

export interface LabeledTextFieldProps
  extends PropsWithoutRef<StandardTextFieldProps> {
  /** Field name. */
  name: string;
  /** Field label. */
  label: string;
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number";
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>;
}

export const LabeledTextField = forwardRef<
  typeof TextField,
  LabeledTextFieldProps
>(({ name, label, outerProps, ...props }, ref) => {
  const [input] = useField(name);
  const { isSubmitting } = useFormikContext();

  return (
    <div {...outerProps}>
      <TextField
        inputProps={{ ...input }}
        label={label}
        disabled={isSubmitting}
        {...props}
        inputRef={ref}
      />

      <ErrorMessage name={name}>
        {(msg) => (
          <div role="alert" style={{ color: "red" }}>
            {msg}
          </div>
        )}
      </ErrorMessage>
    </div>
  );
});

export default LabeledTextField;
