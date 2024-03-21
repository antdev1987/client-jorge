/* eslint-disable react/prop-types */
import { useState } from 'react';
import ContainerSection from './ContainerSection';
import InputForm from './InputForm';
import SelectForm from './SelectForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils/getError';

const AcademicSection = ({
  data,
  isEditing,
  setUserPerfilInfo,
  setRefresh,
  id,
}) => {
  const [loading, setLoading] = useState(false);

  const handleChildChange = (e) => {
    const [name, idx] = e.target.name.split('-');

    const posGradoData = data.posgrados;

    posGradoData[idx][name] = e.target.value;

    console.log({ name, idx });

    setUserPerfilInfo((prev) => ({ ...prev, posgrados: posGradoData }));
  };

  const handlePosGradoAdd = () => {
    setUserPerfilInfo((prev) => ({
      ...prev,
      posgrados: [...(data.posgrados || []), {}],
    }));
  };

  const handlePdf = async (e) => {
    const file = e.target.files[0];

    console.log(file);

    const confirmChange = confirm('Deseas agregar/cambiar el pdf?');
    if (!confirmChange) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('uploadImages', file);

    console.log('Todo bien');
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/add-resume/${id}`,
        formData
      );
      console.log(data);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  console.log(data);

  return (
    <ContainerSection title={'academica'}>
      <div className="flex gap-10 flex-col md:flex-row md:items-end mb-10">
        <div style={{ flex: 2 }}>
          <InputForm
            labelText={'Universidad'}
            inputProps={{
              type: 'text',
              name: 'universidad',
              defaultValue: data?.universidad,
              disabled: !isEditing,
            }}
          />
        </div>

        <div className="flex-1">
          <InputForm
            labelText={'Año de egreso'}
            inputProps={{
              type: 'number',
              name: 'yearEgreso',
              defaultValue: data?.yearEgreso,
              disabled: !isEditing,
            }}
          />
        </div>
      </div>

      <div className="flex gap-10 flex-col md:flex-row md:items-end mb-10 pb-10 border-b-8 border-dashed">
        <div style={{ flex: 2 }}>
          <InputForm
            labelText={'Título'}
            inputProps={{
              type: 'text',
              name: 'tituloUniversitario',
              defaultValue: data?.tituloUniversitario,
              disabled: !isEditing,
            }}
          />
        </div>

        <div className="flex-1">
          <InputForm
            labelText={'Año de titulación'}
            inputProps={{
              type: 'number',
              name: 'yearTitulacion',
              defaultValue: data?.yearTitulacion,
              disabled: !isEditing,
            }}
          />
        </div>
      </div>

      {data?.posgrados?.map((item, idx) => (
        <div
          key={idx}
          className="flex gap-10 flex-col md:flex-row items-end border-b-2 border-black pb-5 mb-10"
        >
          <SelectForm
            textDefault={'Seleccione estudio'}
            labelText={'Estudios de posgrado'}
            options={[
              { value: 'maestria', text: 'Maestría' },
              { value: 'diplomado', text: 'Diplomado' },
              { value: 'doctorado', text: 'Doctorado' },
            ]}
            defaultValue={item?.estudio}
            disabled={!isEditing}
            selectName={`estudio-${idx}`}
            onChange={handleChildChange}
          />

          <InputForm
            labelText={'Descripción'}
            inputProps={{
              disabled: !isEditing,
              type: 'text',
              defaultValue: item?.fechaNacimiento,
              name: `fechaNacimiento-${idx}`,
              onChange: handleChildChange,
            }}
          />
        </div>
      ))}

      <button
        className="bg-black text-white px-3 rounded-md text-lg disabled:bg-black/70"
        type="button"
        onClick={handlePosGradoAdd}
        disabled={!isEditing}
      >
        + ADD ITEM
      </button>

      {loading ? (
        <p className="block my-5">Subiendo</p>
      ) : (
        <label className="block my-5">
          <span className="bg-[#767676] text-white px-3 py-4 rounded-md text-lg disabled:bg-black/70 inline-block">
            ADJUNTAR CV (opción para adjuntar un PDF), si ya tiene uno, podrá
            visualizarlo y reemplazarlo
          </span>

          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={handlePdf}
            value={''}
          />
        </label>
      )}

      {data.resumePersonal[0]?.cloudinary_url && (
        <embed
          loading="lazy"
          src={`${data.resumePersonal[0].cloudinary_url}`}
          width={'100%'}
          height={600}
          frameBorder="0"
        ></embed>
      )}
    </ContainerSection>
  );
};

export default AcademicSection;
