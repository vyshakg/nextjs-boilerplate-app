"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { OctagonAlertIcon } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	password: z.string().min(1, "Password is required"),
});

const SignInView = () => {
	const rouer = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setError(null);
		setIsPending(true);
		await authClient.signIn.email(
			{
				email: values.email,
				password: values.password,
			},
			{
				onSuccess: () => {
					rouer.push("/dashboard");
					setIsPending(false);
				},
				onError: ({ error }) => {
					setError(error.message);
					setIsPending(false);
				},
			}
		);
	};

	return (
		<div className="flex flex-col gap-6">
			<Card className="overflow-hidden p-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
							<div className="flex flex-col gap-6">
								<div className="flex flex-col justify-center items-center">
									<h1 className="text-2xl font-bold">Welcome Back</h1>
									<p className="text-muted-foreground text-balance">Login to your account</p>
								</div>

								<div className="grid gap-3">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input placeholder="jhon.doe@exmaple.com" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-3">
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input placeholder="********" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								{!!error && ( // Replace with actual condition for showing the error
									<Alert className="bg-destructive/10 border-none">
										<OctagonAlertIcon className="h-4 w-4 mr-2 !text-destructive" />
										<AlertTitle className="text-destructive"> {error} </AlertTitle>
									</Alert>
								)}

								<Button className="w-full" type="submit" disabled={isPending}>
									Sign in
								</Button>
								<div className="after:border-border relative after:absolute after:top-1/2 after:left-0 after:w-full after:border-t after:-translate-y-1/2 flex items-center justify-center">
									<span className="bg-card text-muted-foreground relative z-10 px-2">
										Or contine with
									</span>
								</div>
								<div className="grid  grid-cols-2 gap-4">
									<Button variant="outline" className="w-full" disabled={isPending}>
										<FaGoogle className="h-4 w-4" />
									</Button>
									<Button variant="outline" className="w-full" disabled={isPending}>
										<FaGithub className="h-4 w-4" />
									</Button>
								</div>
								<div className="text-sm text-center">
									Don&apos;t have an account?{" "}
									<Link href="/sign-up" className="text-blue-500 hover:underline">
										Sign up
									</Link>
								</div>
							</div>
						</form>
					</Form>
					<div className="bg-radial from-blue-500 to-blue-800 relative md:flex flex-col hidden justify-center items-center">
						<img src="/logo.svg" alt="logo" className="h-[92px] w-[92px]" />
						<p className="text-white text-2xl font-semibold">Dhvani.AI</p>
					</div>
				</CardContent>
			</Card>
			<div>
				<p className="text-xs text-muted-foreground text-center">
					By clicking &quot;Sign in&quot;, you agree to our{" "}
					<Link href="#" className="underline hover:text-blue-500">
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link href="#" className="underline hover:text-blue-500">
						Privacy Policy
					</Link>
					.
				</p>
			</div>
		</div>
	);
};

export default SignInView;
