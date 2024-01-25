import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/src/components/ui/input";

import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/hooks/use-toast";
import { useNavigate } from "react-router";
import { ROUTES } from "@/src/utils/routes";
import {  LogOutIcon } from "lucide-react";
import { logout } from "@/src/utils/auth";

const validationSchema = Yup.object({
    name: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    user_since: Yup.date().required("Data de início é obrigatória"),
});

function ProfileForm({ user }) {
    const { toast } = useToast();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: user.name,
            email: user.email,
        },
        validationSchema,
        onSubmit: (values) => {
            console.log({ values });
        },
    });

    const handleLogout = () => {
        logout()
        toast({
            title: "Até Mais",
            description: `Você foi desconectado com sucesso!`,
            variant: "success",
            
        });
        navigate(ROUTES.home)
    };

    return (
        <form
            className="mt-12 flex flex-col items-center justify-center w-full gap-5 lg:px-52"
            onSubmit={formik.handleSubmit}
        >
            <div className="my-10">
                <div className="overflow-hidden rounded-full w-52 h-52">
                    <img src="/images/brad-pitt.webp" />
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full gap-1">
                <label
                    htmlFor="event-name"
                    className="text-lg text-secondary font-bold text-center mb-5"
                >
                    Nome
                </label>
                <Input
                    disabled
                    id="name"
                    className="w-full border border-primary rounded-lg p-2"
                    placeholder="Preencha..."
                    {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                    <span className="text-sm text-red-500">{formik.errors.name}</span>
                ) : null}
            </div>
            <div className="flex flex-col items-start justify-center w-full gap-1">
                <label
                    htmlFor="event-description"
                    className="text-lg text-secondary font-bold text-center mb-5"
                >
                    E-mail
                </label>
                <Input
                    disabled
                    id="email"
                    className="w-full border border-primary rounded-lg p-2"
                    placeholder="Preencha..."
                    {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                    <span className="text-sm text-red-500">{formik.errors.email}</span>
                ) : null}
            </div>
            <Button className="w-full my-10" variant="destructive" onClick={handleLogout}>
                <LogOutIcon className="mr-5" />
                Sair
            </Button>
        </form>
    );
}

export default ProfileForm;
      

