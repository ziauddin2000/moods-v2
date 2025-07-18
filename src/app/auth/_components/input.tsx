import { InputFieldProps } from "@/types/auth";

export default function InputField<T extends object>({
  name,
  placeholder,
  register,
  validation,
  type = "text",
}: InputFieldProps<T>) {
  return (
    <input
      type={type}
      className="h-[55px] w-full rounded-[30px] py-1 pl-6 pr-2 outline-0 border border-secondary-beige text-secondary-beige text-base font-normal"
      placeholder={placeholder}
      {...register(name, validation)}
    />
  );
}
  