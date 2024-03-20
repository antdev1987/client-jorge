/* eslint-disable react/prop-types */
import { useState } from 'react';
import ContainerSection from './ContainerSection';
import InputForm from './InputForm';
import SelectForm from './SelectForm';
import { departamentosObjeto } from '../utils/localizacion';

const ContactSection = ({ isAdmin, isEditing, data }) => {
  const [ubicacion, setUbicacion] = useState({
    depa: data?.departamento || '',
    provincia: data?.provincia || '',
    distrito: data?.distrito || '',
  });

  const isDisabledAdmin = !(isAdmin && isEditing);

  const formatArray = (data) => {
    return data.map((item) => ({ value: item, text: item }));
  };
  return (
    <ContainerSection title={'Contacto'}>
      <div className="flex gap-10 flex-col md:flex-row items-end mb-10">
        <InputForm
          labelText={'Teléfono 1 (WhatsApp)'}
          inputProps={{
            type: 'number',
            placeholder: 'Teléfono 1 (WhatsApp)',
            name: 'telefono1WhatsApp',
            defaultValue: data?.telefono1WhatsApp,
            disabled: !isEditing,
          }}
        />

        <InputForm
          labelText={'Teléfono 2'}
          inputProps={{
            type: 'number',
            placeholder: 'Teléfono 2',
            name: 'telefono2',
            defaultValue: data?.telefono2,
            disabled: !isEditing,
          }}
        />

        <InputForm
          labelText={'Email'}
          inputProps={{
            disabled: isDisabledAdmin,
            type: 'email',
            defaultValue: data?.email,
            placeholder: 'Correo Electrónico',
            name: 'email',
            required: isAdmin,
          }}
        />
      </div>

      <div className="flex gap-10 flex-col md:flex-row md:items-end mb-10">
        <div style={{ flex: 3 }}>
          <InputForm
            labelText={'Dirección'}
            inputProps={{
              type: 'text',
              placeholder: 'Dirección',
              name: 'direccion',
              defaultValue: data?.direccion,
              disabled: !isEditing,
            }}
          />
        </div>

        <div className="flex-1">
          <InputForm
            labelText={'Urbanización'}
            inputProps={{
              type: 'text',
              placeholder: 'Urbanización',
              name: 'urbanizacion',
              defaultValue: data?.urbanizacion,
              disabled: !isEditing,
            }}
          />
        </div>
      </div>

      <div className="flex gap-10 flex-col md:flex-row items-end mb-10">
        <SelectForm
          textDefault={'Seleccione Departamento'}
          labelText={'Departamento'}
          options={formatArray(Object.keys(departamentosObjeto))}
          onChange={(e) =>
            setUbicacion({ depa: e.target.value, provincia: '', distrito: '' })
          }
          defaultValue={data?.departamento}
          selectName="departamento"
          disabled={!isEditing}
        />

        {ubicacion.depa && (
          <SelectForm
            textDefault={'Seleccione Provincia'}
            labelText={'Provincia'}
            options={formatArray(
              Object.keys(departamentosObjeto[ubicacion.depa])
            )}
            onChange={(e) =>
              setUbicacion((prev) => ({ ...prev, provincia: e.target.value, distrito: '' }))
            }
            defaultValue={data?.provincia}
            selectName="provincia"
            disabled={!isEditing}
          />
        )}

        {ubicacion.provincia && (
          <SelectForm
            textDefault={'Seleccione Distrito'}
            labelText={'Distrito'}
            options={formatArray(
              departamentosObjeto[ubicacion.depa][ubicacion.provincia]
            )}
            defaultValue={data?.distrito}
            selectName="distrito"
            disabled={!isEditing}
          />
        )}
      </div>

      <div className="flex gap-10 flex-col md:flex-row items-end mb-10">
        <InputForm
          labelText={'Linkedin'}
          inputProps={{
            disabled: !isEditing,
            type: 'text',
            defaultValue: data?.linkedin,
            name: 'linkedin',
          }}
        />

        <InputForm
          labelText={'Facebook'}
          inputProps={{
            disabled: !isEditing,
            type: 'text',
            defaultValue: data?.facebook,
            name: 'facebook',
          }}
        />

        <InputForm
          labelText={'Instagram'}
          inputProps={{
            disabled: !isEditing,
            type: 'text',
            defaultValue: data?.instagram,
            name: 'instagram',
          }}
        />
      </div>

      <InputForm
        labelText={'URL (Sitio web / Blog / Otros)'}
        inputProps={{
          disabled: !isEditing,
          type: 'text',
          defaultValue: data?.url,
          placeholder: 'https://',
          name: 'url',
        }}
      />
    </ContainerSection>
  );
};

export default ContactSection;
