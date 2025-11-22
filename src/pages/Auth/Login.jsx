import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { supabase } from "../../utils/supabase";
import { useNavigate, Link } from "react-router";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const onSubmit = async (data) => {
        const { data: sessionData, error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });
        if (error) {
            setError(true);
        } else {
            navigate("/dashboard");
        }
    }

    return (
        <>
            <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1">Your email</Label>
                    </div>
                    <TextInput 
                    id="email1" 
                    type="email" 
                    placeholder="name@flowbite.com" 
                    required 
                    {...register("email")} 
                    color={error ? "failure" : "gray"}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1">Your password</Label>
                    </div>
                    <TextInput 
                    id="password1" 
                    type="password" required 
                    {...register("password")} 
                    color={error ? "failure" : "gray"}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button type="submit">Iniciar sesión</Button>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">
                        Regístrate
                    </Link>
                </div>
            </form>
        </>
    )
}

export default Login