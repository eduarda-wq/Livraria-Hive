import React, { useState } from 'react';
import { Cadastro } from './Cadastro';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

// eslint-disable-next-line react/prop-types
export function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [openCadastro, setOpenCadastro] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await fetch('http://localhost:3000/usuarios');
            const users = await response.json();

            console.log('Usuários:', users);

            const user = users.find(
                (u) => u.email === email && u.password === password
            );

            if (user) {
                setMessage('Login realizado com sucesso!');
                console.log('Usuário logado:', user);
                onLogin(user);
            } else {
                setError('E-mail ou senha inválidos.');
            }
        } catch (err) {
            console.error('Erro de login:', err);
            setError('Ocorreu um erro. Tente novamente.');
        }
    };

    const abrirCadastro = () => {
        setOpenCadastro(true);
        setOpen(false);
    };

    return (
        <>
            <div className='flex bg-[#FFF8D0] bg-[url(/fundoLoginMobal.png)] sm:bg-[url()] h-[25rem] w-[17rem] sm:w-[50rem] items-center justify-center'>
                <div className='flex flex-col gap-5 justify-center items-center sm:ml-10'>
                    <h1 className='text-[1.3rem] sm:text-[2.25rem] text-black font-bold'>Entrar</h1>
                    <form onSubmit={handleLogin} className='flex flex-col gap-6 justify-center items-center'>
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='sm:w-[20.875rem] h-[2.0625rem] bg-[#FFA034] px-4 py-1 sm:px-4 sm:py-1 rounded-[1rem]'
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='sm:w-[20.875rem] h-[2.0625rem] bg-[#FFA034] px-4 py-1 rounded-[1rem]'
                        />
                        <button type="submit" className='sm:w-[20.875rem]  text-white bg-[#111] w-[13rem] px-4 py-1 rounded-[1rem]'>Entrar</button>
                                               
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {message && <p style={{ color: 'green' }}>{message}</p>}

                    <p>
                        Não tem uma conta?{" "}
                        <button onClick={abrirCadastro} style={{ color: 'blue' }}>
                            Cadastre-se
                        </button>
                    </p>

                </div>
                <div>
                    <img src="./Group 2.png" alt="" className='hidden sm:w-[180vh] sm:h-[25rem] sm:flex' />
                </div>
            </div>

            <Modal open={openCadastro} onClose={() => setOpenCadastro(false)} center classNames={{
                overlay: 'bg-black bg-opacity-50',
                modal: 'm-0 p-0',
            }}>
                <Cadastro />
            </Modal>
        </>
    );
}

