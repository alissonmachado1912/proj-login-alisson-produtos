'use client';

import './navbar.css';
import Link from 'next/link';

type NavbarProps = {
    nome: string;
    onLogout: () => void;
};

export default function Navbar({ nome, onLogout }: NavbarProps) {
    return (
        <nav className="navbar">

            <div className="navbar-logo">
                {nome}
            </div>

            <ul className="navbar-links">

                <li>
                    <Link href="/dashboard">
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link href="/dashboard/produto">
                        Produto
                    </Link>
                </li>

            </ul>

            <div className="navbar-user">
                <button onClick={onLogout}>
                    Sair
                </button>
            </div>

        </nav>
    );
}