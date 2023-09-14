import React from "react";
import { Input } from "../../components/Form/Input/Index";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../../contexts/AuthContext";
import { Button } from "../../components/Button/Index";
import PhotoAccount from "../../assets/default_perfil.jpg";

const FormUserAccountSchema = z.object({
  name: z.string(),
  email: z.string().email("O formato do e-mail está incorreto!"),
  old_password: z
    .string()
    .min(5, "o campo precisa ter no mínimo 5 caracteres!")
    .nonempty("O campo precisa ser preenchido!"),
  password: z.string(),
});

type FormUserAccountData = z.infer<typeof FormUserAccountSchema>;

export const Account = () => {
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserAccountData>({
    resolver: zodResolver(FormUserAccountSchema),
  });

  function onFormSubmit(data: FormUserAccountData) {
    const { name, email, old_password, password } = data;
    console.log({ name, email, old_password, password });
    // login(email, password);
  }

  return (
    <section className="p-6 w-full h-full">
      <div className="flex flex-col fade-right">
        <h2 className="text-[32px] font-semibold text-black mb-3">
          Minha conta
        </h2>
        <div className="flex gap-8">
          <form className="w-[680px]" onSubmit={handleSubmit(onFormSubmit)}>
            <Input
              label="nome"
              name="name"
              register={register}
              defaultValue={user?.name}
              errors={errors.name?.message}
            />
            <Input
              label="email"
              name="email"
              register={register}
              defaultValue={user?.email}
              errors={errors.email?.message}
            />
            <Input
              placeholder="••••••••"
              label="senha antiga"
              name="old_password"
              type="password"
              register={register}
              errors={errors.old_password?.message}
            />
            <Input
              placeholder="••••••••"
              label="nova senha"
              name="password"
              type="password"
              register={register}
              errors={errors.password?.message}
            />
            <Button>Atualizar perfil</Button>
          </form>
          <div>
            <h3 className="mb-1 inline-block text-lg font-semibold">
              Foto de perfil
            </h3>
            <img
              className="border-[7px] border-black rounded-full"
              src={PhotoAccount}
              alt="Foto com fundo branco e icone representando um usuário"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
