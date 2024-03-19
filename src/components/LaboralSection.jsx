/* eslint-disable react/prop-types */
import ContainerSection from './ContainerSection';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

const LaboralSection = ({ data, isEditing }) => {
  console.log(data)
  return (
    <ContainerSection title={'Laboral'}>
      <div className="flex gap-10 mb-10">
        <SelectForm
          textDefault={'Sector'}
          labelText={'Sector'}
          selectName="sectorLaboral"
          options={[
            { value: 'publico', text: 'Público' },
            { value: 'privado', text: 'Privado' },
          ]}
          defaultValue={data?.sectorLaboral}
          disabled={!isEditing}
        />

        <InputForm
          labelText={'Giro o Rubro'}
          inputProps={{
            type: 'text',
            name: 'giroRubroCentroLaboral',
            defaultValue: data?.giroRubroCentroLaboral,
            disabled: !isEditing,
          }}
        />
      </div>

      <div className="flex gap-10 mb-10">
        <InputForm
          labelText={'Centro Laboral'}
          inputProps={{
            type: 'text',
            name: 'centroLaboral',
            defaultValue: data?.centroLaboral,
            disabled: !isEditing,
          }}
        />

        <InputForm
          labelText={'Website'}
          inputProps={{
            type: 'text',
            name: 'website',
            defaultValue: data?.website,
            disabled: !isEditing,
          }}
        />
      </div>

      <div className="flex gap-10">
        <InputForm
          labelText={'Cargo'}
          inputProps={{
            type: 'text',
            placeholder: 'Cargo',
            name: 'cargo',
            defaultValue: data?.cargo,
            disabled: !isEditing,
          }}
        />

        <InputForm
          labelText={'Fecha de ingreso'}
          inputProps={{
            type: 'date',
            name: 'fechaInicio',
            defaultValue: data?.fechaInicio,
            disabled: !isEditing,
          }}
        />
      </div>
    </ContainerSection>
  );
};

export default LaboralSection;
