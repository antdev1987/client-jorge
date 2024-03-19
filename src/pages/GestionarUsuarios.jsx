import ModalComponent from '../components/ModalComponent';
import { useEffect, useRef, useState } from 'react';
import SelectForm from '../components/SelectForm';
import InputForm from '../components/InputForm';
import { getError } from '../utils/getError';
import { Table } from '../components/Table';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as XLSX from 'xlsx';

const GestionarUsuarios = () => {
  const [filtering, setFiltering] = useState('');
  const [refreshRender, setRefreshRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  const formRef = useRef();

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const userData = {
      email: formData.get('email'),
      documentoIdentidad: formData.get('documentoIdentidad'),
      numeroDocIdentidad: formData.get('numeroDocIdentidad'),
      codigo: formData.get('codigo'),
      primerNombre: formData.get('primerNombre'),
      segundoNombre: formData.get('segundoNombre'),
      apellidoPaterno: formData.get('apellidoPaterno'),
      apellidoMaterno: formData.get('apellidoMaterno'),
      fechaNacimiento: formData.get('fechaNacimiento'),
      sexo: formData.get('sexo'),
      // perfilImagen: formData.get('perfilImagen'),
    };

    try {
      setModalLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        userData
      );
      formRef.current.reset();
      setRefreshRender((prev) => !prev);
      toast.success('Usuario creado exitosamente!');
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
            textBtn={'Crear Usuario'}
            titleModal={'Crear Usuario'}
            SecondaryBtn={() => (
              <ImportUsers setRefreshRender={setRefreshRender} />
            )}
          >
            <form ref={formRef} onSubmit={handleCreateUser}>
              {/* <div className="flex md:flex-row flex-col gap-7 mb-4">
                <div className="flex-1">
                  <InputForm
                    labelText={'Imagen'}
                    inputProps={{
                      type: 'text',
                      placeholder: 'Imagen',
                      name: 'perfilImagen',
                    }}
                  />
                </div>
              </div> */}

              <div className="flex md:flex-row flex-col gap-7">
                <div className="flex-1">
                  <SelectForm
                    textDefault={'Seleccione Documento de ID'}
                    labelText={'Documento de Identidad'}
                    options={[
                      { value: 'dni', text: 'DNI' },
                      { value: 'ce', text: 'CE' },
                    ]}
                    required={true}
                    selectName="documentoIdentidad"
                  />
                </div>

                <div className="flex-1">
                  <InputForm
                    labelText={'No. de Doc. de Identidad'}
                    inputProps={{
                      type: 'text',
                      placeholder: 'A1111111111C',
                      name: 'numeroDocIdentidad',
                    }}
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-7 mt-4">
                <div className="flex-1">
                  <InputForm
                    labelText={'Código'}
                    inputProps={{
                      type: 'number',
                      placeholder: '123456',
                      name: 'codigo',
                    }}
                  />
                </div>

                <div className="flex-1">
                  <InputForm
                    labelText={'Email'}
                    inputProps={{
                      required: true,
                      type: 'email',
                      placeholder: 'Correo Electrónico',
                      name: 'email',
                    }}
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-7 mt-4">
                <div className="flex-1">
                  <InputForm
                    labelText={'Primer Nombre'}
                    inputProps={{
                      required: true,
                      type: 'text',
                      placeholder: 'Primer Nombre',
                      name: 'primerNombre',
                    }}
                  />
                </div>

                <div className="flex-1">
                  <InputForm
                    labelText={'Segundo Nombre'}
                    inputProps={{
                      type: 'text',
                      placeholder: 'Segundo Nombre',
                      name: 'segundoNombre',
                    }}
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-7 mt-4">
                <div className="flex-1">
                  <InputForm
                    labelText={'Apellido Paterno'}
                    inputProps={{
                      type: 'text',
                      placeholder: 'Apellido Paterno',
                      name: 'apellidoPaterno',
                    }}
                  />
                </div>

                <div className="flex-1">
                  <InputForm
                    labelText={'Apellido Materno'}
                    inputProps={{
                      type: 'text',
                      placeholder: 'Apellido Materno',
                      name: 'apellidoMaterno',
                    }}
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-7 mt-4">
                <div className="flex-1">
                  <InputForm
                    labelText={'Fecha de Nacimiento'}
                    inputProps={{
                      type: 'date',
                      name: 'fechaNacimiento',
                    }}
                  />
                </div>

                <div className="flex-1">
                  <SelectForm
                    textDefault={'Seleccione Sexo'}
                    labelText={'Sexo'}
                    options={[
                      { value: 'hombre', text: 'Hombre' },
                      { value: 'mujer', text: 'Mujer' },
                    ]}
                    selectName="sexo"
                  />
                </div>
              </div>

              <button
                disabled={modalLoading}
                className="block w-full text-center border-black hover:bg-black hover:text-white duration-300 transition-all font-medium border mt-5 py-1 rounded"
              >
                {modalLoading ? '...cargando' : 'Registrar'}
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
            <div
              className=""
              style={{
                minWidth: '600px',
              }}
            >
              <Table
                data={users}
                setFiltering={setFiltering}
                filtering={filtering}
                columns={[
                  { header: 'Nombre', accessorKey: 'primerNombre' },
                  { header: 'Segundo Nombre', accessorKey: 'segundoNombre' },
                  {
                    header: 'Apellido Paterno',
                    accessorKey: 'apellidoPaterno',
                  },
                  {
                    header: 'Apellido Materno',
                    accessorKey: 'apellidoMaterno',
                  },
                  {
                    header: 'Código',
                    accessorKey: 'codigo',
                  },
                  { header: 'Email', accessorKey: 'email' },
                  {
                    header: 'Número del Documento',
                    accessorKey: 'numeroDocIdentidad',
                  },
                  // numeroDocIdentidad

                  {
                    header: 'Acción',

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

const ImportUsers = ({ setRefreshRender }) => {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!!file.length) return;

    const continueImport = confirm(
      'Estas seguro que quieres importar este documento?'
    );

    if (!continueImport) return;
    setLoading(true);

    const reader = new FileReader();

    const formating = (date) => {
      if (!date) return;

      const isoFormat = new Date(
        Math.round((date - 25569) * 864e5)
      ).toISOString();

      const fecha = new Date(isoFormat);

      // Obtener el día, mes y año
      const dia = fecha.getUTCDate();
      const mes = fecha.getUTCMonth() + 1; // Se suma 1 porque los meses en JavaScript van de 0 a 11
      const anio = fecha.getUTCFullYear();

      // Formatear la fecha como "dd/mm/yyyy"
      const fechaFormateada =
        anio +
        '-' +
        (mes < 10 ? '0' : '') +
        mes +
        '-' +
        (dia < 10 ? '0' : '') +
        dia;

      return fechaFormateada;
    };

    reader.onload = async (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      const formatDates = data.map((item) => {
        const fechaNacimiento = formating(item.fechaNacimiento);
        const fechaIncorporacion = formating(item.fechaIncorporacion);
        const fechaTitulacion = formating(item.fechaTitulacion);
        const fechaInicio = formating(item.fechaInicio);

        console.log(fechaNacimiento);

        return {
          ...item,
          fechaIncorporacion,
          fechaNacimiento,
          fechaTitulacion,
          fechaInicio,
        };
      });
      // setData(data);

      console.log(formatDates);

      // return;

      try {
        const respuesta = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/register-importing`,
          formatDates
        );
        // setRefreshRender((prev) => !prev);
        console.log(respuesta);
        toast.success('Usuarios importado');
        setRefreshRender((prev) => !prev);
      } catch (error) {
        toast.error(getError(error));
      } finally {
        setLoading(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  return loading ? (
    <button
      disabled
      className="cursor-pointer w-fit block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Importar Usuarios
    </button>
  ) : (
    <label disabled={true}>
      <span className="cursor-pointer w-fit block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        Importar Usuarios
      </span>

      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
        hidden
        value={''}
      />
    </label>
  );
};

export default GestionarUsuarios;
