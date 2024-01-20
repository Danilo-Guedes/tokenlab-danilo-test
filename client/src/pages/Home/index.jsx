import { Typewriter } from "react-simple-typewriter";
import LoginForm from "../../components/shared/LoginForm";
import { useEffect } from "react";
import { checkAuth } from "../../utils/auth";
import { useNavigate } from "react-router";
import { ROUTES } from "../../utils/routes";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasUserData = checkAuth();
    if (hasUserData) {
      navigate(ROUTES.posts);
    }
  }, []);

  return (
    <div className="h-full p-2 md:p-5 m-2 flex items-center justify-center ">
      <section className="flex flex-col items-center container">
        <h1 className="text-3xl mt-10">Olá Devs !!</h1>
        <h1 className="text-3xl mt-10 text-center">
          <Typewriter
            words={[
              "Sejam bem vindo ao meu teste para a vaga de fullstack da TokenLab!",
              "Espero que gostem da aplicação!",
              "Obrigado pela oportunidade!",
              "Stack do front: Vite, React, Tailwind, React-Query",
              "Stack do back: Node, Express, MongoDB",
            ]}
            cursor
            cursorBlinking
            cursorColor="rgb(96 165 250 / 1)"
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
            loop={true}
          />
        </h1>
        <div className="flex flex-col items-center  lg:flex-row mt-10 w-full border rounded-lg overflow-hidden">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <img
              src="/logos/logo-tokenlab.jpeg"
              className="w-full self-center md:w-96"
            />
            <img src="/images/foto-danilo.jpg" className="w-full xl:w-1/2  2xl:w-8/12" />
          </div>
          <div className="w-full   lg:w-10/12 xl:w-1/2 flex flex-col items-center justify-center p-2  xl:p-10 mt-10 md:mt-0">
            <LoginForm />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
