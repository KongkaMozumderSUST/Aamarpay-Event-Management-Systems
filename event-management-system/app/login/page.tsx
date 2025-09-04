"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";;
import { useRouter, redirect} from "next/navigation";
import Link from "next/link";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setError(null);
      setLoading(true);

      const user = {
            email: data.email,
            name: data.email.split("@")[0],
            password: data.password 
        };
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 max-w-sm mx-auto mt-20 shadow-xl border border-gray-300 rounded max-w-sm p-8"
    >
      <h1 className="text-center"> Login </h1>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address"
          }
        })}
        placeholder="Email"
        className="border border-gray-300 rounded p-4"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

  
      <input
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters"
          }
        })}
        type="password"
        placeholder="Password"
        className="border border-gray-300 rounded p-4"
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {errors && <p className="text-red-500">{error}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <p className="text-sm text-center">Don't have an account, <Link href="/signup" className="underline"> SignUp?</Link></p>
    </form>
  );
}
