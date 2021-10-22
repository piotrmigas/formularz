import React from "react";
import { Radio, FormControl, FormLabel, RadioGroup, FormControlLabel, FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useField, useFormikContext } from "formik";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
    "& .MuiFormControlLabel-root": {
      height: 50,
    },
  },

  error: {
    color: "red",
    display: "flex",
    justifyContent: "center",
  },
}));

const RadioWrapper = ({ name }) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend">Opcje:</FormLabel>
      <RadioGroup {...field} onChange={(e) => setFieldValue(name, e.target.value)}>
        <FormControlLabel value="pierwsza" control={<Radio />} label="Pierwsza" />
        <FormControlLabel value="druga" control={<Radio />} label="Druga" />
      </RadioGroup>
      {meta.touched && meta.error ? <FormHelperText className={classes.error}>{meta.error}</FormHelperText> : null}
    </FormControl>
  );
};

export default RadioWrapper;
