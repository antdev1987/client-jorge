/* eslint-disable react/prop-types */
import ContainerSection from './ContainerSection';
import InputForm from './InputForm';

const ActividadesSection = ({ data, isEditing }) => {
  return (
    <ContainerSection title={'Actividades'}>
      <div className="flex gap-10 mb-10">
        <InputForm
          labelText={'Desporte(s) que practicas'}
          inputProps={{
            type: 'text',
            name: 'deportePractica',
            defaultValue: data?.deportePractica,
            disabled: !isEditing,
          }}
        />

        <InputForm
          labelText={'Hobby / hobbies'}
          inputProps={{
            type: 'text',
            name: 'pasaTiempos',
            defaultValue: data?.pasaTiempos,
            disabled: !isEditing,
          }}
        />

        <InputForm
          labelText={'Temas de interés'}
          inputProps={{
            type: 'text',
            name: 'temasDeInteres',
            defaultValue: data?.temasDeInteres,
            disabled: !isEditing,
          }}
        />
      </div>

      <InputForm
        labelText={'Tu frase favorita o un pensamiento para el mundo'}
        inputProps={{
          type: 'text',
          name: 'fraseFavorita',
          defaultValue: data?.fraseFavorita,
          disabled: !isEditing,
        }}
      />
    </ContainerSection>
  );
};

export default ActividadesSection;
