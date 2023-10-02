import React from "react";
import { Input } from "../../components/Form/Input/Index";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/Button/Index";
import { api } from "../../services/api";
import { AlertComponent } from "../../components/Error/Index";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const FormCreateDeckSchema = z.object({
  name: z
    .string()
    .nonempty("O campo precisa ser preenchido!")
    .max(25, "O campo deve ter no máximo 25 caracteres!"),
});

type FormCreateDeckData = z.infer<typeof FormCreateDeckSchema>;

export const AddDeck = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCreateDeckData>({
    resolver: zodResolver(FormCreateDeckSchema),
  });
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  async function onFormSubmit(data: FormCreateDeckData) {
    const { name } = data;
    if (/^\s*$/.test(name)) {
      setError("O nome não pode ser vazio!");
      return;
    }
    try {
      await api.post("/deck", { name: name.trim() });
      setError(null);
      navigate("/");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError(error.message);
        }
      }
    }
  }

  return (
    <div className="p-6 fade-right">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Input
          label="nome"
          name="name"
          placeholder="Nome do deck"
          register={register}
          errors={errors.name?.message}
        />
        <Button>Cadastrar</Button>
        {error && <AlertComponent status="error">{error}</AlertComponent>}
      </form>
    </div>
  );
};
