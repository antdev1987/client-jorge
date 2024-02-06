import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getError } from "../utils/getError";
import { toast } from "react-toastify";
import axios from "axios";

import UserAvatar from "../images/user-avatar.png";
import AppContext from "../context/AppProvider";
import formatDateSinHora from "../utils/formatDateSinHora";

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
      {params?.perfilId && userInfo.isAdmin && (
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

            {params?.perfilId && userInfo.isAdmin && (
              <button
                onClick={handleEliminarUsuario}
                className="bg-red-600 text-[1.1rem] text-white px-2 py-1 rounded font-bold block"
              >
                Eliminar
              </button>
            )}
          </div>
        </div>

        <div className="flex-col sm:flex-row md:text-start text-center flex justify-center sm:gap-16 text-xl mt-7">
          <div>
            <h2 className="text-[1.7rem] border-b-2 border-gray-300 mb-3 pb-2">
              Información General
            </h2>

            {/* Codigo y habilitado hasta */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-4">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Código de Colegiatura:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.codigo || "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  Habilitado hasta:{" "}
                  <span className="font-normal block text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.habilitadoHasta
                      ? formatDateSinHora(userPerfilInfo?.habilitadoHasta)
                      : "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Fecha de incorporacion y tomo && folio */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-4">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Fecha de Incorporación:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.fechaIncorporacion
                      ? formatDateSinHora(userPerfilInfo?.fechaIncorporacion)
                      : "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  Tomo y Folio:{" "}
                  <span className="font-normal block text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.tomoFolio || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Condicion y visible */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-4">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Condición:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.condicion || "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  Visible:{" "}
                  <span className="font-normal block text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.visible || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Observaciones */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-6">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Observaciones:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.observaciones || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            <h2 className="text-[1.7rem] border-b-2 border-gray-300 mb-3 pb-2">
              Datos Personales
            </h2>

            {/* Numero de documento y documento de identidad */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-4">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Número de Documento de Identidad:{" "}
                  <span className="font-normal block text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.numeroDocIdentidad || "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  Documento de Identidad:{" "}
                  <span className="font-normal block text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.documentoIdentidad || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Apellido materno y apellido paterno */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-4">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Apellido Paterno:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.apellidoPaterno || "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  Apellido Materno:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.apellidoMaterno || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Sexo y Fecha de nacimiento */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-4">
              
              <div className="flex-1">
                <h4 className="font-[500]">
                  Sexo:{" "}
                  <span className="md:block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.sexo || "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  Fecha de Nacimiento:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.fechaNacimiento
                      ? formatDateSinHora(userPerfilInfo?.fechaNacimiento)
                      : "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Direccion y urbanizacion */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-4">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Dirección:{" "}
                  <span className="md:block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.direccion || "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  Urbanización:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.urbanizacion || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Distrito y provincia */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-4">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Distrito:{" "}
                  <span className="md:block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.distrito || "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  Provincia:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.provincia || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Departamento y pais */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-4">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Departamento:{" "}
                  <span className="md:block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.departamento || "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  País:{" "}
                  <span className="md:block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.pais || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Telefono 1 y telefono 2 */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-4">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Teléfono 1:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.telefono1WhatsApp || "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  Teléfono 2:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.telefono2 || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Hijos menores de edad hombre y mujer */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-4">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Hijos Menores Hombre(s):{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.hijosMenoresMasculino || "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  Hijos Menores Mujer(s):{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.hijosMenoresFemenino || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Deportes y pasatiempos */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-6">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Deportes:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.deportePractica || "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  Pasatiempos:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.pasaTiempos || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            <h2 className="text-[1.7rem] border-b-2 border-gray-300 mb-3 pb-2">
              Información Académica
            </h2>

            {/* Universidad y titulo universitario */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-4">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Universidad:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.universidad || "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  Título Universitario:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.tituloUniversitario || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Fecha titulacion y maximo grado academico */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-4">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Fecha de Titulación:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.fechaTitulacion
                      ? formatDateSinHora(userPerfilInfo?.fechaTitulacion)
                      : "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  Máximo Grado Académico:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.maximoGradoAcademico || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Estudios de posgrado */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-6">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Estudios de Posgrado:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.estudiosPosgrado || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            <h2 className="text-[1.7rem] border-b-2 border-gray-300 mb-3 pb-2">
              Principal Información Laboral
            </h2>

            {/* Sector laboral y cargo */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-4">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Sector:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.sectorLaboral || "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  Cargo:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.cargo || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Centro laboral y giro o rubro */}
            <div className="flex justify-between gap-10 md:flex-row flex-col mb-4">
              <div className="flex-1">
                <h4 className="font-[500]">
                  Centro Laboral:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.centroLaboral || "No hay dato"}
                  </span>
                </h4>
              </div>

              <div className="flex-1">
                <h4 className="font-[500]">
                  Giro ó Rubro:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.giroRubroCentroLaboral || "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>

            {/* Fecha de inicio */}
            <div className="flex justify-between gap-10 md:flex-row flex-col">
              <div className="flex-1">
                <h4 className="font-[500] mb-4">
                  Fecha de Inicio:{" "}
                  <span className="block font-normal text-gray-700 text-[1.2rem]">
                    {userPerfilInfo?.fechaInicio
                      ? formatDateSinHora(userPerfilInfo?.fechaInicio)
                      : "No hay dato"}
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perfil;
