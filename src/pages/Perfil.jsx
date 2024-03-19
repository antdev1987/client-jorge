/* eslint-disable react/prop-types */
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getError } from '../utils/getError';
import { toast } from 'react-toastify';
import axios from 'axios';

import UserAvatar from '../images/user-avatar.png';
import AppContext from '../context/AppProvider';
import formatDateSinHora from '../utils/formatDateSinHora';
import ContainerSection from '../components/ContainerSection';
import PersonalSection from '../components/PersonalSection';
import ChildSection from '../components/ChildSection';
import ContactSection from '../components/ContactSection';
import LaboralSection from '../components/LaboralSection';
import AcademicSection from '../components/AcademicSection';
import ActividadesSection from '../components/ActividadesSection';
import GeneralSection from '../components/GeneralSection';

const Perfil = () => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const { userInfo } = useContext(AppContext);
  const [userPerfilInfo, setUserPerfilInfo] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);

  console.log(userPerfilInfo);

  useEffect(() => {
    const fetchPerfilData = async () => {
      setLoading(true);

      try {
        if (params?.perfilId) {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/perfil/${params?.perfilId}`
          );
          return setUserPerfilInfo(data);
        }

        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/perfil`
        );

        setUserPerfilInfo(data);
      } catch (error) {
        toast.error(getError(error));
      } finally {
        setLoading(false);
      }
    };

    fetchPerfilData();
  }, [params?.perfilId, refresh]);

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleEliminarUsuario = async () => {
    const confirmDelete = confirm('Deseas eliminar este usuario?');

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/users/perfil-eliminar-admin/${
          params.perfilId
        }`
      );
      navigate('/gestionar-usuarios');
      toast.success('Eliminado exitosamente!');
    } catch (error) {
      toast.error(getError(error));
    }
  };

  console.log({ userPerfilInfo, userInfo });

  const handleSave = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);

    const userData = {
      // ...userPerfilInfo,
      direccion: formData.get('direccion'),
      urbanizacion: formData.get('urbanizacion'),
      children: userPerfilInfo?.children || [],


      telefono1WhatsApp: formData.get('telefono1WhatsApp'),
      telefono2: formData.get('telefono2'),
      ciudadNacimiento: formData.get('ciudadNacimiento'),
      email: formData.get('email'),
      linkedin: formData.get('linkedin'),
      facebook: formData.get('facebook'),
      instagram: formData.get('instagram'),
      url: formData.get('url'),
      departamento: formData.get('departamento'),
      provincia: formData.get('provincia'),
      distrito: formData.get('distrito'),

      giroRubroCentroLaboral: formData.get('giroRubroCentroLaboral'),
      centroLaboral: formData.get('centroLaboral'),
      website: formData.get('website'),
      cargo: formData.get('cargo'),
      fechaInicio: formData.get('fechaInicio'),
      sectorLaboral: formData.get('sectorLaboral'),

      universidad: formData.get('universidad'),
      tituloUniversitario: formData.get('tituloUniversitario'),
      yearEgreso: formData.get('yearEgreso'),
      yearTitulacion: formData.get('yearTitulacion'),
      posgrados: userPerfilInfo?.posgrados || [],

      deportePractica: formData.get('deportePractica'),
      pasaTiempos: formData.get('pasaTiempos'),
      temasDeInteres: formData.get('temasDeInteres'),
      fraseFavorita: formData.get('fraseFavorita'),
    };

    console.log(userData);
    // return

    try {
      if (userInfo.isAdmin && params?.perfilId) {
        userData.documentoIdentidad = formData.get('documentoIdentidad');
        userData.numeroDocIdentidad = formData.get('numeroDocIdentidad');
        userData.codigo = formData.get('codigo');
        userData.primerNombre = formData.get('primerNombre');
        userData.segundoNombre = formData.get('segundoNombre');
        userData.apellidoPaterno = formData.get('apellidoPaterno');
        userData.apellidoMaterno = formData.get('apellidoMaterno');
        userData.email = formData.get('email');
        userData.sexo = formData.get('sexo');
        userData.fechaNacimiento = formData.get('fechaNacimiento');
        userData.ultimaCuotaPagada = formData.get('ultimaCuotaPagada');
        userData.habilidad = formData.get('habilidad');
        userData.multaPendiente = formData.get('multaPendiente');
        userData.estado = formData.get('estado');
        userData.fechaIncorporacion = formData.get('fechaIncorporacion');
        userData.tomo = formData.get('tomo');
        userData.folio = formData.get('folio');
        userData.observaciones = formData.get('observaciones');

        console.log(userData);

        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/users/perfil-editar-admin/${
            params?.perfilId
          }`,
          userData
        );
        // navigate(`/perfil/${location.state._id}`, { state: location.state });
      } else {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/users/perfil`,
          userData
        );
      }

      console.log('funciono');
      toast.success('Se edito con exito');
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  if (loading)
    return (
      <div className="container max-w-[1200px] mx-auto my-10">
        <p>Cargando</p>
      </div>
    );

  return (
    <section className="container max-w-[1200px] mx-auto my-10">
      <div className="flex items-center gap-5 mb-5">
        {params?.perfilId && userInfo.isAdmin && (
          <button
            className="font-bold cursor-pointer"
            onClick={() => navigate(-1)}
          >
            {'< Volver Atrás'}
          </button>
        )}

        <button
          className="p-1 bg-blue-400 text-white uppercase px-5 rounded-xl"
          onClick={handleEdit}
        >
          {isEditing ? 'Desactivar' : 'Activar'} Modo Editar
        </button>

        {params?.perfilId && userInfo.isAdmin && (
          <button
            className="p-1 bg-red-400 text-white uppercase px-5 rounded-xl"
            onClick={handleEliminarUsuario}
          >
            Eliminar este usuario
          </button>
        )}
      </div>

      <form className="container" onSubmit={handleSave}>
        <PersonalSection
          isAdmin={userInfo.isAdmin}
          isEditing={isEditing}
          data={userPerfilInfo}
          id={userPerfilInfo._id}
          setRefresh={setRefresh}
        >
          <ChildSection
            isEditing={isEditing}
            data={userPerfilInfo?.children || []}
            setUserPerfilInfo={setUserPerfilInfo}
          />
        </PersonalSection>

        <ContactSection
          isAdmin={userInfo.isAdmin}
          data={userPerfilInfo}
          isEditing={isEditing}
        />

        <LaboralSection data={userPerfilInfo} isEditing={isEditing} />

        <AcademicSection
          data={userPerfilInfo}
          isEditing={isEditing}
          setUserPerfilInfo={setUserPerfilInfo}
        />

        <ActividadesSection data={userPerfilInfo} isEditing={isEditing} />

        {userInfo.isAdmin && params?.perfilId && (
          <GeneralSection data={userPerfilInfo} isEditing={isEditing} />
        )}

        {isEditing && (
          <div className="text-center">
            <button className="bg-green-700 text-white uppercase text-2xl px-5 w-full max-w-lg py-2 rounded-lg">
              grabar / modificar
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default Perfil;
