import React, { useState, useEffect } from "react"
import { AiOutlineHeart, AiFillHeart, AiOutlineStar, AiFillStar } from "react-icons/ai"
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
  const [avaliacao, setAvaliacao] = useState(0)
  const [comentario, setComentario] = useState("")
  const [avaliacoes, setAvaliacoes] = useState([])
  const [usuarioLogado, setUsuarioLogado] = useState(null)

  useEffect(() => {
    const fetchLivro = async () => {
      try {
        const response = await fetch(`http://localhost:3000/livros/${id}`)
        const data = await response.json()
        setLivro(data)
      } catch (error) {
        console.error("Erro ao buscar os dados do livro:", error)
      }
    }
  
    const fetchAvaliacoes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/avaliacoes?livroId=${id}`)
        const data = await response.json()
        setAvaliacoes(data)
      } catch (error) {
        console.error("Erro ao buscar as avaliações:", error)
      }
    }
  
    const fetchUsuario = async () => {
      try {
        const usuarioId = "01e0"
        const response = await fetch(`http://localhost:3000/usuarios/${usuarioId}`)
        const data = await response.json()
        setUsuarioLogado(data)
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error)
      }
    }
  
    fetchLivro()
    fetchAvaliacoes()
    fetchUsuario()
  }, [id])

  const handleSubmitAvaliacao = async (e) => {
    e.preventDefault()
  
    if (!avaliacao || !comentario) {
      alert("Preencha a avaliação e o comentário antes de enviar.")
      return
    }
  
    if (!usuarioLogado) {
      alert("Erro: Usuário não logado. Tente novamente.")
      return
    }
  
    const novaAvaliacao = {
      livroId: id,
      usuario: usuarioLogado.nome,
      nota: avaliacao,
      comentario,
    }
  
    try {
      const response = await fetch("http://localhost:3000/avaliacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaAvaliacao),
      })
  
      if (response.ok) {
        setAvaliacoes([...avaliacoes, novaAvaliacao])
        setAvaliacao(0)
        setComentario("")
      } else {
        alert("Erro ao enviar avaliação. Tente novamente.")
      }
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error)
    }
  }

  const renderEstrelas = (nota) => {
    return Array(5)
      .fill(0)
      .map((_, index) =>
        index < nota ? <AiFillStar key={index} size={24} color="gold" /> : <AiOutlineStar key={index} size={24} color="gray" />
      )
  }

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
        <div className="flex flex-col pt-5 justify-center items-center sm:flex-row sm:items-center sm:justify-center sm:m-8">
          <div className="flex flex-col sm:flex-row items-center justify-center">
            <img
              src={livro.imagem}
              alt={livro.titulo}
              className="rounded-lg w-[12rem] sm:w-[25rem]"
            />
            <div className="w-2/3 mt-2 sm:pl-10 flex flex-col justify-between sm:items-center">
              <div>
                <div className="flex items-center justify-between sm:justify-normal sm:gap-5">
                  <h1 className="text-[1.4rem] sm:text-[2rem] font-bold text-gray-800">
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
                <h2 className="text-[1rem] sm:text-[1.5rem] text-center justify-center items-center font-semibold text-gray-800 mb-2">
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

      <div className="flex flex-col gap-3 max-w-7xl w-full mt-12 m-8">
        <h2 className="text-[1.6rem] sm:text-[2rem] font-semibold text-orange-500">
          Produtos relacionados
        </h2>
        <div className="grid grid-cols-1  sm:grid-cols-3 gap-6">
          
          {produtosRelacionados.map((produto) => (
            <div key={produto.id} className="flex flex-col items-center justify-center border rounded-lg shadow-md p-4 w-[15rem]">
              <img
                src={produto.imagem}
                alt={produto.titulo}
                className="w-auto h-64 object-cover rounded-md"
              />
              <h3 className="mt-4 text-center w-auto sm:text-lg font-semibold text-gray-800">
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

          {avaliacoes.length > 0 ? (
            avaliacoes.map((avaliacao, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center mb-2">{renderEstrelas(avaliacao.nota)}</div>
                <p className="text-gray-600">
                  <strong>{avaliacao.usuario}</strong>: {avaliacao.comentario}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma avaliação</p>
          )}

          <form onSubmit={handleSubmitAvaliacao} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700">Sua Avaliação</label>
              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setAvaliacao(index + 1)}
                    >
                      {index < avaliacao ? <AiFillStar size={24} color="gold" /> : <AiOutlineStar size={24} color="gray" />}
                    </button>
                  ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Comentário</label>
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                rows="4"
                className="w-full border rounded-lg p-2"
                placeholder="Escreva seu comentário aqui..."
              />
            </div>
            <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-lg">
              Enviar Avaliação
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default DescricaoLivros
