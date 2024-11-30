import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Login } from "./Login";
import { Cadastro } from "./Cadastro";


export function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [openCadastro, setOpenCadastro] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [termoBusca, setTermoBusca] = useState("")
  const navigate = useNavigate();


  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
    navigate("/");
  };



  const handleSearch2 = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
    navigate("/carrinho");
  };

  function logar() {
    setOpen(true);
  }

  const handleLoginSuccess = (user) => {
    console.log('Usuário logado no Header:', user);
    setLoggedUser(user);
    setOpen(false);
  };

  const handlePesquisaChange = (event) => {
    setTermoBusca(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (termoBusca.trim()) {
      navigate(`/pesquisa?search=${termoBusca}`);
    }
  };
  return (
    <>
      <header className="bg-[url('/fundoMobal.png')] sm:bg-[url('/footerDesc.png')] bg-cover h-[30vh] p-4 sm:h-[35vh] sm:p-5">
        <div className="sm:relative">
          <div className="flex justify-between">
            <div>
              <button onClick={handleSearch}><img src="/Hive.png" alt="" className="w-[8rem] sm:w-[16.125rem]" /></button>
            </div>
            <div className="flex gap-9">

              <button onClick={handleSearch2} className="bg-[#FFFFFF] p-4 rounded-[50%] sm:p-6">
                <img src="/carrinho.png" alt="" className="w-[1.5rem] sm:w-[2.0625rem]" />
              </button>


              <div>
                {loggedUser ? (
                  <img
                    src={loggedUser.foto}
                    alt="Foto do usuário"
                    className=" w-[1.5rem] sm:w-[2.0625rem]"
                  />
                ) : (
                  <>
                    <button onClick={logar} className="bg-[#FFFFFF] p-4 rounded-[50%] sm:p-6"><img src="/user.png" alt="" className="w-[1.5rem] sm:w-[2.0625rem]" /></button>
                  </>
                )}
              </div>
            </div>
          </div>
          <form onSubmit={handleSearchSubmit}>
            <div className="flex  gap-1 justify-center items-center text-center py-6 sm:absolute sm:top-1 sm:ml-[30%]">
              <button type="submit" className="bg-[#FFFFFF] p-2 rounded-l-[50%] rounded-r-[0.1%]"><img src="/pesquisa.png" alt="Ícone de pesquisa" className="w-[1.4rem]" /></button>
              <input
                type="text"
                value={termoBusca}
                onChange={handlePesquisaChange}
                placeholder="Pesquisar livros por nome ou gênero"
                className="px-4 py-2 rounded-br-lg rounded-tr-lg sm:px-4 sm:py-2 sm:w-[30rem] "
              />
            </div>
          </form>
        </div>
      </header>
      <Modal open={open} onClose={() => setOpen(false)} center classNames={{
        overlay: 'bg-black bg-opacity-50',
        modal: 'm-0 p-0',
      }} >
        <Login onLogin={handleLoginSuccess} />
      </Modal>
    </>
  );
}
