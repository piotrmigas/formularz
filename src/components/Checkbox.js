import React from "react";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  error: {
    color: "red",
    display: "flex",
    justifyContent: "center",
  },
}));

const CheckboxWrapper = ({ name, label }) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <FormControl>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...field} onChange={(e) => setFieldValue(name, e.target.checked)} />}
          label={label}
        />
        {meta.touched && meta.error ? <FormHelperText className={classes.error}>{meta.error}</FormHelperText> : null}
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxWrapper;
