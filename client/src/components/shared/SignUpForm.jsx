import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "../../utils/routes";
import { createUser } from "../../api/user";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { cn } from "../../utils/style";
import Spinner from "./Spinner";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

const validationSchema = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Senhas não conferem")
    .required("Confirmação de senha é obrigatória"),
});

function SignUpForm() {
  const navigate = useNavigate();

  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {

      toast({
        title: "Sucesso!",
        description: `Usuário criado com sucesso!!`,
      });
      navigate(ROUTES.home);
    },
    onError: (error) => {
      console.log("Error creating user", error);

      if (error?.response?.data?.message?.includes("already has a user associated")) {
        toast({
          title: "Opss...",
          description:
            "O E-mail informado já contém um usuário ssociado, tente outro e-mail ou clique em esqueci minha senha",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Opss...",
          description:
            "Erro ao tentar criar o usuário, verifique os dados informados",
          variant: "destructive",
        });
      }
    },
  });

  return (
    <div className="flex flex-col border rounded-2xl w-full lg:w-10/12 xl:w-12/12  h-full items-center p-6 lg:p-10">
      <span className="text-2xl text-primary font-bold text-center">
        Preencha para fazer o seu Cadastro
      </span>
      <Formik // usando os components react do Formik para mostrar outra abordagem de formulário sem utilizar o hook
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => mutate(values)}
      >
        <Form className="flex flex-col mt-5 p-5 w-full">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="nameinput" className="text-xl text-secondary">
                Nome
              </label>
              <Field
                className="border rounded-lg p-2 mt-2"
                type="text"
                placeholder="Digite..."
                id="nameinput"
                name="name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="emailinput" className="text-xl text-secondary">
                Email
              </label>
              <Field
                className="border rounded-lg p-2 mt-2"
                type="email"
                placeholder="Digite..."
                id="emailinput"
                name="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="passwordinput" className="text-xl text-secondary">
                Senha
              </label>
              <Field
                className="border rounded-lg p-2 mt-2"
                type="password"
                placeholder="Digite..."
                id="passwordinput"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="confirmpasswordinput"
                className="text-xl text-secondary"
              >
                Confirme a Senha
              </label>
              <Field
                className="border rounded-lg p-2 mt-2"
                type="password"
                placeholder="Digite..."
                id="confirmpasswordinput"
                name="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500"
              />
            </div>
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
          <div className="mt-5">
            <span className="text-secondary mr-2">Já tem cadastro?</span>{" "}
            <Link className="underline" to={ROUTES.home}>
              Faça o Login
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default SignUpForm;
