/* eslint-disable react/prop-types */
import ContainerSection from './ContainerSection';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

import UserAvatar from '../images/user-avatar.png';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getError } from '../utils/getError';

const PersonalSection = ({
  isAdmin,
  isEditing,
  data,
  children,
  id,
  setRefresh,
}) => {
  const [loading, setLoading] = useState(false);
  console.log(data);

  const isDisabledAdmin = !(isAdmin && isEditing);

  const handleProfileImg = async (e) => {
    const file = e.target.files[0];

    const confirmChange = confirm('Deseas cambiar la imagen?');
    if (!confirmChange) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('uploadImages', file);

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/add-picture/${id}`,
        formData
      );
      console.log(data);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerSection title={'personal'}>
      <div className="flex items-center gap-5 mb-10">
        <img
          src={data.image[0]?.cloudinary_url || UserAvatar}
          loading="lazy"
          className="h-40 w-40 rounded-md"
        />

        {loading ? (
          <p>Subiendo</p>
        ) : (
          <label>
            <span className="block text-xl mb-2">Fotografía</span>
            <input
              type="file"
              className="bg-gray-300"
              onChange={handleProfileImg}
              disabled={!isEditing}
            />
          </label>
        )}
      </div>

      <div className="flex gap-10 mb-10">
        <SelectForm
          textDefault={'Seleccione Documento de ID'}
          labelText={'Tipo documento de identidad'}
          options={[
            { value: 'dni', text: 'DNI' },
            { value: 'ce', text: 'CE' },
          ]}
          defaultValue={data?.documentoIdentidad}
          selectName="documentoIdentidad"
          disabled={isDisabledAdmin}
        />

        <InputForm
          labelText={'Número de Doc. Identidad'}
          inputProps={{
            disabled: isDisabledAdmin,
            defaultValue: data.numeroDocIdentidad,
            type: 'text',
            placeholder: 'A1111111111C',
            name: 'numeroDocIdentidad',
          }}
        />

        <InputForm
          labelText={'Código'}
          inputProps={{
            disabled: isDisabledAdmin,
            defaultValue: data?.codigo,
            type: 'text',
            name: 'codigo',
          }}
        />
      </div>

      <div className="flex gap-10 mb-10">
        <InputForm
          labelText={'Primer Nombre'}
          inputProps={{
            disabled: isDisabledAdmin,
            type: 'text',
            placeholder: 'Primer Nombre',
            defaultValue: data.primerNombre,
            name: 'primerNombre',
            required: isAdmin,
          }}
        />

        <InputForm
          labelText={'Segundo Nombre'}
          inputProps={{
            disabled: isDisabledAdmin,
            type: 'text',
            placeholder: 'Segundo Nombre',
            defaultValue: data.segundoNombre,
            name: 'segundoNombre',
          }}
        />
      </div>

      <div className="flex gap-10 mb-10">
        <InputForm
          labelText={'Apellido Paterno'}
          inputProps={{
            disabled: isDisabledAdmin,
            type: 'text',
            placeholder: 'Apellido Paterno',
            defaultValue: data?.apellidoPaterno,
            name: 'apellidoPaterno',
          }}
        />

        <InputForm
          labelText={'Apellido Materno'}
          inputProps={{
            disabled: isDisabledAdmin,
            type: 'text',
            placeholder: 'Apellido Materno',
            defaultValue: data?.apellidoMaterno,
            name: 'apellidoMaterno',
          }}
        />
      </div>

      <div className="flex gap-10 mb-10">
        <SelectForm
          textDefault={'Seleccione Sexo'}
          labelText={'Sexo'}
          options={[
            { value: 'hombre', text: 'Hombre' },
            { value: 'mujer', text: 'Mujer' },
          ]}
          defaultValue={data?.sexo}
          disabled={isDisabledAdmin}
          selectName="sexo"
        />

        <InputForm
          labelText={'Fecha de Nacimiento'}
          inputProps={{
            disabled: isDisabledAdmin,
            type: 'date',
            placeholder: 'Fecha de Nacimiento',
            defaultValue: data?.fechaNacimiento,
            name: 'fechaNacimiento',
          }}
        />

        <InputForm
          labelText={'Lugar de nacimiento (ciudad)'}
          inputProps={{
            disabled: !isEditing,
            type: 'text',
            defaultValue: data?.ciudadNacimiento,
            name: 'ciudadNacimiento',
          }}
        />
      </div>

      {children}
    </ContainerSection>
  );
};

export default PersonalSection;
