'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';

export function useRegistro() {

    const router = useRouter();

    const [nome, setNome] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function registrar(evento: React.FormEvent) {

        evento.preventDefault();

        const novoUsuario = {
            nome: nome,
            username: username,
            password: password
        };

        api.post('/users', novoUsuario)

            .then(() => {

                alert('Usuário registrado com sucesso!');

                router.push('/');

            })

            .catch(() => {

                alert('Erro ao registrar usuário!');

            });
    }

    return {

        nome, setNome,
        username, setUsername,
        password, setPassword,
        registrar

    };
}