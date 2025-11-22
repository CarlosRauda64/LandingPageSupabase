import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { supabase } from "../../utils/supabase";
import { useNavigate, Link } from "react-router";

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const password = watch("password");

    const onSubmit = async (data) => {
        setError(null);
        setLoading(true);

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.full_name,
                    }
                }
            });

            if (authError) {
                setError(authError.message);
                setLoading(false);
                return;
            }

            // El trigger automático creará el perfil en public.profiles
            // Si necesitas confirmación de email, el usuario será redirigido
            // Si no, puede iniciar sesión inmediatamente
            if (authData.user) {
                // Opción 1: Si no requiere confirmación de email, redirige al login
                navigate("/login", { 
                    state: { message: "Registro exitoso. Por favor inicia sesión." } 
                });
                
                // Opción 2: Si quieres iniciar sesión automáticamente (descomenta esto y comenta lo anterior)
                // navigate("/");
            }
        } catch (err) {
            setError(err.message || "Error al registrar usuario");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Crear cuenta
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Regístrate para comenzar
                </p>
            </div>

            <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="full_name">Nombre completo</Label>
                    </div>
                    <TextInput 
                        id="full_name" 
                        type="text" 
                        placeholder="Juan Pérez" 
                        required 
                        {...register("full_name", { 
                            required: "El nombre completo es requerido",
                            minLength: {
                                value: 2,
                                message: "El nombre debe tener al menos 2 caracteres"
                            }
                        })} 
                        color={errors.full_name || error ? "failure" : "gray"}
                    />
                    {errors.full_name && (
                        <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
                    )}
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email">Correo electrónico</Label>
                    </div>
                    <TextInput 
                        id="email" 
                        type="email" 
                        placeholder="nombre@ejemplo.com" 
                        required 
                        {...register("email", {
                            required: "El correo electrónico es requerido",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Correo electrónico inválido"
                            }
                        })} 
                        color={errors.email || error ? "failure" : "gray"}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password">Contraseña</Label>
                    </div>
                    <TextInput 
                        id="password" 
                        type="password" 
                        required 
                        {...register("password", {
                            required: "La contraseña es requerida",
                            minLength: {
                                value: 6,
                                message: "La contraseña debe tener al menos 6 caracteres"
                            }
                        })} 
                        color={errors.password || error ? "failure" : "gray"}
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    </div>
                    <TextInput 
                        id="confirmPassword" 
                        type="password" 
                        required 
                        {...register("confirmPassword", {
                            required: "Por favor confirma tu contraseña",
                            validate: value => value === password || "Las contraseñas no coinciden"
                        })} 
                        color={errors.confirmPassword || error ? "failure" : "gray"}
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                </div>

                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        {error}
                    </div>
                )}

                <Button type="submit" disabled={loading}>
                    {loading ? "Registrando..." : "Registrarse"}
                </Button>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
                        Inicia sesión
                    </Link>
                </div>
            </form>
        </>
    );
};

export default Register;

