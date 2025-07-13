"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import Image from "next/image";

const SignUp = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (response.ok) {
        router.push("/");
      } else {
        setErrorMessage(json.message || "Registration failed");
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className=' grid grid-cols-1 md:grid-cols-3 gap-10 justify-center items-center w-full h-dvh '>
      <section className='relative w-full h-full hidden md:block'>
        <div className='absolute top-0 bottom-o w-full h-full bg-black/40 z-10'></div>

        <Image
          alt='people'
          src='/people4.jpg'
          fill
          sizes='100vw'
          className='object-cover'
        />
      </section>
      <section className='w-full h-full max-w-lg px-10 pt-10'>
        <form onSubmit={handleSubmit}>
          <h3 className='font-mono capitalize font-semibold text-4xl text-center mb-10 text-pink-700'>
            Welcome to the Tea Spot
          </h3>

          <CustomInput
            styles='bg-transparent h-12 border-gray-300 rounded-sm'
            type='text'
            isPassword={false}
            placeholder='Enter your username'
            setValue={(val) =>
              setFormData((p) => ({ ...p, username: val as string }))
            }
          />
          <CustomInput
            styles='bg-transparent h-12 border-gray-300 rounded-sm'
            type='password'
            placeholder='Enter your password'
            showPassword={showPassword}
            isPassword={true}
            setValue={(val) =>
              setFormData((p) => ({ ...p, password: val as string }))
            }
            setShowPassword={setShowPassword}
          />

          {errorMessage && (
            <p className='text-red-500 text-sm mt-2'>{errorMessage}</p>
          )}

          <p className='text-xs text-end text-gray-600'>Forgot password?</p>

          <CustomButton
            isLoading={isLoading}
            text='Sign Up'
            handleClick={() => {}}
            btnType='submit'
            styles='w-full mt-5 rounded-md bg-pink-700 text-white'
          />
        </form>

        <p className='text-center text-sm mt-6'>
          Already have an account?{" "}
          <Link href='/signin' className='text-pink-700'>
            Log in
          </Link>
        </p>
      </section>
      <section className='relative w-full h-full md:block hidden'>
        <div className='absolute top-0 bottom-o w-full h-full bg-black/40 z-10'></div>

        <Image
          alt='people'
          src='/people3.jpg'
          fill
          sizes='100vw'
          className='object-cover'
        />
      </section>
    </section>
  );
};

export default SignUp;
