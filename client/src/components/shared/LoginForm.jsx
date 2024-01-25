import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "../../utils/routes";
import { userLogin } from "../../api/auth";
import { useToast } from "../../hooks/use-toast";
import Spinner from "./Spinner";
import { cn } from "../../utils/style";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useUserData from "@/src/hooks/useUserData";

function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("E-mail inválido").required("Obrigatório"),
      password: Yup.string().required("Obrigatório"),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });


  const {setUserFn} = useUserData()
  const navigate = useNavigate();

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {

      localStorage.setItem("user-token", data.token);
      localStorage.setItem("user-data", JSON.stringify(data.user));

      setUserFn(data.user)
      const firstName = data.user.name.split(" ")[0];
      toast({
        title: "Usuário Logado",
        description: `Bem vindo ao teste da TokenLab, ${firstName}`,
      });

      navigate(ROUTES.events);
    },
    onError: (error) => {
      // On error, you can do anything with the error object
      console.log("Error when tried to login the user");
      console.error(error);

      toast({
        title: "Opss...",
        description: "Erro ao tentar logar, verifique os dados informados",
        variant: "destructive",
      });

      formik.resetForm();
    },
  });

  return (
    <div className="flex flex-col border rounded-2xl w-full lg:w-2/3 h-full items-center p-6 lg:p-10">
      <span className="text-2xl text-secondary font-bold text-center">
        Já tem cadastro? Faça seu login
      </span>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col mt-5 p-0 md:p-5 w-full"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-xl text-secondary">
            Email
          </label>
          <Input
            className="border rounded-lg p-2 mt-2"
            placeholder="Digite..."
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isPending}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>
              <span className="text-red-500">{formik.errors.email}</span>
            </div>
          ) : null}
          <label htmlFor="password" className="text-xl text-secondary">
            Senha
          </label>
          <Input
            className="border rounded-lg p-2 mt-2"
            type="password"
            placeholder="Digite..."
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isPending}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>
              <span className="text-red-500">{formik.errors.password}</span>
            </div>
          ) : null}
          <Button
            disabled={isPending}
            type="submit"
            className={cn(
              "rounded-lg p-2 mt-5 flex items-center justify-center font-bold text-lg",
              isPending && "cursor-not-allowed opacity-60"
            )}
          >
            {isPending ? <Spinner /> : "Entrar"}
          </Button>
        </div>
      </form>
      <div className="mt-5">
        <span className="text-gray-600 mr-2">não tem conta ainda?</span>{" "}
        <Link className="underline" to={ROUTES.signup}>
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
