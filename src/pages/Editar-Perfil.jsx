import { useLocation, useNavigate } from "react-router-dom";
import SelectForm from "../components/SelectForm";
import InputForm from "../components/InputForm";
import AppContext from "../context/AppProvider";
import { getError } from "../utils/getError";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const EditarPerfil = () => {
  const { userInfo } = useContext(AppContext);
  const location = useLocation();
  const [sectorLaboral, setSectorLaboral] = useState(
    location.state?.sectorLaboral
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEditarPerfil = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const userData = {
      direccion: formData.get("direccion"),
      urbanizacion: formData.get("urbanizacion"),
      distrito: formData.get("distrito"),
      provincia: formData.get("provincia"),
      departamento: formData.get("departamento"),
      telefono1WhatsApp: formData.get("telefono1WhatsApp"),
      telefono2: formData.get("telefono2"),
      sectorLaboral: formData.get("sectorLaboral"),
      cargo: formData.get("cargo"),
      centroLaboral: formData.get("centroLaboral"),
      giroRubroCentroLaboral: formData.get("giroRubroCentroLaboral"),
      hijosMenoresMasculino: formData.get("hijosMenoresMasculino"),
      hijosMenoresFemenino: formData.get("hijosMenoresFemenino"),

      deportePractica: formData.get("deportePractica"),
      pasaTiempos: formData.get("pasaTiempos"),
      universidad: formData.get("universidad"),
      tituloUniversitario: formData.get("tituloUniversitario"),
      fechaTitulacion: formData.get("fechaTitulacion"),
      estudiosPosgrado: formData.get("estudiosPosgrado"),
      fechaInicio: formData.get("fechaInicio"),
      maximoGradoAcademico: formData.get("maximoGradoAcademico"),
    };

    try {
      setLoading(true);
      if (userInfo.isAdmin) {
        userData.documentoIdentidad = formData.get("documentoIdentidad");
        userData.numeroDocIdentidad = formData.get("numeroDocIdentidad");
        userData.codigo = formData.get("codigo");
        userData.primerNombre = formData.get("primerNombre");
        userData.segundoNombre = formData.get("segundoNombre");
        userData.apellidoPaterno = formData.get("apellidoPaterno");
        userData.apellidoMaterno = formData.get("apellidoMaterno");
        userData.email = formData.get("email");
        userData.sexo = formData.get("sexo");
        userData.perfilImagen = formData.get("perfilImagen");
        userData.fechaNacimiento = formData.get("fechaNacimiento");

        userData.fechaIncorporacion = formData.get("fechaIncorporacion");
        userData.habilitadoHasta = formData.get("habilitadoHasta");
        userData.visible = formData.get("visible");
        userData.condicion = formData.get("condicion");
        userData.tomoFolio = formData.get("tomoFolio");
        userData.observaciones = formData.get("observaciones");

        console.log(userData);
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/users/perfil-editar-admin/${
            location.state._id
          }`,
          userData
        );
        navigate(`/perfil/${location.state._id}`, { state: location.state });
      } else {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/users/perfil`,
          userData
        );
        navigate("/perfil");
      }

      toast.success("Editado exitosamente!");
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="container max-w-[75rem] mx-auto my-16 px-5">
        <h3
          className="mb-7 font-bold cursor-pointer"
          onClick={() => navigate(-1, { state: location.state })}
        >
          {"< Volver Atrás"}
        </h3>

        <form
          className="md:flex items-start gap-8"
          onSubmit={handleEditarPerfil}
        >
          <div>
            <img
              src={location.state?.perfilImagen}
              className="max-w-[15rem] md:mx-0 mx-auto rounded object-cover"
            />
          </div>

          <div>
            <h2 className="text-[1.7rem] mb-2 text-center">
              Información General
            </h2>

            {/* CODIGO DE COLEGIATURA */}
            <div className="flex-1 mb-5">
              <InputForm
                labelText={"Código de Colegiatura"}
                inputProps={{
                  disabled: !userInfo.isAdmin,
                  defaultValue: location.state?.codigo,
                  type: "number",
                  placeholder: "123456",
                  name: "codigo",
                }}
              />
            </div>

            {/* FECHA DE INCORPORACION y HABILITADO HASTA */}
            <div className="md:flex-row flex-col flex gap-7 mb-5">
              <div className="flex-1">
                <InputForm
                  labelText={"Fecha de Incorporación:"}
                  inputProps={{
                    disabled: !userInfo.isAdmin,
                    type: "date",
                    defaultValue: location.state?.fechaIncorporacion,
                    name: "fechaIncorporacion",
                  }}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Habilitado hasta:"}
                  inputProps={{
                    disabled: !userInfo.isAdmin,
                    defaultValue: location.state?.habilitadoHasta,
                    type: "date",
                    name: "habilitadoHasta",
                  }}
                />
              </div>
            </div>

            {/* Tomo y Folio, Condicion */}
            <div className="md:flex-row flex-col flex gap-7 mb-5">
              <div className="flex-1">
                <InputForm
                  labelText={"Tomo y Folio:"}
                  inputProps={{
                    disabled: !userInfo.isAdmin,
                    defaultValue: location.state?.tomoFolio,
                    type: "text",
                    name: "tomoFolio",
                  }}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Condición:"}
                  inputProps={{
                    disabled: !userInfo.isAdmin,
                    type: "text",
                    defaultValue: location.state?.condicion,
                    name: "condicion",
                  }}
                />
              </div>
            </div>

            {/* Visible y Observaciones */}
            <div className="md:flex-row flex-col flex gap-7">
              {!userInfo.isAdmin ? null : (
                <>
                  <div className="flex-1">
                    <SelectForm
                      textDefault={"Seleccione Estado"}
                      labelText={"Visible"}
                      options={[
                        { value: "Sí", text: "Sí" },
                        { value: "No", text: "No" },
                      ]}
                      defaultValue={location.state?.visible}
                      disabled={!userInfo.isAdmin}
                      selectName="visible"
                    />
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="observaciones"
                      className="text-black font-medium"
                    >
                      Observaciones
                    </label>
                    <textarea
                      defaultValue={location.state?.observaciones}
                      name="observaciones"
                      id="observaciones"
                      className="w-full outline-none block border border-gray-700 px-3 mt-1 rounded-sm pt-1 disabled:opacity-90"
                    ></textarea>
                  </div>
                </>
              )}
            </div>

            <h2 className="text-[1.7rem] mt-5 text-center">Datos Personales</h2>

            {/* FOTO || IMAGEN */}
            <div className="flex-1 mb-5">
              {!userInfo.isAdmin ? null : (
                <InputForm
                  labelText={"Imagen"}
                  inputProps={{
                    disabled: !userInfo.isAdmin,
                    type: "text",
                    defaultValue: location.state?.perfilImagen,
                    placeholder: "Imagen",
                    name: "perfilImagen",
                  }}
                />
              )}
            </div>

            {/* DOCUMENTO ID Y NUMERO DE DOCUMENTO */}
            <div className="md:flex-row flex-col flex gap-7 mb-4">
              <div className="flex-1">
                <SelectForm
                  textDefault={"Seleccione Documento de ID"}
                  labelText={"Documento de Identidad"}
                  options={[
                    { value: "dni", text: "DNI" },
                    { value: "cd", text: "CE" },
                    { value: "otro", text: "OTRO" },
                  ]}
                  defaultValue={location.state?.documentoIdentidad}
                  required={true}
                  selectName="documentoIdentidad"
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Número de Documento de Identidad"}
                  inputProps={{
                    disabled: !userInfo.isAdmin,
                    defaultValue: location.state?.numeroDocIdentidad,
                    type: "text",
                    placeholder: "A1111111111C",
                    name: "numeroDocIdentidad",
                  }}
                />
              </div>
            </div>

            {/* PRIMER NOMBRE Y SEGUNDO NOMBRE */}
            <div className="md:flex-row flex-col flex gap-7 mb-4">
              <div className="flex-1">
                <InputForm
                  labelText={"Primer Nombre"}
                  inputProps={{
                    disabled: !userInfo.isAdmin,
                    type: "text",
                    placeholder: "Primer Nombre",
                    defaultValue: location.state?.primerNombre,
                    name: "primerNombre",
                    required: userInfo.isAdmin,
                  }}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Segundo Nombre"}
                  inputProps={{
                    disabled: !userInfo.isAdmin,
                    type: "text",
                    placeholder: "Segundo Nombre",
                    defaultValue: location.state?.segundoNombre,
                    name: "segundoNombre",
                  }}
                />
              </div>
            </div>

            {/* APELLIDO PATERNO Y APELLIDO MATERNO */}
            <div className="md:flex-row flex-col flex gap-7 mb-4">
              <div className="flex-1">
                <InputForm
                  labelText={"Apellido Paterno"}
                  inputProps={{
                    disabled: !userInfo.isAdmin,
                    type: "text",
                    placeholder: "Apellido Paterno",
                    defaultValue: location.state?.apellidoPaterno,
                    name: "apellidoPaterno",
                  }}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Apellido Materno"}
                  inputProps={{
                    disabled: !userInfo.isAdmin,
                    type: "text",
                    placeholder: "Apellido Materno",
                    defaultValue: location.state?.apellidoMaterno,
                    name: "apellidoMaterno",
                  }}
                />
              </div>
            </div>

            {/* SEXO Y FECHA DE NACIMIENTO */}
            <div className="md:flex-row flex-col flex gap-7 mb-4">
              <div className="flex-1">
                <SelectForm
                  textDefault={"Seleccione Sexo"}
                  labelText={"Sexo"}
                  options={[
                    { value: "hombre", text: "Hombre" },
                    { value: "mujer", text: "Mujer" },
                  ]}
                  defaultValue={location.state?.sexo}
                  disabled={!userInfo.isAdmin}
                  selectName="sexo"
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Fecha de Nacimiento"}
                  inputProps={{
                    disabled: !userInfo.isAdmin,
                    type: "date",
                    placeholder: "Fecha de Nacimiento",
                    defaultValue: location.state?.fechaNacimiento,
                    name: "fechaNacimiento",
                  }}
                />
              </div>
            </div>

            {/* DIRECCION Y URBANIZACION */}
            <div className="md:flex-row flex-col flex gap-7 mb-4">
              <div className="flex-1">
                <InputForm
                  labelText={"Dirección"}
                  inputProps={{
                    type: "text",
                    placeholder: "Dirección",
                    name: "direccion",
                    defaultValue: location.state?.direccion,
                  }}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Urbanización"}
                  inputProps={{
                    type: "text",
                    placeholder: "Urbanización",
                    name: "urbanizacion",
                    defaultValue: location.state?.urbanizacion,
                  }}
                />
              </div>
            </div>

            {/* DISTRITO, PROVINCIA, DEPARTAMENTO, PAIS */}
            <div className="md:flex-row flex-col flex gap-7 mb-4">
              <div className="flex-1">
                <InputForm
                  labelText={"Distrito"}
                  inputProps={{
                    type: "text",
                    placeholder: "Distrito",
                    name: "distrito",
                    defaultValue: location.state?.distrito,
                  }}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Provincia"}
                  inputProps={{
                    type: "text",
                    placeholder: "Provincia",
                    name: "provincia",
                    defaultValue: location.state?.provincia,
                  }}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Departamento"}
                  inputProps={{
                    type: "text",
                    placeholder: "Departamento",
                    name: "departamento",
                    defaultValue: location.state?.departamento,
                  }}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"País"}
                  inputProps={{
                    disabled: !userInfo.isAdmin,
                    type: "text",
                    defaultValue: location.state?.pais,
                    placeholder: "País",
                    name: "pais",
                  }}
                />
              </div>
            </div>

            {/* TELEFONO 1 Y TELEFONO 2 */}
            <div className="md:flex-row flex-col flex gap-7 mb-4">
              <div className="flex-1">
                <InputForm
                  labelText={"Teléfono 1 (WhatsApp)"}
                  inputProps={{
                    type: "number",
                    placeholder: "Teléfono 1 (WhatsApp)",
                    name: "telefono1WhatsApp",
                    defaultValue: location.state?.telefono1WhatsApp,
                  }}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Teléfono 2"}
                  inputProps={{
                    type: "number",
                    placeholder: "Teléfono 2",
                    name: "telefono2",
                    defaultValue: location.state?.telefono2,
                  }}
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="md:flex-row flex-col flex gap-7 mb-4">
              <div className="flex-1">
                <InputForm
                  labelText={"Email"}
                  inputProps={{
                    disabled: !userInfo.isAdmin,
                    type: "email",
                    defaultValue: location.state?.email,
                    placeholder: "Correo Electrónico",
                    name: "email",
                    required: userInfo.isAdmin,
                  }}
                />
              </div>
            </div>

            {/* HIJOS O HIJAS MENORES DE EDAD */}
            <div className="md:flex-row flex-col flex gap-7 mb-4">
              <div className="flex-1">
                <InputForm
                  labelText={"Hijos menores de edad hombre(s)"}
                  inputProps={{
                    type: "number",
                    placeholder: "Hijos menores de edad hombre(s)",
                    name: "hijosMenoresMasculino",
                    defaultValue: location.state?.hijosMenoresMasculino,
                  }}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Hijos menores de edad mujer(es)"}
                  inputProps={{
                    type: "number",
                    placeholder: "Hijos menores de edad mujer(es)",
                    name: "hijosMenoresFemenino",
                    defaultValue: location.state?.hijosMenoresFemenino,
                  }}
                />
              </div>
            </div>

            {/* DEPORTES Y PASATIEMPOS */}
            <div className="md:flex-row flex-col flex gap-7">
              <div className="flex-1">
                <InputForm
                  labelText={"Deportes"}
                  inputProps={{
                    type: "text",
                    placeholder: "Deportes",
                    name: "deportePractica",
                    defaultValue: location.state?.deportePractica,
                  }}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Pasatiempos"}
                  inputProps={{
                    type: "text",
                    placeholder: "Pasatiempos",
                    name: "pasaTiempos",
                    defaultValue: location.state?.pasaTiempos,
                  }}
                />
              </div>
            </div>

            <h2 className="text-[1.7rem] my-8 text-center">
              Información Académica
            </h2>

            {/* UNIVERSIDAD Y TITULO UNIVERSITARIO */}
            <div className="md:flex-row flex-col flex gap-7 mb-4">
              <div className="flex-1">
                <InputForm
                  labelText={"Universidad"}
                  inputProps={{
                    type: "text",
                    placeholder: "Universidad",
                    name: "universidad",
                    defaultValue: location.state?.universidad,
                  }}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Título Universitario"}
                  inputProps={{
                    type: "text",
                    placeholder: "Título Universitario",
                    name: "tituloUniversitario",
                    defaultValue: location.state?.tituloUniversitario,
                  }}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Fecha Titulación"}
                  inputProps={{
                    type: "date",
                    placeholder: "Fecha Titulación",
                    name: "fechaTitulacion",
                    defaultValue: location.state?.fechaTitulacion,
                  }}
                />
              </div>
            </div>

            {/* MAXIMO GRADO ACADEMICO, ESTUDIOS DE POSGRADO */}
            <div className="md:flex-row flex-col flex gap-7">
              <div className="flex-1">
                <SelectForm
                  textDefault={"Seleccione Grado"}
                  labelText={"Máximo Grado Académico"}
                  options={[
                    { value: "licenciatura", text: "Licenciatura" },
                    { value: "maestria", text: "Maestría" },
                    { value: "doctorado", text: "Doctorado" },
                  ]}
                  defaultValue={location.state?.maximoGradoAcademico}
                  selectName="maximoGradoAcademico"
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="estudioPosgrado"
                  className="text-black font-medium"
                >
                  Estudios de Posgrado
                </label>
                <textarea
                  defaultValue={location.state?.estudiosPosgrado}
                  name="estudiosPosgrado"
                  placeholder="Estudios de Posgrado"
                  id="estudioPosgrado"
                  className="w-full outline-none block border border-gray-700 px-3 mt-1 rounded-sm pt-1 disabled:opacity-90"
                ></textarea>
              </div>
            </div>

            <h2 className="text-[1.7rem] my-8 text-center">
              Principal Información Laboral
            </h2>

            {/* SECTOR, CARGO, CENTRO LABORAL */}
            <div className="md:flex-row flex-col flex gap-7 mb-4">
              <div className="flex-1">
                <SelectForm
                  textDefault={"Selecciona Estado Laboral"}
                  labelText={"Sector"}
                  selectName="sectorLaboral"
                  onChange={(e) => setSectorLaboral(e.target.value)}
                  options={[
                    { value: "ninguno", text: "Ninguno" },
                    { value: "publico", text: "Público" },
                    { value: "privado", text: "Privado" },
                  ]}
                  defaultValue={location.state?.sectorLaboral}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Cargo"}
                  inputProps={{
                    type: "text",
                    placeholder: "Cargo",
                    name: "cargo",
                    defaultValue: location.state?.cargo,
                  }}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Centro Laboral"}
                  inputProps={{
                    type: "text",
                    placeholder: "Centro Laboral",
                    name: "centroLaboral",
                    defaultValue: location.state?.centroLaboral,
                  }}
                />
              </div>
            </div>

            {/* GIRO O RUBRO */}
            <div className="md:flex-row flex-col flex gap-7 mb-4">
              <div className="flex-1">
                <InputForm
                  labelText={"Giro o Rubro"}
                  inputProps={{
                    type: "text",
                    placeholder: "Giro o Rubro",
                    name: "giroRubroCentroLaboral",
                    defaultValue: location.state?.giroRubroCentroLaboral,
                  }}
                />
              </div>

              <div className="flex-1">
                <InputForm
                  labelText={"Fecha de Inicio"}
                  inputProps={{
                    type: "date",
                    name: "fechaInicio",
                    defaultValue: location.state?.fechaInicio,
                  }}
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="block w-full text-center border-black hover:bg-black hover:text-white duration-300 transition-all font-medium border mt-5 py-1 rounded"
            >
              {loading ? "...Cargando" : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditarPerfil;
