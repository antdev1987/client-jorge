import NewPasswordAvatar from "../images/new-password-avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { getError } from "../utils/getError";
import { toast } from "react-toastify";
import axios from "axios";

const NewPassword = () => {
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const userData = {
      password: e.target.password.value.trim(),
      codeResetPass: e.target.verificationCode.value.trim(),
    };

    if ([userData.password, userData.codeResetPass].includes("")) {
      return toast.error("Llena el espacio disponible!");
    } else if (userData.password !== e.target.passwordVerification.value) {
      return toast.error("Contraseñas no son iguales!");
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/cambiarpassword`,
        userData
      );
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <section className="max-w-[25rem] mx-auto my-32">
      <img src={NewPasswordAvatar} className="max-w-[10rem] mx-auto" />
      {/* TITLE */}
      <h2 className="text-gray-600 mt-2 text-center text-[1.3rem]">
        ¡Recupera Tú Cuenta!
      </h2>
      <p className="text-center bg-yellow-500 rounded mt-3 py-4">
        Enviamos un código de verificación a tu gmail.
      </p>

      <form onSubmit={handleForgotPassword} action="">
        {/* INPUTS */}
        <div className="my-6">
          <input
            className="block w-full py-2 px-3 border-b-[.1rem] border-[#3a7fc2] outline-none mb-5"
            type="text"
            placeholder="Contraseña Nueva"
            name="password"
          />
          <input
            className="block w-full py-2 px-3 border-b-[.1rem] border-[#3a7fc2] outline-none"
            type="text"
            placeholder="Verificación de la Contraseña Nueva"
            name="passwordVerification"
          />
          <input
            className="mt-5 block w-full py-2 px-3 border-b-[.1rem] border-[#3a7fc2] outline-none"
            type="text"
            placeholder="Código de Verificación"
            name="verificationCode"
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          className="bg-[#3A7FC2] text-white hover:bg-[#326597] rounded py-2 uppercase tracking-wider block w-full transition-all duration-300"
          type="submit"
        >
          Recuperar
        </button>
      </form>

      <div className="my-4">
        <p className="text-center font-[500] text-gray-600 mb-2">
          Recupera tu cuenta mediante proporcionando tu nueva contraseña.
        </p>

        <p className="text-center font-[500] text-gray-600">
          ¿Recordaste Tú{" "}
          <Link to={"/"} className="text-sky-600">
            Contraseña?
          </Link>
        </p>
      </div>
    </section>
  );
};

export default NewPassword;
