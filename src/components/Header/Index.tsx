import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

interface HeaderProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setIsOpen }: HeaderProps) => {
  const { logged } = useAuthContext();
  if (logged)
    return (
      <div className="flex md:hidden fixed top-0 bg-white z-40 justify-between items-center w-full border-b border-slate-default px-6 py-4">
        <Link className="text-xl font-bold inline-block" to="/">
          FASTMEMO
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center w-10 gap-2 p-2"
        >
          <span className="w-full h-[1.6px] bg-black"></span>
          <span className="w-full h-[1.6px] bg-black"></span>
        </button>
      </div>
    );
};
