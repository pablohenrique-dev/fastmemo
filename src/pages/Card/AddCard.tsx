import React from "react";
import { Input } from "../../components/Form/Input/Index";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/Button/Index";
import { api } from "../../services/api";
import { AlertComponent } from "../../components/Error/Index";
import { Deck } from "../../@types/global";
import { formatDate } from "../../utils/handleDate";
import { Loading } from "../../components/Loading/Index";

const FormCreateCardSchema = z.object({
  front: z.string().nonempty("O campo precisa ser preenchido!"),
  back: z.string().nonempty("O campo precisa ser preenchido!"),
});

type FormCreateCardData = z.infer<typeof FormCreateCardSchema>;

export const AddCard = ({ infoDeck }: { infoDeck: string | null }) => {
  const [deckInfo, setDeckInfo] = React.useState<Deck | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [messageSuccess, setMessageSuccess] = React.useState<string | null>(
    null
  );
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormCreateCardData>({
    resolver: zodResolver(FormCreateCardSchema),
  });

  async function onFormSubmit(data: FormCreateCardData) {
    const { front, back } = data;

    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    if (infoDeck) {
      const cardObj = {
        front: front.trim(),
        back: back.trim(),
        next_review: currentDate.toISOString(),
        deckId: +infoDeck.split("@")[0],
      };

      try {
        await api.post("/card", cardObj);
        setMessageSuccess("Card cadastrado com sucesso!");
        reset({
          front: "",
          back: "",
        });
      } catch (error) {
        setError("Não foi possível cadastrar o card!");
      }
    }
  }

  React.useEffect(() => {
    async function fetchDataDeck() {
      const token = localStorage.getItem("tokenUser");
      const deckId = infoDeck?.split("@")[0];
      if (token && deckId) {
        try {
          setIsLoading(true);
          const { data } = await api.get(`/deck/${deckId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDeckInfo(data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      }
    }
    fetchDataDeck();
  }, [infoDeck]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-right">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Input
          autoComplete="on"
          label="frente"
          name="front"
          placeholder="Frente do card"
          register={register}
          errors={errors.front?.message}
        />
        <Input
          autoComplete="on"
          label="verso"
          name="back"
          placeholder="Verso do card"
          register={register}
          errors={errors.back?.message}
        />
        <Button>Cadastrar</Button>
        {error && <AlertComponent status="error">{error}</AlertComponent>}
        {messageSuccess && (
          <AlertComponent status="success">{messageSuccess}</AlertComponent>
        )}
      </form>
      <aside className="relative">
        {deckInfo && (
          <>
            <h3 className="text-2xl font-semibold text-black mb-3">
              Informações do deck
            </h3>
            <p className="mt-4">
              <strong>Nome:</strong> {deckInfo && deckInfo.name}
            </p>
            <p className="mt-4">
              <strong>Quantidade de cards:</strong>{" "}
              {deckInfo && deckInfo.cards && deckInfo.cards.length}
            </p>
            <p className="mt-4">
              <strong>Data de criação:</strong>{" "}
              {deckInfo && formatDate(deckInfo.created_at)}
            </p>
            <p className="mt-4">
              <strong>Data de atualização:</strong>{" "}
              {deckInfo && formatDate(deckInfo.updated_at)}
            </p>
          </>
        )}
        {isLoading && <Loading />}
      </aside>
    </div>
  );
};
