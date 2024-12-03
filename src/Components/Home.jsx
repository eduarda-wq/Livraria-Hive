import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Home() {
  const [livros, setLivros] = useState({ lancamentos: [], destaques: [], infantis: [] });
  const [carrinho, setCarrinho] = useState(0);
  const [animarCarrinho, setAnimarCarrinho] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // Estado para armazenar a largura da tela
  const [carouselPercentage, setCarouselPercentage] = useState(20); // Porcentagem inicial

  const carregarLivros = async () => {
    try {
      const response = await fetch("http://localhost:3000/livros");
      if (response.ok) {
        const livrosSalvos = await response.json();
        const categorias = {
          lancamentos: livrosSalvos.filter((livro) => livro.secao === "lancamentos"),
          destaques: livrosSalvos.filter((livro) => livro.secao === "destaques"),
          infantis: livrosSalvos.filter((livro) => livro.secao === "infantis"),
        };
        setLivros(categorias);
      } else {
        console.error("Erro ao carregar livros:", response.status);
      }
    } catch (error) {
      console.error("Erro na conexão com o servidor:", error);
    }
  };

  const carregarCarrinho = async () => {
    try {
      const response = await fetch("http://localhost:3000/carrinho");
      if (response.ok) {
        const itensCarrinho = await response.json();
        setCarrinho(itensCarrinho.length);
      } else {
        console.error("Erro ao carregar carrinho:", response.status);
      }
    } catch (error) {
      console.error("Erro na conexão com o servidor:", error);
    }
  };

  const adicionarAoCarrinho = async (livro) => {
    if (livro.estoque <= 0) {
      alert("Livro sem estoque disponível!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/carrinho", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livro),
      });

      if (response.ok) {
        const novoEstoque = livro.estoque - 1;

        await fetch(`http://localhost:3000/livros/${livro.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estoque: novoEstoque }),
        });

        setLivros((prevLivros) => {
          const novaCategoria = prevLivros[livro.secao].map((item) =>
            item.id === livro.id ? { ...item, estoque: novoEstoque } : item
          );
          return { ...prevLivros, [livro.secao]: novaCategoria };
        });

        setCarrinho((prev) => prev + 1);
        setAnimarCarrinho(true);
        setTimeout(() => setAnimarCarrinho(false), 500);
      } else {
        console.error("Erro ao adicionar ao carrinho:", response.status);
      }
    } catch (error) {
      console.error("Erro na conexão com o servidor:", error);
    }
  };

  const renderLivros = (livros) =>
    livros.map((livro) => (
      <div
        key={livro.id}
        className="flex flex-col items-center justify-center border rounded-lg bg-white w-56 h-[28rem] shadow-md mx-2"
      >
        <Link to={`/livro/${livro.id}`}>
          <div className="w-full h-60 mb-2">
            <img
              src={livro.imagem}
              alt={livro.titulo}
              className="w-full h-full object-cover rounded"
            />
          </div>
        </Link>
        <p className="text-xs text-gray-500 text-center w-auto">{livro.genero}</p>
        <h3 className="font-semibold text-center text-[1rem] w-auto">
          {livro.titulo}
        </h3>
        <p className="font-bold text-base text-black mb-1">R$ {livro.preco.toFixed(2)}</p>
        <p className="text-xs text-gray-500 text-center">
          Em até 2x de R$ {(livro.preco / 2).toFixed(2)} sem juros
        </p>
        {livro.estoque > 0 ? (
          <button
            onClick={() => adicionarAoCarrinho(livro)}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5 mr-2" />
            ADICIONAR
          </button>
        ) : (
          <button
            disabled
            className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
          >
            INDISPONÍVEL
          </button>
        )}
      </div>
    ));

  useEffect(() => {
    carregarLivros();
    carregarCarrinho();

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth <= 480) {
      setCarouselPercentage(90); 
    } else if (screenWidth <= 768) {
      setCarouselPercentage(50); 
    } else if (screenWidth <= 1024) {
      setCarouselPercentage(33); 
    } else {
      setCarouselPercentage(20); 
    }
  }, [screenWidth]);

  return (
    <>
      <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true} interval={1500} showArrows={false} className="h-[20rem] mb-[0rem] sm:mb-[20rem]" >
        <div>
          <img src="teste1.png" className="w-[27.5rem] h-[15.3125rem] sm:w-[ 90rem] sm:h-[27.0625rem]"/>

        </div>
        <div>
          <img src="teste2.png" className="w-[27.5rem] h-[15.3125rem] sm:w-[ 90rem] sm:h-[27.0625rem]" />

        </div>
      </Carousel>

      <main className="px-8 pt-0">
        <section>
          <h1 className="text-4xl font-bold mb-12 text-orange-400">Lançamentos</h1>
          <Carousel
            showThumbs={false}
            showStatus={false}
            centerMode={true}
            centerSlidePercentage={carouselPercentage} 
            infiniteLoop={true} 
            autoPlay={true} 
            interval={3000} 
          >
            {renderLivros(livros.lancamentos)}
          </Carousel>
        </section>
        <section>
          <h1 className="text-4xl font-bold mb-12 mt-20 text-orange-400">Destaques</h1>
          <Carousel
            showThumbs={false}
            showStatus={false}
            centerSlidePercentage={carouselPercentage} 
            infiniteLoop={true} 
            autoPlay={true} 
            interval={3000} 
          >
            {renderLivros(livros.destaques)}
          </Carousel>
        </section>
        <section>
          <h1 className="text-4xl font-bold mb-12 mt-20 text-orange-400">Livros Infantis</h1>
          <Carousel
            showThumbs={false}
            showStatus={false}
            centerSlidePercentage={carouselPercentage} 
            infiniteLoop={true} 
            autoPlay={true} 
            interval={3000} 
          >
            {renderLivros(livros.infantis)}
          </Carousel>
        </section>
        <div
          className={`cursor-pointer fixed bottom-4 right-4 bg-orange-500 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-transform ${animarCarrinho ? "scale-110" : "scale-100"
            }`}
        >
          <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6 mr-2" />
          <span>{carrinho}</span>
        </div>
      </main>
    </>
  );
}
