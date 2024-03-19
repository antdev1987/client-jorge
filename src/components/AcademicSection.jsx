/* eslint-disable react/prop-types */
import ContainerSection from './ContainerSection';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

const AcademicSection = ({ data, isEditing, setUserPerfilInfo }) => {
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

  console.log(data);

  return (
    <ContainerSection title={'academica'}>
      <div className="flex gap-10 mb-10">
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

      <div className="flex gap-10 mb-10 pb-10 border-b-8 border-dashed">
        <div style={{ flex: 2 }}>
          <InputForm
            labelText={'Universidad'}
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
        <div key={idx} className="flex gap-10 mb-10">
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
        + ADD ITEM (permite agregar otra/s línea/s de "Estudio de posgrado" y
        "Descripcion")
      </button>
    </ContainerSection>
  );
};

export default AcademicSection;
