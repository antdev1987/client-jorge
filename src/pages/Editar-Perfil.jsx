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
  const [sectorLaboral, setSectorLaboral] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
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
      <div className="container max-w-[55rem] mx-auto my-16 px-5">
        <h3
          className="mb-7 font-bold cursor-pointer"
          onClick={() => navigate(-1, { state: location.state })}
        >
          {"< Volver Atrás"}
        </h3>

        <form className="flex flex-col gap-2" onSubmit={handleEditarPerfil}>
          <div className="flex-1 mb-3">
            <InputForm
              labelText={"Imagen"}
              inputProps={{
                disabled: !userInfo.isAdmin,
                type: "text",
                defaultValue: location.state?.perfilImagen,
                placeholder: "Imagen",
                name: "perfilImagen",
                required: userInfo.isAdmin,
              }}
            />
          </div>

          <div className="md:flex gap-7">
            <div className="flex-1">
              <InputForm
                labelText={"Documento de Identidad"}
                inputProps={{
                  disabled: !userInfo.isAdmin,
                  defaultValue: location.state?.documentoIdentidad,
                  type: "text",
                  placeholder: "DNI / CE / OTRO",
                  name: "documentoIdentidad",
                }}
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

          <div className="md:flex-row flex-col flex gap-7 mt-4">
            <div className="flex-1">
              <InputForm
                labelText={"Código"}
                inputProps={{
                  disabled: !userInfo.isAdmin,
                  defaultValue: location.state?.codigo,
                  type: "number",
                  placeholder: "123456",
                  name: "codigo",
                }}
              />
            </div>

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

          <div className="md:flex-row flex-col flex gap-7 mt-4">
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

          <div className="md:flex-row flex-col flex gap-7 mt-4">
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

          <div className="md:flex-row flex-col flex gap-7 mt-4">
            <div className="flex-1">
              <InputForm
                labelText={"Sexo"}
                inputProps={{
                  disabled: !userInfo.isAdmin,
                  type: "text",
                  placeholder: "Sexo",
                  defaultValue: location.state?.sexo,
                  name: "sexo",
                }}
              />
            </div>

            <div className="flex-1">
              <InputForm
                labelText={"Fecha de Nacimiento"}
                inputProps={{
                  disabled: !userInfo.isAdmin,
                  type: "text",
                  placeholder: "Fecha de Nacimiento",
                  defaultValue: location.state?.fechaNacimiento,
                  name: "fechaNacimiento",
                }}
              />
            </div>
          </div>

          <div className="md:flex-row flex-col flex gap-7 mt-4">
            <div className="flex-1">
              <InputForm
                labelText={"Dirección"}
                inputProps={{
                  type: "text",
                  placeholder: "Dirección",
                  name: "direccion",
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
                }}
              />
            </div>
          </div>

          <div className="md:flex-row flex-col flex gap-7 mt-4">
            <div className="basis-[33.3%]">
              <InputForm
                labelText={"Distrito"}
                inputProps={{
                  type: "text",
                  placeholder: "Distrito",
                  name: "distrito",
                }}
              />
            </div>

            <div className="basis-[33.3%]">
              <InputForm
                labelText={"Provincia"}
                inputProps={{
                  type: "text",
                  placeholder: "Provincia",
                  name: "provincia",
                }}
              />
            </div>

            <div className="basis-[33.3%]">
              <InputForm
                labelText={"Departamento"}
                inputProps={{
                  type: "text",
                  placeholder: "Departamento",
                  name: "departamento",
                }}
              />
            </div>
          </div>

          <div className="md:flex-row flex-col flex gap-7 mt-4">
            <div className="flex-1">
              <InputForm
                labelText={"Teléfono 1 (WhatsApp)"}
                inputProps={{
                  type: "number",
                  placeholder: "Teléfono 1 (WhatsApp)",
                  name: "telefono1WhatsApp",
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
                }}
              />
            </div>
          </div>

          <div className="md:flex-row flex-col flex gap-7 mt-4">
            <div className="flex-1">
              <SelectForm
                textDefault={"Selecciona Estado Laboral"}
                labelText={"Sector Laboral"}
                selectName="sectorLaboral"
                onChange={(e) => setSectorLaboral(e.target.value)}
                options={[
                  { value: "ninguno", text: "Ninguno" },
                  { value: "publico", text: "Público" },
                  { value: "privado", text: "Privado" },
                ]}
              />
            </div>

            <div className="flex-1">
              <InputForm
                labelText={"Centro Laboral"}
                inputProps={{
                  required: sectorLaboral !== "ninguno",
                  disabled: sectorLaboral === "ninguno",
                  type: "text",
                  placeholder: "Centro Laboral",
                  name: "centroLaboral",
                }}
              />
            </div>

            <div className="flex-1">
              <InputForm
                labelText={"Cargo"}
                inputProps={{
                  required: sectorLaboral !== "ninguno",
                  disabled: sectorLaboral === "ninguno",
                  type: "text",
                  placeholder: "Cargo",
                  name: "cargo",
                }}
              />
            </div>
          </div>

          <div className="md:flex-row flex-col flex gap-7 mt-4">
            <div className="flex-1">
              <InputForm
                labelText={"Giro o rubro del centro laboral"}
                inputProps={{
                  type: "text",
                  placeholder: "Giro o rubro del centro laboral",
                  name: "giroRubroCentroLaboral",
                }}
              />
            </div>

            <div className="flex-1">
              <InputForm
                labelText={"Deportes que practica"}
                inputProps={{
                  type: "text",
                  placeholder: "Deportes que practica",
                  name: "deportePractica",
                }}
              />
            </div>
          </div>

          <div className="md:flex-row flex-col flex gap-7 mt-4">
            <div className="flex-1">
              <InputForm
                labelText={"Hijos menores de edad hombre(s)"}
                inputProps={{
                  type: "number",
                  placeholder: "Hijos menores de edad hombre(s)",
                  name: "hijosMenoresMasculino",
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
        </form>
      </div>
    </section>
  );
};

export default EditarPerfil;
