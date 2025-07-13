"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

const SignIn = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();
      if (response.ok) {
        window.localStorage.setItem("TEA_TOKEN", JSON.stringify(json.token));
        window.localStorage.setItem("TEA_USER", JSON.stringify(json.user));
        toast.success(json.message || "You're in, bestie ☕");
        router.push("/");
      } else {
        throw new Error(json.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.warn(error.message);
      } else {
        toast.warn("Something's off... try again, bestie.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='grid grid-cols-1 md:grid-cols-3 gap-10 w-full h-dvh items-start bg-bg'>
      <div className='relative w-full h-full hidden md:block'>
        <div className='absolute top-0 bottom-0 w-full h-full bg-black/40 z-10'></div>
        <Image
          alt='people'
          src='/people4.jpg'
          fill
          sizes='100vw'
          className='object-cover'
        />
      </div>

      <div className='w-full max-w-lg px-10 pt-10'>
        <form onSubmit={handleSubmit}>
          <h3 className='font-dancing-script capitalize font-semibold text-4xl text-center mb-10 text-purple-900'>
            Welcome back, bestie 💖 The tea’s still hot!
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

          <p className='text-xs text-end text-gray-600'>Forgot password?</p>

          <CustomButton
            isLoading={isLoading}
            text='Sign In'
            handleClick={() => {}}
            btnType='submit'
            styles='w-full mt-5 rounded-md bg-purple-900 text-white'
          />
        </form>

        <p className='text-center text-sm mt-6'>
          Don't have an account?{" "}
          <Link href='/sign-up' className='text-purple-900 font-semibold'>
            Sign Up
          </Link>
        </p>
      </div>

      <div className='relative w-full h-full hidden md:block'>
        <div className='absolute top-0 bottom-0 w-full h-full bg-black/40 z-10'></div>
        <Image
          alt='people'
          src='/people3.jpg'
          fill
          sizes='100vw'
          className='object-cover'
        />
      </div>
    </section>
  );
};

export default SignIn;
