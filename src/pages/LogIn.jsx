import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "../images/user-avatar.png";
import AppContext from "../context/AppProvider";
import { getError } from "../utils/getError";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const LogIn = () => {
  const { setUserInfo } = useContext(AppContext);
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: e.target.email.value.trim(),
      password: e.target.password.value.trim(),
    };

    // Form validation
    if ([userData.email, userData.password].includes("")) {
      return toast.error("Llena los espacios disponibles!");
    }

    // TODO: Login user
    try {
      setLoginLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );
      setUserInfo(data);
      navigate("/perfil");
      toast.success("Accedido exitosamente!");
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <section className="max-w-[25rem] mx-auto my-32">
      <img src={UserAvatar} className="max-w-[10rem] mx-auto" />
      {/* TITLE */}
      {/* <h2 className="text-gray-600 mt-2 text-center text-[1.3rem]">
        Iniciar Sesión
      </h2> */}

      <form onSubmit={onHandleSubmit}>
        {/* INPUTS */}
        <div className="my-8">
          <input
            className="block w-full py-2 px-3 border-b-[.1rem] border-[#3a7fc2] outline-none mb-5"
            type="email"
            name="email"
            placeholder="Correo electrónico"
          />
          <input
            className="block w-full py-2 px-3 border-b-[.1rem] border-[#3a7fc2] outline-none"
            type="text"
            name="password"
            placeholder="Contraseña"
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          className="bg-[#3A7FC2] text-white hover:bg-[#326597] rounded py-2 uppercase tracking-wider block w-full transition-all duration-300"
          type="submit"
          disabled={loginLoading}
        >
          {loginLoading ? "...cargando" : "Iniciar Sesión"}
        </button>
      </form>
      <p className="text-center py-5 font-[500] text-gray-600">
        Restablecer mi{" "}
        <Link to={"/olvide-password"} className="text-sky-600">
          contraseña
        </Link>
      </p>
    </section>
  );
};

export default LogIn;
