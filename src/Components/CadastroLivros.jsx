import { useState } from "react"
import { Footer } from "./Footer"
import { Header } from "./Header"

export default function CadastroLivros() {
  const [formData, setFormData] = useState({
    genero: "",
    titulo: "",
    preco: "",
    secao: "lancamentos",
    imagem: "",
    estoque: "",
    descricao: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isSubmitting) return
    setIsSubmitting(true)

    const novoLivro = {
      id: Date.now(),
      ...formData,
      preco: parseFloat(formData.preco),
      estoque: parseInt(formData.estoque, 10),
    }

    try {
      const response = await fetch("http://localhost:3000/livros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoLivro),
      })

      if (response.ok) {
        alert("Livro cadastrado com sucesso!")
        setFormData({
          genero: "",
          titulo: "",
          preco: "",
          secao: "lancamentos",
          imagem: "",
          estoque: "",
          descricao: "",
        })
      } else {
        alert("Erro ao cadastrar o livro!")
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error)
      alert("Erro ao conectar com o servidor!")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
    <Header/>
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Cadastro de Livros</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Gênero:</label>
            <input
              type="text"
              name="genero"
              value={formData.genero}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Título:</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Preço:</label>
            <input
              type="number"
              name="preco"
              value={formData.preco}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Seção:</label>
            <select
              name="secao"
              value={formData.secao}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            >
              <option value="lancamentos">Lançamentos</option>
              <option value="destaques">Destaques</option>
              <option value="infantis">Livros Infantis</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">URL da Imagem:</label>
            <input
              type="text"
              name="imagem"
              value={formData.imagem}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Quantidade em Estoque:</label>
            <input
              type="number"
              name="estoque"
              value={formData.estoque}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block font-semibold">Descrição:</label>
            <textarea
              name="descricao"
              value={formData.descricao || ""}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#FF8800] text-white p-2 rounded w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar Livro"}
          </button>
        </form>
      </div>
      <Footer/>
    </>
  )
}
