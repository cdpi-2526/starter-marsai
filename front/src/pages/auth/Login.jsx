import { Link } from "react-router";

import { login } from "../../api/auth.js";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export function Login() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      return await login(data);
    },
    onSuccess: (data, variables, context) => {
      // If you are logged
      //
      window.location.reload();
    },
  });

  function onSubmit(data) {
    return loginMutation.mutate(data);
  }
  return (
    <>
      <h1 className="text-2xl">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" id="id" {...register("id")} />
        <label
          htmlFor="username"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Votre nom d'utilisateur"
          {...register("username")}
          required
        />

        <label
          htmlFor="password"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Votre mot de passe"
          {...register("password")}
          required
        />

        <button type="submit">Login</button>
      </form>

      <Link to="/auth/register">No account yet? Register</Link>
    </>
  );
}
