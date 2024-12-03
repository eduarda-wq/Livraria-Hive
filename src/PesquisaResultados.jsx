import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { Header } from "./Components/Header"
import { Footer } from "./Components/Footer"

export default function PesquisaResultados() {
  const [livros, setLivros] = useState([])
  const [pesquisa, setPesquisa] = useState("")
  const location = useLocation()

  // Recupera o termo de pesquisa da URL (caso use query params)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const termoPesquisa = params.get("search")
    setPesquisa(termoPesquisa || "")
  }, [location])

  const carregarLivros = async () => {
    try {
      const response = await fetch("https://livraria-hive-api.vercel.app/livros")
      if (response.ok) {
        const livrosSalvos = await response.json()
        // Filtra livros com base no termo de pesquisa
        const livrosFiltrados = livrosSalvos.filter(
          (livro) =>
            livro.titulo.toLowerCase().includes(pesquisa.toLowerCase()) ||
            livro.genero.toLowerCase().includes(pesquisa.toLowerCase())
        )
        setLivros(livrosFiltrados)
      } else {
        console.error("Erro ao carregar livros:", response.status)
      }
    } catch (error) {
      console.error("Erro na conexão com o servidor:", error)
    }
  }

  useEffect(() => {
    if (pesquisa) {
      carregarLivros()
    }
  }, [pesquisa])

  const renderLivros = (livros) => {
    return livros.map((livro) => (
      <div
        key={livro.id}
        className="flex flex-col items-center p-3 m-2 border rounded-lg bg-white w-56 h-auto shadow-md mx-2"
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
        <p className="text-xs text-gray-500 text-center w-full truncate">{livro.genero}</p>
        <h3 className="text-center text-[1rem]">{livro.titulo}</h3>
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
    ))
  }

  return (
    <>
      <Header />
      <div className="p-8 pb-56">
        <h1 className="text-[1.3rem]  sm:text-[2rem] font-bold mb-8 text-orange-400">Resultados da Pesquisa</h1>
        {livros.length > 0 ? (
          <div className="grid grid-cols-1 place-items-center sm:grid-cols-3">
            {renderLivros(livros)}
          </div>
        ) : (
          <p className="text-lg text-center">Nenhum livro encontrado para "{pesquisa}".</p>
        )}
      </div>

      <Footer/>
    </>
  )
}
