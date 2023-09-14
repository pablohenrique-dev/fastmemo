import React from "react";
import { Card } from "../../components/Card/Index";

export const Home = () => {
  return (
    <div className="p-6 fade-right">
      <h2 className="text-[32px] font-semibold text-black mb-3">Meus cards</h2>
      <div className="grid grid-cols-3 gap-6">
        <Card link="12" />
        <Card link="13" />
        <Card link="14" />
      </div>
    </div>
  );
};
