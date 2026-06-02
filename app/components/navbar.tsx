'use client';

import './navbar.css';
import Link from 'next/link';

type NavbarProps = {
    nome?: string;
    onLogout?: () => void;
};

export default function NavBar({
    nome = 'Usuário',
    onLogout
}: NavbarProps) {

    function handleLogout() {
        if (onLogout) {
            onLogout();
        }
    }

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
                <button onClick={handleLogout}>
                    Sair
                </button>
            </div>

        </nav>
    );
}