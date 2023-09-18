import React from "react";
import { Input } from "../../components/Form/Input/Index";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../../contexts/AuthContext";
import { Button } from "../../components/Button/Index";
import { ImageSquare } from "@phosphor-icons/react";
import { UPDATE_USER } from "../../services/api";
import { AlertComponent } from "../../components/Error/Index";

interface ImageState {
  preview: string;
  raw: File | null;
}

const FormUserAccountSchema = z.object({
  name: z.string().nonempty("O campo precisa ser preenchido!"),
  email: z
    .string()
    .nonempty("O campo precisa ser preenchido!")
    .email("O formato do e-mail está incorreto!"),
  old_password: z
    .string()
    .nonempty("O campo senha precisa ser preenchido para a atualização!")
    .min(5, "o campo precisa ter no mínimo 5 caracteres!"),
  password: z.string(),
});

type FormUserAccountData = z.infer<typeof FormUserAccountSchema>;

export const Account = () => {
  const [img, setImg] = React.useState<ImageState>({ preview: "", raw: null });
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const { user, setLogged } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserAccountData>({
    resolver: zodResolver(FormUserAccountSchema),
  });

  async function updateUser(
    name: string,
    email: string,
    old_password: string,
    password: string
  ) {
    const token = localStorage.getItem("tokenUser");
    if (token) {
      const response = await UPDATE_USER(
        name,
        email,
        old_password,
        password,
        token
      );
      if (response.status === 400) {
        setError(response.message);
        setMessage(null);
      } else if (response === 200) {
        setError(null);
        setMessage("Usuário atualizado com sucesso!");
        setTimeout(() => {
          setLogged(false);
          localStorage.removeItem("tokenUser");
        }, 2000);
      }
    }
  }

  function onFormSubmit(data: FormUserAccountData) {
    const { name, email, old_password, password } = data;
    const confirmUpdate = confirm(
      "Tem certeza que deseja atualizar suas informações?"
    );
    if (confirmUpdate) {
      updateUser(name, email, old_password, password);
    }
  }

  function handleImageChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files && target.files[0]) {
      setImg({
        preview: URL.createObjectURL(target.files[0]),
        raw: target.files[0],
      });
    }
  }

  return (
    <section className="p-6 w-full h-full">
      <div className="flex flex-col fade-right">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[32px] font-semibold text-black">Minha conta</h2>
          <p>
            {" "}
            <strong>Criada em:</strong> 15/09/2023{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_200px]">
          <form className="w-auto" onSubmit={handleSubmit(onFormSubmit)}>
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
              label="senha"
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
            {error && <AlertComponent status="error">{error}</AlertComponent>}
            {message && (
              <AlertComponent status="success">{message}</AlertComponent>
            )}
          </form>
          <div>
            <h3 className="mb-1 inline-block text-lg font-semibold">
              Foto de perfil
            </h3>

            <label
              htmlFor="photo"
              className="relative w-[200px] flex flex-col justify-center items-center rounded-full border border-dashed border-black aspect-square cursor-pointer"
            >
              {img.preview ? (
                <img
                  src={img.preview}
                  className="absolute inset-0 aspect-square object-cover pointer-events-none "
                />
              ) : (
                <>
                  <ImageSquare size={32} className="mb-1" />
                  Escolha uma foto
                </>
              )}
            </label>

            <input
              type="file"
              id="photo"
              accept="image/*"
              className="sr-only"
              onChange={handleImageChange}
            />
            <span className=" inline-block mt-6 bg-slate-100 p-4 rounded">
              <strong>OBS:</strong> Ao atualizar as informações de login, será
              necessário efetuar login novamente.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
