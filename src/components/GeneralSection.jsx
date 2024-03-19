/* eslint-disable react/prop-types */
import ContainerSection from './ContainerSection';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

const GeneralSection = ({ data, isEditing }) => {
  return (
    <ContainerSection title={'informacion general'}>
      <div className="flex gap-10 mb-10">
        <InputForm
          labelText={'Última cuota pagada'}
          inputProps={{
            type: 'text',
            name: 'ultimaCuotaPagada',
            defaultValue: data?.ultimaCuotaPagada,
            disabled: !isEditing,
          }}
        />

        <SelectForm
          textDefault={'Seleccione habilidad'}
          labelText={'Habilidad'}
          options={[
            { value: 'habilidatdo', text: 'Habilitado' },
            { value: 'noHabilitado', text: 'No Habilitado' },
          ]}
          defaultValue={data?.habilidad}
          disabled={!isEditing}
          selectName="habilidad"
        />

        <SelectForm
          textDefault={'Seleccione multa'}
          labelText={'Multa'}
          options={[
            { value: 'si', text: 'Sí' },
            { value: 'no', text: 'No' },
          ]}
          defaultValue={data?.multaPendiente}
          disabled={!isEditing}
          selectName="multaPendiente"
        />
      </div>

      <div className="flex gap-10 mb-10">
        <div style={{ flex: 2 }}>
          <SelectForm
            textDefault={'Seleccione Estado'}
            labelText={'Estado'}
            options={[
              { value: 'colegiatura', text: 'Colegiatura' },
              { value: 'jubileo', text: 'Jubileo' },
              { value: 'reincorporo', text: 'Reincorporo' },
              { value: 'traslado', text: 'Traslado' },
            ]}
            defaultValue={data?.estado}
            disabled={!isEditing}
            selectName="estado"
          />
        </div>

        <div style={{ flex: 2 }}>
          {' '}
          <InputForm
            labelText={'Fecha incorporación'}
            inputProps={{
              type: 'date',
              name: 'fechaIncorporacion',
              defaultValue: data?.fechaIncorporacion,
              disabled: !isEditing,
            }}
          />
        </div>

        <div className="flex-1">
          <InputForm
            labelText={'Tomo'}
            inputProps={{
              type: 'text',
              name: 'tomo',
              defaultValue: data?.tomo,
              disabled: !isEditing,
            }}
          />
        </div>

        <div className="flex-1">
          <InputForm
            labelText={'Folio'}
            inputProps={{
              type: 'text',
              name: 'folio',
              defaultValue: data?.folio,
              disabled: !isEditing,
            }}
          />
        </div>
      </div>

      <InputForm
        labelText={'Observaciones'}
        inputProps={{
          type: 'textArea',
          name: 'observaciones',
          defaultValue: data?.observaciones,
          disabled: !isEditing,
        }}
      />
    </ContainerSection>
  );
};

export default GeneralSection;
