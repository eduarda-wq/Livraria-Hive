import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Pesquisa from "./PesquisaResultados.jsx";
import Home from "./Components/Home.jsx";
import { Cadastro } from "./Components/Cadastro.jsx";
import Carrinho from "./Components/Carrinho.jsx";
import DescricaoLivros from "./Components/DescricaoLivros.jsx";
import CadastroLivros from "./Components/CadastroLivros.jsx";
import { Perfil } from "./Components/Perfil.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "home",
    element: <Home/>,
  },
  {
    path: "cadastro",
    element: <Cadastro/>,
  },
  {
    path: "carrinho",
    element: <Carrinho/>,
  },
  {
    path: `livro/:id`,
    element: <DescricaoLivros/>,
  },
  {
    path: "pesquisa",
    element: <Pesquisa/>,
  },
  {
    path: "cadatroLivro",
    element: <CadastroLivros/>,
  },
  {
    path: "perfil",
    element: <Perfil/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
