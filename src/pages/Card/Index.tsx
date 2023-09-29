import React from "react";
import { Route, Routes } from "react-router-dom";
import { NavLinkComponent } from "../../components/NavLink/Index";
import { Cards, Note, PlusSquare } from "@phosphor-icons/react";
import { AddCard } from "./AddCard";
import { CardList } from "./CardList";
import { ReviewCard } from "./ReviewCard";
import { decodeSpecialString } from "../../utils/handleString";

export const Deck = () => {
  const [infoDeck, setInfoDeck] = React.useState<string | null>(null);
  const [titleDeck, setTitleDeck] = React.useState<string | null>(null);

  React.useEffect(() => {
    const pathname = window.location.pathname;
    const [baseUrl, path, idAndName] = pathname.split("/");

    setInfoDeck(idAndName);

    const arrayIdAndName = idAndName.split("@");
    setTitleDeck(arrayIdAndName[1]);
  }, []);

  return (
    <div className="p-6 fade-right">
      <h2 className="text-[32px] font-semibold text-black mb-3">
        Baralho{titleDeck && ": " + decodeSpecialString(titleDeck)}
      </h2>
      <nav className="flex gap-2 mb-6 pb-4 border-b border-slate-default">
        <NavLinkComponent to={`/cards/${infoDeck}`} end={true}>
          <Cards size={20} />
          Todos os cards
        </NavLinkComponent>
        <NavLinkComponent to={`${infoDeck}/revisar`}>
          <Note size={20} />
          Revisar
        </NavLinkComponent>
        <NavLinkComponent to={`${infoDeck}/adicionar-card`}>
          <PlusSquare size={20} />
          Adicionar card
        </NavLinkComponent>
      </nav>
      <Routes>
        <Route path="/:infoDeck" element={<CardList infoDeck={infoDeck} />} />
        <Route
          path="/:infoDeck/revisar"
          element={<ReviewCard infoDeck={infoDeck} />}
        />
        <Route
          path="/:infoDeck/adicionar-card"
          element={<AddCard infoDeck={infoDeck} />}
        />
      </Routes>
    </div>
  );
};
