import React, { useState, useEffect } from "react"
import { AiOutlineHeart, AiFillHeart, AiOutlineStar } from "react-icons/ai"
import { useParams } from "react-router-dom"

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
    <div className="font-sans">
      <div className="flex justify-center items-center shadow-md rounded-lg flex-col p-8">
      </div>

      <div className="mt-12 p-8 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Descrição do Produto
        </h2>
        <p className="text-gray-600 text-base leading-relaxed">
          {livro.descricao}
        </p>
      </div>

      <div className="max-w-7xl w-full mt-12 m-8">
        <h2 className="text-2xl font-semibold text-orange-500">
          Produtos relacionados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
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
  )
}

export default DescricaoLivros
