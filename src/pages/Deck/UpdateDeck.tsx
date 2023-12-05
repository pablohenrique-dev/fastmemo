import React from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../services/api";
import { Head } from "../../utils/Head";
import { Input } from "../../components/Form/Input/Index";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/Button/Index";
import { AlertComponent } from "../../components/Error/Index";
import { isAxiosError } from "axios";

const FormUpdateDeckSchema = z.object({
  name: z
    .string()
    .min(1, "O campo precisa ser preenchido!")
    .max(25, "O campo deve ter no máximo 25 caracteres!"),
});

type FormUpdateDeckData = z.infer<typeof FormUpdateDeckSchema>;

export const UpdateDeck = () => {
  const [URLSearchParams] = useSearchParams();
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUpdateDeckData>({
    resolver: zodResolver(FormUpdateDeckSchema),
  });

  async function onFormSubmit({ name }: FormUpdateDeckData) {
    const deckId = URLSearchParams.get("id");
    try {
      await api.put(`/deck/${deckId}`, { name });
      setMessage("Deck atualizado com sucesso!");
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
      <Head
        title="Atualizar baralho"
        description="Atualize o nome do seu baralho"
      />
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Input
          autoComplete="on"
          label="nome"
          name="name"
          placeholder="Nome do deck"
          defaultValue={URLSearchParams.get("name")!}
          register={register}
          errors={errors.name?.message}
        />
        <Button>Atualizar</Button>
        {message && <AlertComponent status="success">{message}</AlertComponent>}
        {error && <AlertComponent status="error">{error}</AlertComponent>}
      </form>
    </div>
  );
};
