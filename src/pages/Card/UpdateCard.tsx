import React from "react";
import { Input } from "../../components/Form/Input/Index";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/Button/Index";
import { useSearchParams } from "react-router-dom";
import { api } from "../../services/api";
import { Card } from "../../@types/global";
import { AlertComponent } from "../../components/Error/Index";

const FormUpdateInfoCardSchema = z.object({
  front: z.string().nonempty("O campo precisa ser preenchido!"),
  back: z.string().nonempty("O campo precisa ser preenchido!"),
});

type FormUpdateInfoCardData = z.infer<typeof FormUpdateInfoCardSchema>;

export const UpdateCard = ({ infoDeck }: { infoDeck: string | null }) => {
  const [searchParams] = useSearchParams();
  const [card, setCard] = React.useState<Card | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [idCard, setIdCard] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUpdateInfoCardData>({
    resolver: zodResolver(FormUpdateInfoCardSchema),
  });

  async function onFormSubmit(data: FormUpdateInfoCardData) {
    if (!idCard) return;
    const confirmUpdateCard = confirm("Deseja realmente atualizar este card?");
    if (!confirmUpdateCard) return;
    try {
      await api.put(`/card/${idCard}`, data);
      setSuccess("Card atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      setError("Ocorreu um erro ao atualizar o card!");
    }
  }

  React.useEffect(() => {
    const idCardSearchParam = searchParams.get("idCard");
    const deckId = infoDeck?.split("@")[0];
    async function fetchDataCard() {
      if (!idCardSearchParam || !deckId) return;

      setIdCard(idCardSearchParam);

      try {
        const { data } = await api.get(`/card/${deckId}/${idCardSearchParam}`);
        setCard(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDataCard();
  }, [searchParams, infoDeck]);

  return (
    <div className="fade-right">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Input
          autoComplete="on"
          label="Frente"
          name="front"
          placeholder="Frente do card"
          register={register}
          errors={errors.front?.message}
          defaultValue={card?.front}
        />
        <Input
          autoComplete="on"
          label="Verso"
          name="back"
          placeholder="Verso do card"
          register={register}
          errors={errors.front?.message}
          defaultValue={card?.back}
        />
        <Button>Atualizar</Button>
        {success && <AlertComponent status="success">{success}</AlertComponent>}
        {error && <AlertComponent status="error">{error}</AlertComponent>}
      </form>
    </div>
  );
};
