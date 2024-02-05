import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getError } from "../utils/getError";
import { toast } from "react-toastify";
import axios from "axios";

import UserAvatar from "../images/user-avatar.png";
import AppContext from "../context/AppProvider";

const Perfil = () => {
  const { userInfo } = useContext(AppContext);
  const [userPerfilInfo, setUserPerfilInfo] = useState();
  const navigate = useNavigate();
  const params = useParams();

  console.log(userPerfilInfo);

  useEffect(() => {
    const fetchPerfilData = async () => {
      try {
        if (params?.perfilId) {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/perfil/${params?.perfilId}`
          );
          return setUserPerfilInfo(data);
        }
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/perfil`
        );
        setUserPerfilInfo(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };

    fetchPerfilData();
  }, [params?.perfilId]);

  const handleEliminarUsuario = async () => {
    const confirmDelete = confirm("Deseas eliminar este usuario?");

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/users/perfil-eliminar-admin/${
          params.perfilId
        }`
      );
      navigate("/gestionar-usuarios");
      toast.success("Eliminado exitosamente!");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <section className="container max-w-[1200px] mx-auto my-10">
      {userInfo.isAdmin && params.perfilId && (
        <h2
          className="px-4 pb-3 font-bold cursor-pointer"
          onClick={() => navigate(-1)}
        >
          {"< Volver Atrás"}
        </h2>
      )}

      <div className="lg:flex items-start gap-10 px-4">
        <div className="border-gray-300 border p-7 shadow-lg shadow-black/35  rounded">
          <div className="text-xl text-center">
            <div>
              <img
                className="w-[5rem] h-[5rem] mx-auto rounded-full object-cover"
                src={
                  userPerfilInfo?.perfilImagen ||
                  userInfo?.perfilImagen ||
                  UserAvatar
                }
              />
            </div>

            <div className="my-2">
              <h2 className="font-bold">
                {userPerfilInfo?.primerNombre} {userPerfilInfo?.segundoNombre}
              </h2>
              <h2 className="font-bold">{userPerfilInfo?.email}</h2>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4">
            <button
              className="text-[1.1rem] bg-blue-600 text-white px-2 py-1 rounded font-bold block"
              type="button"
              onClick={() =>
                navigate("/editar-perfil", { state: userPerfilInfo })
              }
            >
              Editar Perfil
            </button>

            {userInfo.isAdmin && params.perfilId && (
              <button
                onClick={handleEliminarUsuario}
                className="bg-red-600 text-[1.1rem] text-white px-2 py-1 rounded font-bold block"
              >
                Eliminar
              </button>
            )}
          </div>
        </div>

        <div className="flex-col sm:flex-row sm:text-start text-center flex justify-center sm:gap-16 text-xl mt-7">
          <div>
            {userPerfilInfo?.fechaNacimiento && (
              <h4 className="font-bold mb-4">
                Fecha de Nacimiento:{" "}
                <span className="block font-normal ms-5">
                  {userPerfilInfo?.fechaNacimiento}
                </span>
              </h4>
            )}
            {userPerfilInfo?.sexo && (
              <h4 className="font-bold">
                Sexo:{" "}
                <span className="block font-normal ms-5">
                  {userPerfilInfo?.sexo}
                </span>
              </h4>
            )}
            {userPerfilInfo?.documentoIdentidad && (
              <h4 className="font-bold mt-4">
                Documento de Identidad:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.documentoIdentidad}
                </span>
              </h4>
            )}
            {userPerfilInfo?.cargo && (
              <h4 className="font-bold mt-4">
                Cargo:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.cargo}
                </span>
              </h4>
            )}
            {userPerfilInfo?.codigo && (
              <h4 className="font-bold mt-4">
                Código:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.codigo}
                </span>
              </h4>
            )}
            {userPerfilInfo?.direccion && (
              <h4 className="font-bold mt-4">
                Dirección:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.direccion}
                </span>
              </h4>
            )}
            {userPerfilInfo?.distrito && (
              <h4 className="font-bold mt-4">
                Distrito:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.distrito}
                </span>
              </h4>
            )}
            {userPerfilInfo?.hijosMenoresMasculino && (
              <h4 className="font-bold mt-4">
                Hijos Menores Masculino:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.hijosMenoresMasculino}
                </span>
              </h4>
            )}
            pagina-principal
            {userPerfilInfo?.provincia && (
              <h4 className="font-bold mt-4">
                Provincia:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.provincia}
                </span>
              </h4>
            )}
            {userPerfilInfo?.telefono1WhatsApp && (
              <h4 className="font-bold mt-4">
                Teléfono 1 WhatsApp:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.telefono1WhatsApp}
                </span>
              </h4>
            )}
            {userPerfilInfo?.sectorLaboral && (
              <h4 className="font-bold mt-4">
                Sector Laboral:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.sectorLaboral}
                </span>
              </h4>
            )}
          </div>

          <div>
            {userPerfilInfo?.apellidoPaterno && (
              <h4 className="font-bold">
                Apellido Paterno:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.apellidoPaterno}
                </span>
              </h4>
            )}

            {userPerfilInfo?.apellidoMaterno && (
              <h4 className="font-bold mt-4">
                Apellido Materno:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.apellidoMaterno}
                </span>
              </h4>
            )}

            {userPerfilInfo?.numeroDocIdentidad && (
              <h4 className="font-bold mt-4">
                Número de Documento de Identidad:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.numeroDocIdentidad}
                </span>
              </h4>
            )}

            {userPerfilInfo?.centroLaboral && (
              <h4 className="font-bold mt-4">
                Centro Laboral:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.centroLaboral}
                </span>
              </h4>
            )}

            {userPerfilInfo?.departamento && (
              <h4 className="font-bold mt-4">
                Departamento:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.departamento}
                </span>
              </h4>
            )}

            {userPerfilInfo?.deportePractica && (
              <h4 className="font-bold mt-4">
                Deporte Practica:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.deportePractica}
                </span>
              </h4>
            )}

            {userPerfilInfo?.giroRubroCentroLaboral && (
              <h4 className="font-bold mt-4">
                Giro Rubro Centro Laboral:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.giroRubroCentroLaboral}
                </span>
              </h4>
            )}

            {userPerfilInfo?.hijosMenoresFemenino && (
              <h4 className="font-bold mt-4">
                Hijos Menores Femenino:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.hijosMenoresFemenino}
                </span>
              </h4>
            )}

            {userPerfilInfo?.telefono2 && (
              <h4 className="font-bold mt-4">
                Teléfono 2:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.telefono2}
                </span>
              </h4>
            )}

            {userPerfilInfo?.fechaNacimiento && (
              <h4 className="font-bold mt-4">
                Fecha de Nacimiento:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.fechaNacimiento}
                </span>
              </h4>
            )}

            {userPerfilInfo?.urbanizacion && (
              <h4 className="font-bold mt-4">
                Urbanizacion:{" "}
                <span className="font-normal block ms-5">
                  {userPerfilInfo?.urbanizacion}
                </span>
              </h4>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perfil;
