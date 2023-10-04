export const SplashScreen = ({ user = "" }: { user: string | undefined }) => {
  return (
    <div className="fade-top flex items-center justify-center absolute inset-0 bg-white z-50">
      <h2 className="px-5 fade-right text-2xl font-semibold text-center text-black mb-3 sm:text-3xl lg:text-5xl">
        Olá {user.split(" ")[0]}, seja bem-vindo{"(a)"}!{" "}
        <span className="wave inline-block">🖐</span>
      </h2>
    </div>
  );
};
