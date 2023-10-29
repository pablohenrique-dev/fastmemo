import { AppRoutes } from "./routes/Index";

function App() {
  return (
    <section className="md:grid md:grid-cols-[250px_auto] mt-16 md:mt-0">
      <AppRoutes />
    </section>
  );
}

export default App;
