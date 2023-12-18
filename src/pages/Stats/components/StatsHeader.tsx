import React from "react";
import { ReviewsPerDay } from "../../../hooks/useStatistics";

interface StatsHeaderProps {
  totalReviews: number;
  reviewsPerDay: ReviewsPerDay[] | null;
  reviewsToday: number;
  averageDailyReview: number;
  initialDate: string;
  finalDate: string;
  setInitialDate: React.Dispatch<React.SetStateAction<string>>;
  setFinalDate: React.Dispatch<React.SetStateAction<string>>;
}

export const StatsHeader = ({
  totalReviews,
  reviewsPerDay,
  reviewsToday,
  averageDailyReview,
  initialDate,
  finalDate,
  setInitialDate,
  setFinalDate,
}: StatsHeaderProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);

  function handleOpenTooltip(e: React.MouseEvent) {
    e.preventDefault();
    setIsTooltipOpen((tooltipState) => !tooltipState);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 text-black">
      <form className="w-full border border-slate-default rounded-md flex flex-col gap-6 p-4 sm:p-6">
        <div className="w-fit flex gap-4 items-center relative">
          <h3 className="text-3xl font-semibold">Período</h3>
          <button
            title="tooltip"
            className="px-2 h-[20px] flex items-center justify-center aspect-square rounded-full text-white bg-black opacity-75"
            onClick={handleOpenTooltip}
          >
            <span>?</span>
          </button>
          {isTooltipOpen && (
            <p className="p-2 text-sm bg-black text-white rounded opacity-75 w-[140px] absolute right-[-148px] md:right-[-156px] top-0">
              A data inicial precisa ser menor que a data final!
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label
              className="text-xl font-semibold opacity-75 cursor-pointer"
              htmlFor="initialDate"
            >
              Inicio
            </label>
            <input
              className="border border-slate-default rounded p-1 sm:p-2 cursor-pointer"
              type="date"
              id="initialDate"
              name="initialDate"
              value={initialDate}
              onChange={({ target }) => setInitialDate(target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label
              className="text-xl font-semibold opacity-75 cursor-pointer"
              htmlFor="finalDate"
            >
              Final
            </label>
            <input
              className="border border-slate-default rounded p-1 sm:p-2 cursor-pointer"
              type="date"
              id="finalDate"
              name="finalDate"
              value={finalDate}
              onChange={({ target }) => setFinalDate(target.value)}
            />
          </div>
        </div>
      </form>
      <div className="w-full border border-slate-default flex flex-col gap-6 rounded-md p-4 sm:p-6">
        <h3 className="text-3xl font-semibold">Resumo</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p className="text-lg sm:text-xl opacity-75">
            <strong>Total:</strong> {totalReviews} revisões
          </p>
          <p className="text-lg sm:text-xl opacity-75">
            <strong>Hoje:</strong> {reviewsToday} revisões
          </p>
          <p className="text-lg sm:text-xl opacity-75">
            <strong>Média:</strong> {averageDailyReview.toFixed(2)} revisões
          </p>
          <p className="text-lg sm:text-xl opacity-75">
            <strong>Dias revisados:</strong>{" "}
            {reviewsPerDay ? reviewsPerDay.length : 0}
          </p>
        </div>
      </div>
    </div>
  );
};
