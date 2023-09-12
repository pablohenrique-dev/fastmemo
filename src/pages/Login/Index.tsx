import { Button } from "../../components/Button/Index";
import { Input } from "../../components/Form/Input/Index";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormUserLoginSchema = z.object({
  email: z
    .string()
    .nonempty("O campo precisa ser preenchido!")
    .email("O formato do e-mail está incorreto!"),
  password: z
    .string()
    .min(5, "o campo precisa ter no mínimo 5 caracteres!")
    .nonempty("O campo precisa ser preenchido!"),
});

type FormUserLoginData = z.infer<typeof FormUserLoginSchema>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserLoginData>({
    resolver: zodResolver(FormUserLoginSchema),
  });

  function onFormSubmit(data: FormUserLoginData) {
    console.log(data);
  }

  return (
    <section className="flex flex-col justify-center items-center w-screen h-screen fade-right">
      <form
        className="p-6 border border-slate-400 flex flex-col rounded-lg w-[400px]"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <h1 className="font-bold text-2xl mb-4 mx-auto capitalize">Login</h1>
        <Input
          placeholder="email@example.com"
          label="email"
          name="email"
          register={register}
          errors={errors.email?.message}
        />

        <Input
          placeholder="••••••••"
          type="password"
          label="senha"
          name="password"
          register={register}
          errors={errors.password?.message}
        />
        <Button>Entrar</Button>
        <p className="mt-4 mx-auto">
          Não possui uma conta?{" "}
          <Link to="/criar-conta" className="font-semibold">
            Criar conta
          </Link>{" "}
        </p>
      </form>
    </section>
  );
};
