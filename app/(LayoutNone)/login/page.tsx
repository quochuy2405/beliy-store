"use client";
import { Login } from "@/components/templates";
import { loginSchema } from "@/utils/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const LoginPage = () => {
	const methods = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(loginSchema),
	});

	const handleSubmit = (data) => {
		console.log(data);
	};
	const props = {
		methods,
		handleSubmit,
	};
	return <Login {...props} />;
};

export default LoginPage;
