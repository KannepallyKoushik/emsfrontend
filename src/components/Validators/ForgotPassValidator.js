import * as yup from "yup";

const ForgotPassValidator = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default ForgotPassValidator;
