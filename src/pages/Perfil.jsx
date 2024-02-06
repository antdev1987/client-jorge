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
            <h2 className="text-[1.7rem] border-b-2 border-gray-300 mb-3 pb-2">
              Información General
            </h2>

            {/* Codigo y habilitado hasta */}
            <div className="flex justify-between gap-10 mb-4">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.codigo && (
                  <h4 className="font-[500]">
                    Código de Colegiatura:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.codigo}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[15rem]">
                {userPerfilInfo?.habilitadoHasta && (
                  <h4 className="font-[500]">
                    Habilitado hasta:{" "}
                    <span className="font-normal block text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.habilitadoHasta}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            {/* Fecha de incorporacion y tomo && folio */}
            <div className="flex justify-between gap-10 mb-4">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.fechaIncorporacion && (
                  <h4 className="font-[500]">
                    Fecha de Incorporación:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.fechaIncorporacion}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[15rem]">
                {userPerfilInfo?.tomoFolio && (
                  <h4 className="font-[500]">
                    Tomo y Folio:{" "}
                    <span className="font-normal block text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.tomoFolio}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            {/* Condicion y visible */}
            <div className="flex justify-between gap-10 mb-4">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.condicion && (
                  <h4 className="font-[500]">
                    Condición:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.condicion}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[15rem]">
                {userPerfilInfo?.visible && (
                  <h4 className="font-[500]">
                    Visible:{" "}
                    <span className="font-normal block text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.visible}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            {/* Observaciones */}
            <div className="flex justify-between gap-10 mb-6">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.observaciones && (
                  <h4 className="font-[500]">
                    Observaciones:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.observaciones}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            <h2 className="text-[1.7rem] border-b-2 border-gray-300 mb-3 pb-2">
              Datos Personales
            </h2>

            {/* Numero de documento y documento de identidad */}
            <div className="flex justify-between gap-10 mb-4">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.numeroDocIdentidad && (
                  <h4 className="font-[500]">
                    Número de Documento de Identidad:{" "}
                    <span className="font-normal block text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.numeroDocIdentidad}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[15rem]">
                {userPerfilInfo?.documentoIdentidad && (
                  <h4 className="font-[500]">
                    Documento de Identidad:{" "}
                    <span className="font-normal block text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.documentoIdentidad}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            {/* Apellido materno y apellido paterno */}
            <div className="flex justify-between gap-10 mb-4">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.apellidoPaterno && (
                  <h4 className="font-[500]">
                    Apellido Paterno:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.apellidoPaterno}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[15rem]">
                {userPerfilInfo?.apellidoMaterno && (
                  <h4 className="font-[500]">
                    Apellido Materno:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.apellidoMaterno}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            {/* Sexo y Fecha de nacimiento */}
            <div className="flex justify-between gap-10 mb-4">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.sexo && (
                  <h4 className="font-[500]">
                    Sexo:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.sexo}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[15rem]">
                {userPerfilInfo?.fechaNacimiento && (
                  <h4 className="font-[500]">
                    Fecha de Nacimiento:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.fechaNacimiento}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            {/* Direccion y urbanizacion */}
            <div className="flex justify-between gap-10 mb-4">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.direccion && (
                  <h4 className="font-[500]">
                    Dirección:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.direccion}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[15rem]">
                {userPerfilInfo?.urbanizacion && (
                  <h4 className="font-[500]">
                    Urbanización:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.urbanizacion}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            {/* Distrito y provincia */}
            <div className="flex justify-between gap-10 mb-4">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.distrito && (
                  <h4 className="font-[500]">
                    Distrito:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.distrito}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[15rem]">
                {userPerfilInfo?.provincia && (
                  <h4 className="font-[500]">
                    Provincia:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.provincia}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            {/* Departamento y pais */}
            <div className="flex justify-between gap-10 mb-4">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.departamento && (
                  <h4 className="font-[500]">
                    Departamento:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.departamento}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[15rem]">
                {userPerfilInfo?.pais && (
                  <h4 className="font-[500]">
                    País:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.pais}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            {/* Telefono 1 y telefono 2 */}
            <div className="flex justify-between gap-10 mb-4">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.telefono1WhatsApp && (
                  <h4 className="font-[500]">
                    Teléfono 1:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.telefono1WhatsApp}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[15rem]">
                {userPerfilInfo?.telefono2 && (
                  <h4 className="font-[500]">
                    Teléfono 2:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.telefono2}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            {/* Hijos menores de edad hombre y mujer */}
            <div className="flex justify-between gap-10 mb-4">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.hijosMenoresMasculino && (
                  <h4 className="font-[500]">
                    Hijos Menores Hombre(s):{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.hijosMenoresMasculino}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[15rem]">
                {userPerfilInfo?.hijosMenoresFemenino && (
                  <h4 className="font-[500]">
                    Hijos Menores Mujer(s):{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.hijosMenoresFemenino}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            {/* Deportes y pasatiempos */}
            <div className="flex justify-between gap-10 mb-6">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.deportePractica && (
                  <h4 className="font-[500]">
                    Deportes:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.deportePractica}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[15rem]">
                {userPerfilInfo?.pasaTiempos && (
                  <h4 className="font-[500]">
                    Pasatiempos:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.pasaTiempos}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            <h2 className="text-[1.7rem] border-b-2 border-gray-300 mb-3 pb-2">
              Información Acádemica
            </h2>

            {/* Universidad y titulo universitario */}
            <div className="flex justify-between gap-10 mb-4">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.universidad && (
                  <h4 className="font-[500]">
                    Universidad:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.universidad}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[15rem]">
                {userPerfilInfo?.tituloUniversitario && (
                  <h4 className="font-[500]">
                    Título Universitario:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.tituloUniversitario}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            {/* Fecha titulacion y maximo grado academico */}
            <div className="flex justify-between gap-10 mb-4">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.fechaTitulacion && (
                  <h4 className="font-[500]">
                    Fecha de Titulación:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.fechaTitulacion}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[20rem]">
                {userPerfilInfo?.maximoGradoAcademico && (
                  <h4 className="font-[500]">
                    Máximo Grado Acádemico:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.maximoGradoAcademico}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            {/* Estudios de posgrado */}
            <div className="flex justify-between gap-10 mb-6">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.estudiosPosgrado && (
                  <h4 className="font-[500]">
                    Estudios de Posgrado:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.estudiosPosgrado}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            <h2 className="text-[1.7rem] border-b-2 border-gray-300 mb-3 pb-2">
              Principal Información Laboral
            </h2>

            {/* Sector laboral y cargo */}
            <div className="flex justify-between gap-10 mb-4">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.sectorLaboral && (
                  <h4 className="font-[500]">
                    Sector:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.sectorLaboral}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[15rem]">
                {userPerfilInfo?.cargo && (
                  <h4 className="font-[500]">
                    Cargo:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.cargo}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            {/* Centro laboral y giro o rubro */}
            <div className="flex justify-between gap-10 mb-4">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.centroLaboral && (
                  <h4 className="font-[500]">
                    Centro Laboral:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.centroLaboral}
                    </span>
                  </h4>
                )}
              </div>

              <div className="max-w-[15rem]">
                {userPerfilInfo?.giroRubroCentroLaboral && (
                  <h4 className="font-[500]">
                    Giro ó Rubro:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.giroRubroCentroLaboral}
                    </span>
                  </h4>
                )}
              </div>
            </div>

            {/* Fecha de inicio */}
            <div className="flex justify-between gap-10">
              <div className="max-w-[15rem]">
                {userPerfilInfo?.fechaInicio && (
                  <h4 className="font-[500] mb-4">
                    Fecha de Inicio:{" "}
                    <span className="block font-normal text-gray-700 text-[1.2rem]">
                      {userPerfilInfo?.fechaInicio}
                    </span>
                  </h4>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perfil;
