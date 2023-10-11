import { AppRoutes } from "./routes/Index";

function App() {
  return (
    <section className="grid grid-cols-[200px_auto]  md:grid-cols-[250px_auto]">
      <AppRoutes />
    </section>
  );
}

export default App;
