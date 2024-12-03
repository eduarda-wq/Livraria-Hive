import "react-responsive-carousel/lib/styles/carousel.min.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { Login } from "./Login"


export function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [openLogin, setOpenLogin] = useState(false)
  const [loggedUser, setLoggedUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedUser"))
    if (savedUser) {
      fetch(`http://localhost:3000/usuarios/${savedUser.id}`)
        .then((res) => res.json())
        .then((data) => setLoggedUser(data))
        .catch((err) => console.error("Erro ao carregar usuário:", err))
    }
  }, [])


  const handleSearchSubmit = (event) => {
    event.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/pesquisa?search=${searchTerm}`)
    }
  }

  const handleLoginSuccess = (user) => {
    setLoggedUser(user)
    localStorage.setItem("loggedUser", JSON.stringify(user))
    setOpenLogin(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedUser")
    setLoggedUser(null)
  }

  return (
    <>
      <header className="bg-[url('/fundoMobal.png')] bg-[#FF8800] sm:bg-[url('/footerDesc.png')] bg-cover h-[20vh] p-4 sm:h-[35vh] sm:p-5">
        <div className="sm:relative">
          <div className="flex justify-between items-center gap-2 sm:gap-9">

            <button onClick={() => navigate("/")}><img src="/Hive.png" alt="" className="w-[6rem] sm:w-[16.125rem]" /></button>
            <div className="flex gap-9">
              <button onClick={() => navigate("/carrinho")} cclassName="bg-[#FFFFFf] flex items-center justify-center w-[2.7rem] h-[2.7rem] rounded-[50%] sm:w-[5.5rem] sm:h-[5.5rem]">
                <img src="/carrinho.png" alt="" className="w-[1.2rem] h-auto sm:w-[2.5rem]" />
              </button>

              {loggedUser ? (
                <div className="flex items-center gap-2">
                  <button onClick={() => navigate("/perfil")}>
                    <img
                      src={loggedUser.foto || "/user.png"}
                      alt="Foto do usuário"
                      className="w-[5rem] h-[5rem] rounded-full"
                    />
                  </button>
                  <span className="text-white">{loggedUser.nome}</span>
                  <button onClick={handleLogout} className="text-red-500">Sair</button>
                </div>
              ) : (
                <button onClick={() => setOpenLogin(true)} className="bg-[#FFFFFF] flex items-center justify-center w-[2.7rem] h-[2.7rem] rounded-[50%] sm:w-[5.5rem] sm:h-[5.5rem]">
                  <img src="/user.png" alt="" className="w-[1.2rem] h-auto sm:w-[2.5rem]" />
                </button>
              )}
            </div>
          </div>
        </div>
        <form onSubmit={handleSearchSubmit}>
          <div className="flex  gap-[0.2rem] justify-center items-center text-center py-2 sm:absolute sm:top-1 sm:ml-[25%]">
            <button type="submit" className="bg-[#FFFFFF] p-[0.3rem] sm:p-[0.5rem] rounded-l-[50%] rounded-r-[0.1%]"><img src="/pesquisa.png" alt="Ícone de pesquisa" className="w-[0.6rem] sm:w-[1.9rem]" /></button>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar livros por nome ou gênero"
              className="px-1 py-1 w-[10rem] rounded-br-lg rounded-tr-lg sm:px-4 sm:py-[0.7rem] sm:w-[40rem] text-[0.5rem] sm:text-[1rem] sm:top-1"
            />
          </div>
        </form>
      </header >
      <Modal open={openLogin} onClose={() => setOpenLogin(false)} center classNames={{
        overlay: 'bg-black bg-opacity-50',
        modal: 'm-0 p-0',
      }}>
        <Login onLogin={handleLoginSuccess} />
      </Modal>
    </>
  );
}
