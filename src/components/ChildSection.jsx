/* eslint-disable react/prop-types */
import ContainerSection from './ContainerSection';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

const ChildSection = ({ data, isEditing, setUserPerfilInfo }) => {
  const handleChildChange = (e) => {
    const [name, idx] = e.target.name.split('-');

    const childrenData = data;

    childrenData[idx][name] = e.target.value;

    console.log({ name, idx });

    setUserPerfilInfo((prev) => ({ ...prev, children: childrenData }));
  };

  const handleChildAdd = () => {
    setUserPerfilInfo((prev) => ({ ...prev, children: [...data, {}] }));
  };

  console.log(data);

  return (
    <ContainerSection titleInside={true} title={'Hijos menores (De 18 años)'}>
      {data.map((item, idx) => (
        <div
          key={idx}
          className="flex gap-10 flex-col md:flex-row items-end mb-10 pb-5 border-b-2 border-black"
        >
          <InputForm
            labelText={'Nombre (sin apellidos)'}
            inputProps={{
              disabled: !isEditing,
              type: 'text',
              defaultValue: item?.name,
              name: `name-${idx}`,
              onChange: handleChildChange,
            }}
          />
          <SelectForm
            textDefault={'Seleccione Sexo'}
            labelText={'Sexo'}
            options={[
              { value: 'hombre', text: 'Hombre' },
              { value: 'mujer', text: 'Mujer' },
            ]}
            defaultValue={item?.sexo}
            disabled={!isEditing}
            selectName={`sexo-${idx}`}
            onChange={handleChildChange}
          />

          <InputForm
            labelText={'Fecha de Nacimiento'}
            inputProps={{
              disabled: !isEditing,
              type: 'date',
              defaultValue: item?.fechaNacimiento,
              name: `fechaNacimiento-${idx}`,
              onChange: handleChildChange,
            }}
          />

          <InputForm
            labelText={'Número DNI/CE'}
            inputProps={{
              disabled: !isEditing,
              type: 'number',
              defaultValue: item?.numberDoc,
              name: `numberDoc-${idx}`,
              min: 99999999,
              max: 999999999999,
              onChange: handleChildChange,
            }}
          />
        </div>
      ))}
      <button
        className="bg-black text-white px-3 rounded-md text-lg disabled:bg-black/70"
        type="button"
        onClick={handleChildAdd}
        disabled={!isEditing}
      >
        + ADD ITEM
      </button>
    </ContainerSection>
  );
};

export default ChildSection;
