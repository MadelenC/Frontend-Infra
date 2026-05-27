import React, { useState, useEffect } from "react";
import { useUserStore } from "../../../zustand/userStore";
import { useEntidadStore } from "../../../zustand/useEntidadStore";
import { VscCheck } from "react-icons/vsc";
import { LuTrash2 } from "react-icons/lu";
import { toast } from "react-toastify";

export default function EditUserForm({ user, onUpdate, onDelete, onClose }) {
  const { updateUser } = useUserStore();
  const { entidades } = useEntidadStore();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    password: "",
    email: "",
    cedula: "",
    celular: "",
    tipo: "",
  });

  const [userEntities, setUserEntities] = useState({
    facultad: "",
    carrera: "",
    materia: "",
    sigla: "",
  });

  
  useEffect(() => {
    if (!user) return;

    setFormData({
      nombres: user.nombres || "",
      apellidos: user.apellidos || "",
      password: "",
      email: user.email || "",
      cedula: user.cedula || "",
      celular: user.celular || "",
      tipo: user.tipo || "",
    });

    const ent = user.entidades || [];

    setUserEntities({
      facultad: ent.find(e => e.facultad)?.facultad || "",
      carrera: ent.find(e => e.carrera)?.carrera || "",
      materia: ent.find(e => e.materia)?.materia || "",
      sigla: ent.find(e => e.sigla)?.sigla || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await updateUser(user.id, {
        ...formData,
        password: formData.password || undefined,
        entidades: [
          {
            facultad: userEntities.facultad || null,
            carrera: userEntities.carrera || null,
            materia: userEntities.materia || null,
            sigla: userEntities.sigla || null,
          },
        ],
      });

      if (result.ok) {
        toast.success("Actualización correcta");

       
        onUpdate?.();

        onClose?.();
      } else {
        toast.error(result.error || "Error al actualizar");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar usuario");
    }
  };

 
  const handleDelete = async () => {
    try {
      await onDelete?.();
      toast.success("Usuario eliminado");
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar usuario");
    }
  };

  return (
    
        <form
      onSubmit={handleSubmit}
      className="w-full dark:text-gray-200"
    >
 
        <div className="grid grid-cols-2 gap-4">

          <div className="flex flex-col">
            <label className="text-xs font dark:text-gray-300">Nombre</label>
            <input
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              className="border p-2 rounded text-sm  dark:bg-gray-200/40 dark:border-gray-200" 
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font dark:text-gray-300">Apellido</label>
            <input
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              className="border p-2 rounded text-sm  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font dark:text-gray-300 ">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 rounded text-sm  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font dark:text-gray-300">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded text-sm  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font dark:text-gray-300">Cédula</label>
            <input
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              className="border p-2 rounded text-sm  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font dark:text-gray-300">Celular</label>
            <input
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              className="border p-2 rounded text-sm  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font dark:text-gray-300">Tipo</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="border p-2 rounded text-sm bg-white  dark:bg-gray-200/40 dark:border-gray-200"
            >
              <option value="">Seleccione...</option>
              <option value="encargado">Encargado</option>
              <option value="administrador">Administrador</option>
              <option value="chofer">Chofer</option>
              <option value="supervisor">Supervisor</option>
              <option value="mecanico">Mecánico</option>
              <option value="mensajero">Mensajero</option>
            </select>
          </div>
        </div>

        
        <div className="grid grid-cols-2 gap-4 pt-4">

          <div className="flex flex-col">
            <label className="text-xs font dark:text-gray-300">Facultad</label>
            <input
              value={userEntities.facultad}
              onChange={(e) =>
                setUserEntities((p) => ({ ...p, facultad: e.target.value }))
              }
              className="border p-2 rounded text-sm  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font dark:text-gray-300">Carrera</label>
            <input
              value={userEntities.carrera}
              onChange={(e) =>
                setUserEntities((p) => ({ ...p, carrera: e.target.value }))
              }
              className="border p-2 rounded text-sm  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">

          <div className="flex flex-col">
            <label className="text-xs font dark:text-gray-300">Materia</label>
            <input
              value={userEntities.materia}
              onChange={(e) =>
                setUserEntities((p) => ({ ...p, materia: e.target.value }))
              }
              className="border p-2 rounded text-sm  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font dark:text-gray-300">Sigla</label>
            <input
              value={userEntities.sigla}
              onChange={(e) =>
                setUserEntities((p) => ({ ...p, sigla: e.target.value }))
              }
              className="border p-2 rounded text-sm  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>
        </div>

   
        <div className="flex justify-center gap-4 mt-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md
                        transition transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
      
              Actualizar
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md
                        transition transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              
              Eliminar
            </button>
          </div>

      </form>
    
  );
}




























