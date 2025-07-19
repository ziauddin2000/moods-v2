"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RegisterFormInput } from "../../../types/auth";
import InputField from "../_components/input";
import SubmitBtn from "../_components/submitBtn";

export default function Register() {
  const router = useRouter();

  // Form Validation
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<RegisterFormInput>();

  const onSubmit: SubmitHandler<RegisterFormInput> = (data) => {
    console.log(data);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-l from-darkgreen to-gr-light flex items-center justify-center px-2 py-5">
      <div className="max-w-xl w-full bg-primary-rich-black py-16 sm:py-8 px-5 rounded-3xl relative">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md w-full mx-auto"
        >
          <div>
            <Image
              src="/icons/logo.svg"
              width={160}
              height={40}
              className="block mx-auto"
              alt="Logo"
            />
          </div>
          <h1 className="text-3xl font-normal text-white my-8 sm:my-10">
            Vul je gegevens in om jouw profiel aan te maken
          </h1>

          {/* Name Input*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* First Name Input */}
            <div>
              <InputField
                name="first_name"
                placeholder="Voornaam"
                register={register}
                validation={{
                  required: "First name is required",
                }}
              />

              {errors.first_name && (
                <p
                  className="text-error-color text-base my-1 font-medium text-left pl-6"
                  role="alert"
                >
                  {errors.first_name.message}
                </p>
              )}
            </div>
            {/* Last Name Input */}
            <div>
              <InputField
                name="last_name"
                placeholder="Achternaam"
                register={register}
                validation={{
                  required: "Last name is required",
                }}
              />

              {errors.last_name && (
                <p
                  className="text-error-color text-base my-1 font-medium text-left pl-6"
                  role="alert"
                >
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          {/* Job Function Input */}
          <div className="mb-4">
            <InputField
              name="function"
              placeholder="Welke functie heb je?"
              register={register}
              validation={{
                required: "Job function is required",
              }}
            />

            {errors.function && (
              <p
                className="text-error-color text-base my-1 font-medium text-left pl-6"
                role="alert"
              >
                {errors.function.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <InputField
              name="password"
              placeholder="Nieuw wachtwoord"
              register={register}
              validation={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
            />

            {errors.password && (
              <p
                className="text-error-color text-base my-1 font-medium text-left pl-6"
                role="alert"
              >
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Confirm Password */}
          <div className="mb-6">
            <InputField
              name="confirm_password"
              placeholder="Bevestig wachtwoord"
              register={register}
              validation={{
                required: "Confirm password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              }}
            />

            {errors.confirm_password && (
              <p
                className="text-error-color text-base my-1 font-medium text-left pl-6"
                role="alert"
              >
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="mb-6">
            <label className="flex items-center cursor-pointer gap-2 px-2">
              <input
                type="checkbox"
                id="checkbox"
                className="hidden"
                {...register("checkbox", {
                  required: "You must agree to the terms",
                })}
              />
              <span className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center transition-all duration-200">
                <Image
                  className="hidden"
                  src="../icons/check-mark.svg"
                  width={16}
                  height={16}
                  alt="Check Mark"
                />
              </span>
              <span className="text-primary-beige text-sm select-none">
                I will ingelogd blijven
              </span>
            </label>
            {errors.checkbox && (
              <p
                className="text-error-color text-base my-1 font-medium text-left pl-8"
                role="alert"
              >
                {errors.checkbox.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <SubmitBtn btnText="Volgende stap" />

          {/* Login Link */}
          <p className="text-base font-normal text-center text-primary-beige mt-6">
            Nog geen account? Meld je{" "}
            <Link href="/auth" className="underline">
              hier
            </Link>{" "}
            in.
          </p>
        </form>

        {/* Back Button */}
        <Link href="/" className="absolute top-10 left-5 lg:left-10">
          <Image
            src="./../icons/go-back.svg"
            width={40}
            height={40}
            alt="Back Icon"
          />
        </Link>
      </div>
    </div>
  );
}
