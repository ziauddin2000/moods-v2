"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginFormInputs } from "../../types/auth";
import InputField from "./_components/input";
import SubmitBtn from "./_components/submitBtn";

export default function Login() {
  const router = useRouter();

  // Form Validation
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-black grid grid-cols-1 md:grid-cols-2 gap-5 relative">
      {/* Form */}
      <div className="flex items-center justify-center text-center text-white py-10 px-4 md:px-3 md:py-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md w-full mx-auto"
        >
          <div>
            <Image
              src="/icons/logo.svg"
              width={160}
              height={40}
              className="block mx-auto mb-4"
              alt="Logo"
            />
          </div>
          <h1 className="text-[40px] sm:text-[50px] font-medium mb-8">
            Welkom terug!
          </h1>

          <div className="mb-4">
            <InputField
              name="email"
              placeholder="Email"
              register={register}
              validation={{
                required: "Email Address is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              }}
            />

            {errors.email && (
              <p
                className="text-error-color text-base my-1 font-medium text-left pl-6"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <InputField
              name="password"
              placeholder="Wachtwoord"
              register={register}
              validation={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              type="text"
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

          <div className="flex justify-end mb-4">
            <Link
              href="#"
              className="text-primary-beige text-sm font-normal hover:underline"
            >
              Wachtwoord vergeten?
            </Link>
          </div>

          <div className="mb-4">
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
                  src="/icons/check-mark.svg"
                  width={16}
                  height={16}
                  alt="Check Mark"
                />
              </span>
              <span className="text-primary-beige text-base font-normal select-none">
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

          {/* Submit Btn */}
          <SubmitBtn btnText="Log In" />

          {/* Register */}
          <p className="text-base font-normal text-primary-beige">
            Nog geen account? Meld je{" "}
            <Link href="/auth/register" className="underline">
              hier
            </Link>{" "}
            aan.
          </p>
        </form>
      </div>
      {/* Image */}
      <div className="h-full w-full hidden md:block">
        <Image
          src="/images/login-img.png"
          alt="Login Image"
          width={500}
          height={500}
          className="object-cover h-full w-full"
        />
      </div>
      {/* Back Button */}
      <Link href="/" className="absolute top-10 left-5 lg:left-10">
        <Image
          src="./icons/go-back.svg"
          width={40}
          height={40}
          alt="Back Icon"
        />
      </Link>
    </div>
  );
}
