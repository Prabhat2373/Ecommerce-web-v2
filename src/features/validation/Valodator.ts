import * as Yup from "yup";

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required(),
});
