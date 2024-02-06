import ModalComponent from "../components/ModalComponent";
import compareDate from "../utils/compareDate";
import { getError } from "../utils/getError";
import formatDate from "../utils/formatDate";
import { Table } from "../components/Table";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ConsultaPublica = () => {
  const [filtering, setFiltering] = useState("");
  const [refreshRender, setRefreshRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/todos-users`
        );
        setUsers(data);
        console.log(data);
      } catch (error) {
        toast.error(getError(error));
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refreshRender]);

  const handleVerUsuario = () => {};

  return (
    <section className="container mx-auto px-3">
      <div className="flex justify-center text-center mt-8">
        <input
          type="text"
          className="text-black placeholder:text-gray-500 border border-gray-400 mb-4 py-1 px-3 rounded"
          placeholder="Buscar..."
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>

      {loading && <h2>Loading...</h2>}

      {users.length > 0 && (
        <div className="max-w-[50rem] mx-auto mt-3 overflow-auto">
          <div
            className=""
            style={{
              minWidth: "600px",
            }}
          >
            <Table
              data={users}
              setFiltering={setFiltering}
              filtering={filtering}
              columns={[
                {
                  header: "Código",
                  accessorKey: "codigo",
                },

                {
                  header: "Nombres y Apellidos",
                  accessorFn: (row) =>
                    `${row.primerNombre} ${row.segundoNombre} ${row.apellidoPaterno} ${row.apellidoMaterno}`,
                },

                {
                  header: "Estado",
                  accessorFn: (row) =>
                    `${compareDate(Date.now(), row.habilitadoHasta)}`,
                },

                {
                  header: "Acción",

                  cell: (info) => {
                    const value = info.cell.row.original;
                    console.log(value);

                    return (
                      <ModalComponent
                        className="text-blue-500"
                        textBtn={<FaRegEye />}
                        titleModal={
                          <>
                            <span className="font-bold">Estado:</span>{" "}
                            <span className="font-light">
                              {compareDate(
                                Date.now(),
                                value.habilitadoHasta
                              ) === "HABILITADO" ? (
                                <span className="text-green-600 font-[400]">
                                  {compareDate(Date.now(), value.habilitadoHasta)}
                                </span>
                              ) : (
                                <span className="text-red-600 font-[400]">
                                  {compareDate(Date.now(), value.habilitadoHasta)}
                                </span>
                              )}
                            </span>
                          </>
                        }
                        onClick={handleVerUsuario}
                      >
                        <div className="sm:flex gap-4 sm:py-0 py-0">
                          <div>
                            <img
                              className="h-[10rem] w-[10rem] sm:mb-0 mb-3 sm:mx-0 mx-auto object-cover rounded"
                              src={value.perfilImagen}
                            />
                          </div>

                          <div className="sm:text-end text-center">
                            <h3 className="uppercase">
                              <span className="font-bold">Nombres:</span>{" "}
                              {value.primerNombre} {value.segundoNombre}
                            </h3>
                            <h3 className="uppercase">
                              <span className="font-bold">
                                Apellido Paterno:
                              </span>{" "}
                              {value.apellidoPaterno}
                            </h3>
                            <h3 className="uppercase">
                              <span className="font-bold">
                                Apellido Materno:
                              </span>{" "}
                              {value.apellidoMaterno}
                            </h3>

                            <h3>
                              Fecha de consulta:{" "}
                              <span className="capitalize block">
                                {formatDate(Date.now())}
                              </span>
                            </h3>
                          </div>
                        </div>
                      </ModalComponent>
                    );
                  },
                },
              ]}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ConsultaPublica;
