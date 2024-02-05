import ModalComponent from "../components/ModalComponent";
import { useEffect, useRef, useState } from "react";
import SelectForm from "../components/SelectForm";
import InputForm from "../components/InputForm";
import { getError } from "../utils/getError";
import { Table } from "../components/Table";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const GestionarUsuarios = () => {
  const [filtering, setFiltering] = useState("");
  const [refreshRender, setRefreshRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  const formRef = useRef();

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const userData = {
      email: formData.get("email"),
      documentoIdentidad: formData.get("documentoIdentidad"),
      numeroDocIdentidad: formData.get("numeroDocIdentidad"),
      codigo: formData.get("codigo"),
      primerNombre: formData.get("primerNombre"),
      segundoNombre: formData.get("segundoNombre"),
      apellidoPaterno: formData.get("apellidoPaterno"),
      apellidoMaterno: formData.get("apellidoMaterno"),
      fechaNacimiento: formData.get("fechaNacimiento"),
      sexo: formData.get("sexo"),
      perfilImagen: formData.get("perfilImagen"),
    };

    try {
      setModalLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        userData
      );
      formRef.current.reset();
      setRefreshRender((prev) => !prev);
      toast.success("Usuario creado exitosamente!");
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/todos-users`
        );
        setUsers(data);
      } catch (error) {
        toast.error(getError(error));
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, [refreshRender]);

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="my-5">
          <ModalComponent
            textBtn={"Crear Usuario"}
            titleModal={"Crear Usuario"}
          >
            <form ref={formRef} onSubmit={handleCreateUser}>
              <div className="flex md:flex-row flex-col gap-7 mb-4">
                <div className="flex-1">
                  <InputForm
                    labelText={"Imagen"}
                    inputProps={{
                      type: "text",
                      placeholder: "Imagen",
                      name: "perfilImagen",
                    }}
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-7">
                <div className="flex-1">
                <SelectForm
                      textDefault={"Seleccione Documento de ID"}
                      labelText={"Documento de Identidad"}
                      options={[
                        { value: "dni", text: "DNI" },
                        { value: "cd", text: "CE" },
                        { value: "otro", text: "OTRO" },
                      ]}
                      required={true}
                      selectName="documentoIdentidad"
                    />

                </div>

                <div className="flex-1">
                  <InputForm
                    labelText={"Número de Documento de Identidad"}
                    inputProps={{
                      type: "text",
                      placeholder: "A1111111111C",
                      name: "numeroDocIdentidad",
                    }}
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-7 mt-4">
                <div className="flex-1">
                  <InputForm
                    labelText={"Código"}
                    inputProps={{
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
                      required: true,
                      type: "email",
                      placeholder: "Correo Electrónico",
                      name: "email",
                    }}
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-7 mt-4">
                <div className="flex-1">
                  <InputForm
                    labelText={"Primer Nombre"}
                    inputProps={{
                      required: true,
                      type: "text",
                      placeholder: "Primer Nombre",
                      name: "primerNombre",
                    }}
                  />
                </div>

                <div className="flex-1">
                  <InputForm
                    labelText={"Segundo Nombre"}
                    inputProps={{
                      type: "text",
                      placeholder: "Segundo Nombre",
                      name: "segundoNombre",
                    }}
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-7 mt-4">
                <div className="flex-1">
                  <InputForm
                    labelText={"Apellido Paterno"}
                    inputProps={{
                      type: "text",
                      placeholder: "Apellido Paterno",
                      name: "apellidoPaterno",
                    }}
                  />
                </div>

                <div className="flex-1">
                  <InputForm
                    labelText={"Apellido Materno"}
                    inputProps={{
                      type: "text",
                      placeholder: "Apellido Materno",
                      name: "apellidoMaterno",
                    }}
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-7 mt-4">
                <div className="flex-1">
                  <InputForm
                    labelText={"Fecha de Nacimiento"}
                    inputProps={{
                      type: "date",
                      name: "fechaNacimiento",
                    }}
                  />
                </div>

                <div className="flex-1">
                  <SelectForm
                    textDefault={"Seleccione Sexo"}
                    labelText={"Sexo"}
                    options={[
                      { value: "hombre", text: "Hombre" },
                      { value: "mujer", text: "Mujer" },
                    ]}
                    selectName="sexo"
                  />
                </div>
              </div>

              <button
                disabled={modalLoading}
                className="block w-full text-center border-black hover:bg-black hover:text-white duration-300 transition-all font-medium border mt-5 py-1 rounded"
              >
                {modalLoading ? "...cargando" : "Registrar"}
              </button>
            </form>
          </ModalComponent>
        </div>

        {loading && <h2>Loading...</h2>}

        <input
          type="text"
          className="text-black placeholder:text-gray-500 border border-gray-400 mb-4 py-1 px-3 rounded"
          placeholder="Buscar..."
          onChange={(e) => setFiltering(e.target.value)}
        />

        {users.length > 0 && (
          <div className="w-full overflow-auto">
            <div className="" style={{
              minWidth: "600px"
            }}>
              <Table
            data={users}
            setFiltering={setFiltering}
            filtering={filtering}
            columns={[
              { header: "Nombre", accessorKey: "primerNombre" },
              { header: "Segundo Nombre", accessorKey: "segundoNombre" },
              { header: "Apellido Paterno", accessorKey: "apellidoPaterno" },
              { header: "Apellido Materno", accessorKey: "apellidoMaterno" },
              {
                header: "Código",
                accessorKey: "codigo",
              },
              { header: "Email", accessorKey: "email" },
              { header: "Documento Identidad", accessorKey: "documentoIdentidad" },

              {
                header: "Acción",

                cell: (info) => {
                  const value = info.cell.row.original;
                  console.log(value);

                  return (
                    <Link
                      to={`/perfil/${value._id}`}
                      className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-nowrap"
                    >
                      Ver Usuario
                    </Link>
                  );
                },
              },
            ]}
          />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GestionarUsuarios;
