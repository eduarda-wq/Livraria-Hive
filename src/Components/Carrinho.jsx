import { useState, useEffect } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([])
  const [produtosSelecionados, setProdutosSelecionados] = useState([])

  const carregarCarrinho = async () => {
    try {
      const response = await fetch("https://livraria-hive-api.vercel.app/carrinho")
      if (response.ok) {
        const itensCarrinho = await response.json()
        setCarrinho(itensCarrinho)
      } else {
        console.error("Erro ao carregar carrinho:", response.status)
      }
    } catch (error) {
      console.error("Erro na conexão com o servidor:", error)
    }
  }

  useEffect(() => {
    carregarCarrinho()
  }, [])

  const removerDoCarrinho = async (livroId) => {
    try {
      const response = await fetch(`https://livraria-hive-api.vercel.app/carrinho/${livroId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCarrinho((prevCarrinho) =>
          prevCarrinho.filter((item) => item.id !== livroId)
        )
        setProdutosSelecionados((prevSelecionados) =>
          prevSelecionados.filter((id) => id !== livroId)
        )
        alert("Livro removido do carrinho com sucesso!")
      } else {
        console.error("Erro ao remover do carrinho:", response.status)
      }
    } catch (error) {
      console.error("Erro na conexão com o servidor:", error)
    }
  }

  const calcularSubtotal = () =>
    produtosSelecionados
      .reduce(
        (acc, itemId) =>
          acc +
          (carrinho.find((item) => item.id === itemId)?.preco || 0),
        0
      )
      .toFixed(2)

  const toggleSelecaoProduto = (produtoId) => {
    if (produtosSelecionados.includes(produtoId)) {
      setProdutosSelecionados((prev) =>
        prev.filter((id) => id !== produtoId)
      )
    } else {
      setProdutosSelecionados((prev) => [...prev, produtoId])
    }
  }

  const limparCarrinhoNoBackend = async () => {
    try {
      const response = await fetch("https://livraria-hive-api.vercel.app/carrinho", {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Carrinho limpo com sucesso no backend");
      } else {
        console.error("Erro ao limpar carrinho no backend:", response.status);
      }
    } catch (error) {
      console.error("Erro na conexão com o servidor:", error);
    }
  };

  const finalizarPedido = async () => {
    setCarrinho([]);
    setProdutosSelecionados([]);

    await limparCarrinhoNoBackend();

    alert(`Pedido finalizado! Total: R$ ${calcularSubtotal()}`);
  };

  return (
    <>
    <Header/>
      <div className="p-6 bg-gray-50 min-h-screen ">
        <h1 className="text-[1.5rem] sm:text-[2rem] font-semibold mb-6">Carrinho de compras</h1>

        {carrinho.length === 0 ? (
          <p className="text-gray-500">Seu carrinho está vazio!</p>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center bg-white p-2 sm:p-4 gap-1 rounded shadow">
              <div>
                <p className="text-[0.9rem] sm:text-[1.4rem] font-semibold">Subtotal selecionado:</p>
                <p className="text-[0.8rem] sm:text-[1rem] text-orange-500 font-bold ">
                  R$ {calcularSubtotal()}
                </p>
              </div>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-4 sm:py-2 sm:px-6 text-[0.6rem] sm:text-[1.1rem] rounded"
                onClick={finalizarPedido}  // Agora chama a função que limpa o carrinho
                disabled={produtosSelecionados.length === 0}
              >
                Fechar pedido
              </button>
            </div>

            <div className="space-y-4">
              {carrinho.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start border-b border-gray-200 pb-4"
                >
                  <input
                    type="checkbox"
                    className="mr-4 mt-2 w-5 h-5 accent-orange-500"
                    checked={produtosSelecionados.includes(item.id)}
                    onChange={() => toggleSelecaoProduto(item.id)}
                  />

                  <img
                    src={item.imagem}
                    alt={item.titulo}
                    className="w-12 h-auto sm:w-24 sm:h-24 object-cover rounded"
                  />

                  <div className="flex flex-col flex-grow ml-4">
                    <h3 className="font-medium text-[0.9rem] sm:text-lg">{item.titulo}</h3>
                    <p className="text-[0.6rem] sm:text-sm text-gray-500">Capa comum</p>
                    <p className="text-[0.6rem] sm:text-sm text-green-600 font-semibold">Em estoque</p>

                    <div className="mt-2 flex space-x-4 text-[0.6rem] sm:text-sm">
                      <button
                        onClick={() => removerDoCarrinho(item.id)}
                        className="text-red-500 hover:underline"
                      >
                        Excluir
                      </button>
                      <button className="text-blue-500 hover:underline">
                        Compartilhar
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    {item.desconto ? (
                      <div>
                        <span className="text-red-500 text-sm font-semibold mr-1">
                          {item.desconto}% off
                        </span>
                        <p className="text-lg font-bold text-orange-600">
                          R$ {item.preco.toFixed(2)}
                        </p>
                        <p className="text-sm line-through text-gray-500">
                          De: R$ {item.precoOriginal.toFixed(2)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-[0.98rem] sm:text-lg font-bold text-gray-700">
                        R$ {item.preco.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer/>
    </>
  )
}
