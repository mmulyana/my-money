"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/utils/auth-client";
import type { ErrorContext } from "better-auth/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ButtonSubmit from "@/components/common/button-submit";
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from "../schema";

export default function FormLoginRegister({
  variant,
}: {
  variant: "login" | "register";
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(variant === "login" ? loginSchema : registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (payload: any) => {
    if (variant === "login") {
      await authClient.signIn.email(
        {
          email: payload.email,
          password: payload.password,
        },
        {
          onRequest: () => {
            setIsPending(true);
          },
          onSuccess: () => {
            router.push("/dashboard");
          },
          onError: (ctx: ErrorContext) => {
            toast.error((ctx.error?.code as string) ?? "Something went wrong", {
              description: ctx.error.message ?? "Something went wrong.",
            });
          },
        },
      );
      setIsPending(false);

      return;
    }
    await authClient.signUp.email(
      {
        email: payload.email,
        password: payload.password,
        name: payload.name,
      },
      {
        onRequest: () => setIsPending(true),
        onSuccess: () => {
          toast.success("Account created");
          router.push("/login");
        },
        onError: (ctx) => {
          toast.error("Something went wrong", {
            description: ctx.error.message ?? "",
          });
        },
      },
    );
    setIsPending(false);
  };

  return (
    <Card className="mx-auto mt-10 w-full max-w-md rounded-2xl p-4 shadow-xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          {variant === "login" ? "Login" : "Register"}
        </CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {variant === "register" && (
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="mt-4 mb-6 flex flex-col gap-2">
            <ButtonSubmit
              className="w-full"
              isPending={isPending}
              title={variant === "login" ? "Login" : "Register"}
            />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
