import * as yup from "yup";

const SignupValidator = yup.object({
  fname: yup.string().required("First Name is Required"),
  lname: yup.string(),
  email: yup
    .string()
    .length(16, "University Roll Number Must have 16 digits")
    .required("Roll Number is Required"),
  password: yup.string().min(8, "Minimum 8 characters").required("Required!"),
  confirmpass: yup
    .string()
    .oneOf([yup.ref("password")], "Password's not match")
    .required("Required!"),
});

export default SignupValidator;
