import ForgotPasswordAvatar from "../images/forgot-password-avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { getError } from "../utils/getError";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const userData = {
      email: e.target.email.value.trim(),
    };

    if ([userData.email].includes("")) {
      return toast.error("Llena el espacio disponible!");
    }

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/olvidepassword`,
        userData
      );
      navigate("/NewPassword");
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-[25rem] mx-auto my-32">
      <img src={ForgotPasswordAvatar} className="max-w-[10rem] mx-auto" />
      {/* TITLE */}
      <h2 className="text-gray-600 mt-2 text-center text-[1.3rem]">
        {/* ¿Olvidaste Tú Contraseña? */}
        Enviaremos un código de seguridad para que cambies tu contraseña
      </h2>

      <form onSubmit={handleForgotPassword}>
        {/* INPUTS */}
        <div className="my-8">
          <input
            className="block w-full py-2 px-3 border-b-[.1rem] border-[#3a7fc2] outline-none"
            type="email"
            name="email"
            placeholder="Correo electrónico"
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          className="bg-[#3A7FC2] text-white hover:bg-[#326597] rounded py-2 uppercase tracking-wider block w-full transition-all duration-300"
          type="submit"
          disabled={loading}
        >
          {loading ? "...enviando" : "Enviar"}
        </button>
      </form>

      <div className="my-4">
        {/* <p className="text-center font-[500] text-gray-600 mb-2">
          Recupera tu cuenta mandando tu email/correo.
        </p> */}

        <p className="text-center font-[500] text-gray-600">
          {" "}
          Iniciar sesión
          <Link to={"/"} className="text-[#3A7FC2]"> aquí</Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
