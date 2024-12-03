import { useState, useEffect } from "react"

export function Perfil() {
  const [user, setUser] = useState(null)
  const [newName, setNewName] = useState("")
  const [newPhoto, setNewPhoto] = useState("")

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedUser"))
    if (savedUser) {
      setUser(savedUser)
      setNewName(savedUser.nome || "")
      setNewPhoto(savedUser.foto || "")
    }
  }, [])

  const handleSave = async () => {
    const updatedUser = { ...user, nome: newName, foto: newPhoto }
    try {
        const response = await fetch(`https://livraria-hive-api.vercel.app/usuarios/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
        })
        if (response.ok) {
            setUser(updatedUser)
            setMessage("Dados atualizados com sucesso!")
        } else {
            setError("Erro ao atualizar dados.")
        }
    } catch (error) {
        setError("Erro ao conectar-se ao servidor.")
    }
}


  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Meu Perfil</h1>
      {user ? (
        <div className="flex flex-col gap-4 items-center">
          <img
            src={user.foto || "/default-avatar.png"}
            alt="Avatar"
            className="w-24 h-24 rounded-full"
          />
          <label className="flex flex-col items-center">
            Foto de Perfil:
            <input
              type="text"
              value={newPhoto}
              onChange={(e) => setNewPhoto(e.target.value)}
              placeholder="URL da nova foto"
              className="border px-2 py-1 rounded"
            />
          </label>
          <label className="flex flex-col items-center">
            Nome:
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Novo nome"
              className="border px-2 py-1 rounded"
            />
          </label>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Salvar Alterações
          </button>
        </div>
      ) : (
        <p>Você não está logado.</p>
      )}
    </div>
  )
}
