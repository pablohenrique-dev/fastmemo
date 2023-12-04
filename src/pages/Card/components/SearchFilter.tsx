import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MagnifyingGlass } from "@phosphor-icons/react";

const FormSearchCardSchema = z.object({
  searchInput: z.string(),
});

type FormSearchCardData = z.infer<typeof FormSearchCardSchema>;

export const SearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit } = useForm<FormSearchCardData>({
    resolver: zodResolver(FormSearchCardSchema),
  });

  function onFormSubmit(data: FormSearchCardData) {
    setSearchParams({ search: data.searchInput.trim() });
  }

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex gap-2 items-center mb-4"
    >
      <label htmlFor="search" className="hidden">
        Buscar card:
      </label>

      <input
        type="text"
        id="search"
        {...register("searchInput")}
        placeholder="Busque um card..."
        className="border border-slate-default rounded-sm px-3 py-2"
      />
      <button className="text-white bg-black px-3 py-[10px] rounded">
        <MagnifyingGlass size={20} />
      </button>
    </form>
  );
};
