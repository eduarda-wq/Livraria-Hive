import React, { useState, useEffect } from "react"
import { AiOutlineHeart, AiFillHeart, AiOutlineStar } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"

const DescricaoLivros = () => {
  const { id } = useParams()
  const [livro, setLivro] = useState(null)
  const [quantidade, setQuantidade] = useState(1)
  const [cep, setCep] = useState("")
  const [isFavorited, setIsFavorited] = useState(false)
  const [produtosRelacionados, setProdutosRelacionados] = useState([])

  useEffect(() => {
    const fetchLivro = async () => {
      try {
        const response = await fetch(`http://localhost:3000/livros/${id}`)
        const data = await response.json()
        console.log("Livro carregado:", data)
        setLivro(data)
      } catch (error) {
        console.error("Erro ao buscar os dados do livro:", error)
      }
    }

    const fetchProdutosRelacionados = async () => {
      try {
        const response = await fetch(`http://localhost:3000/livros`)
        const data = await response.json()
        setProdutosRelacionados(data.filter((produto) => produto.id !== id))
      } catch (error) {
        console.error("Erro ao buscar os produtos relacionados:", error)
      }
    }

    fetchLivro()
    fetchProdutosRelacionados()
  }, [id])

  if (!livro) {
    return <p>Carregando livro...</p>
  }

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  const increaseQuantidade = () => {
    setQuantidade(quantidade + 1)
  }

  const decreaseQuantidade = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1)
  }

  const handleCalculateFrete = () => {
    alert(`CEP informado: ${cep}`)
  }

  const precoTotal = (livro.preco * quantidade).toFixed(2)
  const precoParcela = (precoTotal / 2).toFixed(2)

  return (
    <>
    <Header/>
      <div className="font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:m-8">
          <div className="flex flex-col sm:flex-row items-center justify-center">
            <img
              src={livro.imagem}
              alt={livro.titulo}
              className="rounded-lg w-[15rem] sm:w-[25rem]"
            />
            <div className="w-2/3 pl-8 flex flex-col  justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h1 className="text-[1.5rem] sm:text-[2rem] font-bold text-gray-800">
                    {livro.titulo}
                  </h1>
                  <button onClick={toggleFavorite} className="focus:outline-none ">
                    {isFavorited ? (
                      <AiFillHeart size={32} color="red" />
                    ) : (
                      <AiOutlineHeart size={32} color="gray" />
                    )}
                  </button>
                </div>
                <p className="text-[1rem] text-gray-500 mt-2 sm:text-[1.5rem]">
                  {livro.autor || "Autor desconhecido"}
                </p>
                <div className="flex justify-center sm:flex-row my-4">
                  <hr className="w-[23rem] h-[0rem] border-[1px] border-gray-300 rounded-[2rem] sm:hidden" />
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <p className="text-4xl text-black font-bold">R$ {precoTotal}</p>
                  <p className="text-lg text-gray-500">
                    ou 2x de R$ {precoParcela}
                  </p>
                  <p className="text-lg text-gray-500">33% de desconto</p>
                  <p className="underline font-semibold cursor-pointer">
                    Mais formas de pagamento
                  </p>
                </div>
                <div className="flex justify-center sm:flex-row my-4">
                  <hr className="w-[23rem] h-[0rem] sm:w-full border-[1px] border-gray-300 rounded-[2rem]" />
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-5">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={decreaseQuantidade}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 text-lg">{quantidade}</span>
                  <button
                    onClick={increaseQuantidade}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                <button className="bg-orange-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg text-xl flex-grow">
                  COMPRAR
                </button>
              </div>
              <div className="mt-6 flex flex-col  gap-5">
                <h2 className="text-[1.5rem] text-center justify-center items-center font-semibold text-gray-800 mb-2">
                  Calcular frete e prazo de entrega
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <input
                    type="text"
                    placeholder="Insira seu CEP"
                    className="border-[1px] border-black py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                  />
                  <button
                    onClick={handleCalculateFrete}
                    className="bg-black text-white px-6 py-2 hover:bg-gray-800"
                  >
                    CALCULAR
                  </button>
                </div>
                <p className="text-blue-500 text-sm flex items-center justify-center mt-2 cursor-pointer hover:underline">
                  Não sei meu CEP
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 p-8 bg-gray-100 rounded-lg shadow-md m-2 justify-center items-center flex flex-col sm:items-start sm:justify-start sm:text-start">
        <h2 className="text-[1.5rem] font-semibold text-gray-800 mb-4 sm:text-[2rem]">
          Descrição do Produto
        </h2>
        <p className="text-gray-600 text-base leading-relaxed">
          {livro.descricao}
        </p>
      </div>

      <div className="max-w-7xl w-full mt-12 m-8">
        <h2 className="text-[1.5rem] sm:text-[2rem] m-3 font-semibold text-orange-500">
          Produtos relacionados
        </h2>
        <div className="grid grid-cols-1 place-items-center sm:grid-cols-3  gap-6 mt-4">
          
          {produtosRelacionados.map((produto) => (
            <div key={produto.id} className="border rounded-lg shadow-md p-4">
              <img
                src={produto.imagem}
                alt={produto.titulo}
                className="w-full h-64 object-cover rounded-md"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {produto.titulo}
              </h3>
              <p className="text-black font-bold mt-4 text-xl">
                R$ {produto.preco}
              </p>
              <p className="text-xs text-gray-500">
                2x de R$ {precoParcela}
              </p>
              <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg w-full">
                COMPRAR
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 p-8 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Avaliações</h2>
        <div className="flex items-center mb-2">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <AiOutlineStar key={index} size={24} color="gray" />
            ))}
        </div>
        <p className="text-gray-600">
          Classificação média: <span className="font-bold">0</span> (0 avaliações)
        </p>
        <button className="mt-4 text-blue-500 hover:underline">
          Faça login para escrever uma avaliação.
        </button>
        <div className="mt-4 flex items-center gap-4">
          <select className="border rounded-lg py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Mais recentes</option>
          </select>
          <select className="border rounded-lg py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Todos</option>
          </select>
        </div>
        <p className="mt-6 text-gray-500">Nenhuma avaliação</p>
      </div>
      </div>
      <Footer/>
    </>
  )
}

export default DescricaoLivros
