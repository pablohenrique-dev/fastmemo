import forgettingCurveImg from "/curva-esquecimento.jpg";
import { ReviewExample } from "./components/ReviewExample";

export const About = () => {
  return (
    <section className="p-6 w-full h-full fade-right grid grid-cols-1 lg:grid-cols-[250px_auto] md:gap-8 gap-6">
      <aside className="p-6 rounded border border-slate-default lg:sticky top-6 left-0 h-fit">
        <h3 className="font-bold text-lg">Navegue por tópicos</h3>
        <ul className="flex flex-col gap-3 text-blue-500 list-disc list-inside">
          <li className="mt-4">
            <a href="#sobre-fastmemo">O que é o Fastmemo?</a>
          </li>
          <li>
            <a href="#sobre-repeticao-espacada">
              O que é um sistema de repetição espaçada?
            </a>
          </li>
          <li>
            <a href="#curva-do-esquecimento">
              Entendendo a curva do esquecimento
            </a>
          </li>
          <li>
            <a href="#dicas">
              Como usar um sistema de repetição espaçada de forma otimizada?
            </a>
          </li>
        </ul>
      </aside>
      <div>
        <h2
          id="sobre-fastmemo"
          className="text-2xl font-semibold text-black mb-3"
        >
          O que é o Fastmemo?
        </h2>
        <p className="mb-4">
          O Fastmemo é um sistema de{" "}
          <a
            target="_blank"
            className="underline underline-offset-4 text-blue-500 leading-normal"
            href="https://pt.wikipedia.org/wiki/Repeti%C3%A7%C3%A3o_espa%C3%A7ada"
          >
            repetição espaçada (SRS)
          </a>{" "}
          que auxilia no processo de memorização e aprendizado de forma
          otimizada, utilizando algoritmos para determinar o momento ideal para
          revisar cada pedaço de informação com o objetivo de fortalecer a
          memória. Seu funcionamento baseia-se em um conjunto de baralhos
          (deck), na qual cada carta (card) terá uma informação cadastrada na
          "frente", e a resposta dessa informação no "verso" da carta que só
          será revelada após o usuário clicar no botão "ver resposta".
        </p>
        <p className="mb-4">Veja um exemplo do funcionamento:</p>
        <ReviewExample />
        <p className="mb-6">
          Note que após clicar em <strong>ver resposta</strong>, além da
          resposta será mostrado 4 botões sendo eles: <strong>Resetar</strong>,
          <strong> Difícil</strong>, <strong> Bom</strong> e{" "}
          <strong> Fácil</strong>. Cada um deles determinará um intervalo
          diferente para a próxima revisão da carta. Vale lembrar que o botão
          <strong> Resetar</strong> será responsável por zerar o intervalo de
          revisão (tempo que determinará a data da próxima revisão), dessa
          forma, a carta será tratada como recém adicionada.
        </p>
        <h2
          id="sobre-repeticao-espacada"
          className="text-2xl font-semibold text-black mb-3"
        >
          O que é um sistema de repetição espaçada?
        </h2>

        <p className="mb-6">
          É uma abordagem eficaz para otimizar a aprendizagem e retenção de
          informações ao longo do tempo. Baseando-se no princípio psicológico da
          curva do esquecimento, concebido pela primeira vez na década de 1880
          pelo cientista alemão{" "}
          <a
            target="_blank"
            className="underline underline-offset-4 text-blue-500 leading-normal"
            href="https://en.wikipedia.org/wiki/Hermann_Ebbinghaus"
          >
            Hermann Ebbinghaus
          </a>
          , que descreve a tendência natural do ser humano de esquecer
          informações ao longo do tempo se não forem revisadas, os sistemas de
          repetição espaçada procuram programar revisões de conteúdo no momento
          ideal para fortalecer a memória.
        </p>

        <h2
          id="curva-do-esquecimento"
          className="text-2xl font-semibold text-black mb-3"
        >
          Entendendo a curva do esquecimento
        </h2>

        <p className="mb-4">
          Como citado anteriormente, a{" "}
          <a
            target="_blank"
            className="underline underline-offset-4 text-blue-500 leading-normal"
            href="https://en.wikipedia.org/wiki/Forgetting_curve"
          >
            Curva do Esquecimento
          </a>{" "}
          foi um conceito desenvolvido por Hermann Ebbinghaus, um psicólogo
          alemão do final do século XIX. Ebbinghaus realizou uma série de
          experimentos para investigar a rapidez com que as pessoas esquecem
          informações ao longo do tempo.
        </p>
        <p className="mb-6">
          Em seus experimentos, Ebbinghaus memorizou listas de palavras sem
          sentido e, em seguida, mediu quanto tempo levava para esquecer essas
          palavras. Ele descobriu que o esquecimento de informações segue uma
          curva específica ao longo do tempo. A curva do esquecimento de
          Ebbinghaus sugere que, logo após aprender algo, o esquecimento ocorre
          rapidamente nos primeiros minutos ou horas. No entanto, conforme o
          tempo passa, a taxa de esquecimento diminui e estabiliza. Veja a
          imagem abaixo para entender melhor:
        </p>
        <img
          src={forgettingCurveImg}
          alt="imagem sobre a curva do esquecimento"
          className="mb-4"
        />
        <p className="mb-6">
          A ideia então é que ao longo das revisões a curva do esquecimento
          fique mais "plana", aumentando a probabilidade de se lembrar de
          determinado assunto.
        </p>
        <h2 id="dicas" className="text-2xl font-semibold text-black mb-3">
          Como usar um sistema de repetição espaçada (SRS) de forma otimizada?
        </h2>
        <p>
          Ao iniciar o uso de apps de <strong>SRS</strong> como o fastmemo você
          pode pensar:
        </p>
        <blockquote className="italic m-4">
          "Já que um SRS otimiza a memorização, então vou apenas jogar o máximo
          de informações dentro de um card para aprender essa informação o
          quanto antes."
        </blockquote>
        <p>
          Infelizmente, essa não é a melhor abordagem, pois quanto mais
          informações um card possuir, mais difícil será a memorização do mesmo.
          Então, aqui estão algumas dicas valiosas:
        </p>
        <ol className="list-decimal list-inside my-4 flex flex-col gap-3">
          <li>
            <strong>Quanto mais simples melhor:</strong> Mantenha as informações
            dentro de cada card o mais simples possível;
          </li>
          <li>
            <strong>Informações únicas:</strong> Sempre que possível, adicione
            apenas informações de um único tópico. Por exemplo, caso esteja
            aprendendo um novo idioma, em cada card cadastre frases que possuam
            apenas uma única palavra desconhecida;
          </li>
          <li>
            <strong>Utilize uma linguagem que faça sentido para você:</strong>{" "}
            Adeque as informações dentro de cada card a uma linguagem que você
            consiga entender, evitando sempre que possível o uso excessivo de
            termos técnicos;
          </li>
          <li>
            <strong>Utilize informações pessoais a seu favor:</strong> O uso de{" "}
            <a
              target="_blank"
              className="underline underline-offset-4 text-blue-500 leading-normal"
              href="https://pt.wikipedia.org/wiki/Mnem%C3%B3nica"
            >
              mnemónicos
            </a>{" "}
            juntamente com informações relacionadas ao seu dia a dia também é
            muito útil. Por exemplo, às vezes datas, localizações e nomes que
            fazem parte da sua vida podem ser utilizados como palavras-chave
            para se conectar com o que você está aprendendo;
          </li>
        </ol>
      </div>
    </section>
  );
};
