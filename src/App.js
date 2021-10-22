import React from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Checkbox from "./components/Checkbox";
import { Formik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

function App() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object({
    firstName: yup.string().max(15, "Imię może mieć max 15 znaków").required("Proszę podać imię"),
    lastName: yup.string().max(20, "Nazwisko może mieć max 15 znaków").required("Proszę podać nazwisko"),
    email: yup.string().email("Nieprawidłowy email").required("Proszę podać email"),
    phone: yup.string().matches(phoneRegExp, "Nieprawidłowy numer telefonu").required("Proszę podać numer telefonu"),
    password: yup.string().min(8, "Hasło musi mieć min 8 znaków").required("Proszę podać hasło"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Hasła muszą się zgadzać")
      .required("Proszę potwierdzić hasło"),
    terms: yup.boolean().required().oneOf([true], "Proszę zaakceptować warunki"),
  });

  const classes = useStyles();

  return (
    <Dialog open={true}>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          terms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={classes.root}>
            <div>
              <TextField
                label="Imię"
                variant="filled"
                name="firstName"
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                autoComplete="off"
              />
              <TextField
                label="Nazwisko"
                variant="filled"
                {...formik.getFieldProps("lastName")}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                autoComplete="off"
              />
            </div>
            <div>
              <TextField
                label="Email"
                variant="filled"
                type="email"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                autoComplete="off"
              />
              <TextField
                label="Telefon"
                variant="filled"
                {...formik.getFieldProps("phone")}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                autoComplete="off"
              />
            </div>
            <div>
              <TextField
                label="Hasło"
                variant="filled"
                type="password"
                {...formik.getFieldProps("password")}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                autoComplete="off"
              />
              <TextField
                label="Potwierdź hasło"
                variant="filled"
                type="password"
                {...formik.getFieldProps("confirmPassword")}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                autoComplete="off"
              />
            </div>
            <Checkbox name="terms" label="Akceptuję warunki umowy" />
            <div>
              <Button variant="contained">Anuluj</Button>
              <Button type="submit" variant="contained" color="primary">
                Zarejestruj
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}

export default App;
