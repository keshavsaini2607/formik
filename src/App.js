import React from "react";
import "./App.css";
import {
  TextField,
  FormLabel,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormGroup,
} from "@mui/material";

import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  fullName: yup.string("Enter your name").required("please enter your name"),
  gender: yup.string("Select your gender").required("please select one"),
  description: yup
    .string("Enter Description")
    .max(50, "please describe yourself in not more than 50 words")
    .required("please enter description"),
  title: yup.string("Enter Title").required("Title is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("please enter your email address"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("please enter password"),
  hobbies: yup.array().min(1, "select at least 1"),
  terms: yup
    .boolean(false)
    .oneOf([true], "please accept terms and conditions")
});

const App = () => {
  const options = [
    { value: "female", label: "female" },
    { value: "male", label: "male" },
  ];

  const checkOptions = [
    { value: "Cycling", lable: "Cycling" },
    { value: "Reading", lable: "Reading" },
    { value: "Dancing", lable: "Dancing" },
    { value: "Travelling", lable: "Travelling" },
  ];

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      description: "",
      title: "",
      gender: "",
      hobbies: [],
      terms: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  return (
    <div className="appContainer">
      <h1>Form no 2</h1>
      <form className="formContainer" onSubmit={formik.handleSubmit}>
        <div className="formContainer__input">
          {console.log(formik.errors)}
          <FormLabel>Name </FormLabel>
          <TextField
            placeholder="please enter your name"
            style={{ width: "90%" }}
            fullWidth
            name="fullName"
            label="Full Name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </div>
        <div className="formContainer__input">
          <FormLabel>Password </FormLabel>
          <TextField
            placeholder="please enter your name"
            style={{ width: "90%" }}
            fullWidth
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div className="formContainer__input">
          <FormLabel>Description </FormLabel>
          <TextField
            placeholder="please enter your name"
            style={{ width: "90%" }}
            fullWidth
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </div>
        <div className="formContainer__input">
          <FormLabel>Email </FormLabel>
          <TextField
            placeholder="please enter your name"
            style={{ width: "90%" }}
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className="formContainer__input">
          <FormLabel>Title </FormLabel>
          <TextField
            placeholder="please enter your name"
            style={{ width: "90%" }}
            fullWidth
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </div>

        <div className="formContainer__input left">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="radio-buttons-group"
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "4rem",
            }}
            name="gender"
            options={options}
            value={formik.values.gender}
            onChange={formik.handleChange}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </div>
        {formik.touched.gender && formik.errors.gender && (
          <div className="formContainer__input left">
            <span className="error">{formik.errors.gender}</span>
          </div>
        )}
        <div className="formContainer__input left">
          <FormLabel component="legend">Hobies</FormLabel>
          <FormGroup
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "4rem",
            }}
            name="hobbies"
            label="hobbies"
            value={formik.values.hobbies}
            onChange={(e) => {
              if (e.target.checked) {
                if (formik.values.hobbies.indexOf(e.target.value) === -1) {
                  const newArray = formik.values.hobbies;
                  newArray.push(e.target.value);
                  formik.setFieldValue("hobbies", newArray);
                }
              } else {
                if (formik.values.hobbies.indexOf(e.target.value) !== -1) {
                  let newArray = formik.values.hobbies;
                  newArray = newArray.filter((item) => item !== e.target.value);
                  formik.setFieldValue("hobbies", newArray);
                }
              }
            }}
            error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}
            helperText={formik.touched.hobbies && formik.errors.hobbies}
          >
            {checkOptions.map((opt) => (
              <FormControlLabel
                control={<Checkbox />}
                key={opt.value}
                value={opt.value}
                label={opt.lable}
              />
            ))}
          </FormGroup>
        </div>
        {formik.touched.hobbies && formik.errors.hobbies && (
          <div className="formContainer__input left">
            <span className="error">{formik.errors.hobbies}</span>
          </div>
        )}

        <div className="formContainer__input center">
          <Checkbox
            name="terms"
            label="terms"
            value={formik.values.terms}
            onChange={(e) => {
              formik.setFieldValue("terms", e.target.checked);
            }}
            error={formik.touched.terms && Boolean(formik.errors.terms)}
            helperText={formik.touched.terms && formik.errors.terms}
          />
          <h3>I ACCEPT TERMS AND CONDITIONS</h3>
        </div>

        {formik.touched.terms && formik.errors.terms && (
          <div className="formContainer__input center">
            <span className="error" style={{ marginLeft: 0 }}>
              {formik.errors.terms}
            </span>
          </div>
        )}

        <div className="formContainer__input center">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default App;
