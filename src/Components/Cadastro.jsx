import React, { useState } from "react"

export function Cadastro() {
    const [formData, setFormData] = useState({ email: "", password: "", nome: "", foto: "" })
    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("https://livraria-hive-api.vercel.app/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setMessage("Usuário cadastrado com sucesso!")
                setFormData({ email: "", password: "", nome: "", foto: "" })
            } else {
                setMessage("Erro ao cadastrar usuário.")
            }
        } catch (error) {
            setMessage("Erro ao conectar-se ao servidor.")
        }
    }

    return (
        <>
            <div className='flex bg-[#FFF8D0] bg-[url(/fundoLoginMobal.png)] sm:bg-[url()] h-[25rem] w-[17rem] sm:w-[50rem] items-center justify-center'>
                <div className='flex flex-col gap-5 justify-center items-center sm:ml-10'>
                    <h1 className='text-[1.3rem] sm:text-[2.25rem] text-black font-bold'>Cadastre-se</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6 justify-center items-center'>
                        <input
                            type="email"
                            placeholder="E-mail"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='sm:w-[20.875rem] h-[2.0625rem] bg-[#FFA034] px-4 py-1 sm:px-4 sm:py-1 rounded-[1rem]'
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className='sm:w-[20.875rem] h-[2.0625rem] bg-[#FFA034] px-4 py-1 sm:px-4 sm:py-1 rounded-[1rem]'
                        />
                        <input
                            type="text"
                            placeholder="Nome"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            className='sm:w-[20.875rem] h-[2.0625rem] bg-[#FFA034] px-4 py-1 sm:px-4 sm:py-1 rounded-[1rem]'
                        />
                        <input
                            type="text"
                            placeholder="URL da Foto"
                            id="foto"
                            name="foto"
                            value={formData.foto}
                            onChange={handleChange}
                            required
                            className='sm:w-[20.875rem] h-[2.0625rem] bg-[#FFA034] px-4 py-1 sm:px-4 sm:py-1 rounded-[1rem]'
                        />
                        <button type="submit" className='sm:w-[20.875rem] text-white bg-[#111] w-[13rem] px-4 py-1 rounded-[1rem]'>
                            Cadastre-se
                        </button>
                    </form>
                    {message && <p>{message}</p>}
                    <p>Já tem uma conta? <a href="#" className="text-blue-800">Entrar</a></p>
                </div>
                <div>
                    <img src="./Group 2.png" alt="" className='hidden sm:w-[180vh] sm:h-[25rem] sm:flex' />
                </div>
            </div>
        </>
    )
}
