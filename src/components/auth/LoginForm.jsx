import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbLockPassword } from "react-icons/tb";
import Button from "../ui/button/Button";
import { useUserStore } from "../../zustand/AuthUsers";
import { loginService } from "../../services/authService";

export default function LoginForm() {
  const navigate = useNavigate();

  // Zustand store
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
    cedula: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginService(formData);
      // Guarda en Zustand
      setUser(res.user);
      setToken(res.token);
      // Guarda en localStorage
      // localStorage.setItem("user", JSON.stringify(res.user));
      // localStorage.setItem("token", res.token);

      navigate("/"); // Redirige al home
    } catch (err) {
      console.log(err.response);
      alert(err.response?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md">
          Iniciar sesión
        </h1>
        <p className="text-sm text-gray-500">
          Ingresa tu CI y contraseña para acceder.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label>
              Cédula de Identidad <span className="text-error-500">*</span>
            </label>
            <input
              name="cedula"
              type="text"
              value={formData.cedula}
              onChange={handleChange}
              placeholder="Ej: 12345678"
              required
            />
          </div>

          <div>
            <label>
              Contraseña <span className="text-error-500">*</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <TbLockPassword className="fill-gray-500 size-5" />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <checkbox checked={isChecked} onChange={setIsChecked} />
            <span className="text-sm text-gray-700">Mantener sesión activa</span>
          </div>

          <Button type="submit" className="w-full" size="sm">
            Iniciar sesión
          </Button>

          <p className="mt-4 text-sm text-center text-gray-500">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
