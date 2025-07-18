import { UseFormRegister, RegisterOptions, Path } from "react-hook-form";

export type LoginFormInputs = {
  email: string;
  password: string;
  checkbox: boolean;
};

export type RegisterFormInput = {
  first_name: string;
  last_name: string;
  function: string;
  password: string;
  confirm_password: string;
  checkbox: boolean;
};

export type InputFieldProps<T extends object> = {
  name: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  type?: string;
};
  