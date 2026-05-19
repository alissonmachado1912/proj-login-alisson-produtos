'use client';

import { useRegistro } from '../hooks/useRegistro';
import '../formStyle.css';
import Navbar from '../components/navbar';

export default function Registro() {

    const {
        nome, setNome,
        username, setUsername,
        password, setPassword,
        registrar
    } = useRegistro();

    return (

        <div className="login-container">


            <div className="login-card">
                


                <h1>Registro</h1>

                <form onSubmit={registrar}>

                    <div className="input-group">
                        <input
                            className="input-field"
                            type="text"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            className="input-field"
                            type="text"
                            placeholder="Usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            className="input-field"
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="btn-login" type="submit">
                        Registrar
                    </button>

                </form>

                <div className="footer-link">
                    Já possui conta?
                </div>

            </div>

        </div>
        
    );
}