'use client';

import { useState, useCallback } from 'react';
import api from '../lib/api';
import { Produto } from '../types/produto';
import { useRouter } from 'next/navigation';

export function useProdutos() {

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // Estados do formulário
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [url, setUrl] = useState('');
    const [editandoId, setEditandoId] = useState<number | null>(null);

    

    const listarProdutos = useCallback(async () => {

        setLoading(true);

        try {

            const resposta = await api.get('/produtos');

            setProdutos(resposta.data);

        } catch (error) {

            console.error(error);

            alert("Erro ao buscar produtos");

        } finally {

            setLoading(false);

        }

    }, []);

    
    const salvar = async (e: React.FormEvent) => {

        e.preventDefault();

        const dados: Produto = {
            nome,
            descricao,
            preco: Number(preco),
            url
        };

        try {

            // EDITAR
            if (editandoId) {

                await api.put('/produtos', {
                    ...dados,
                    id: editandoId
                });

            }

            // CADASTRAR
            else {

                await api.post('/produtos', dados);

            }

            limparFormulario();

            alert("Sucesso!");

            router.push('/dashboard');

        } catch (error) {

            console.error(error);

            alert("Erro ao salvar produto");

        }

    };

    const excluir = async (id: number) => {

        const confirmar = confirm("Excluir este produto?");

        if (!confirmar) return;

        try {

            await api.delete(`/produtos/${id}`);

            listarProdutos();

        } catch (error) {

            console.error(error);

            alert("Erro ao excluir");

        }

    };

    const prepararEdicao = (p: Produto) => {

        setEditandoId(p.id!);

        setNome(p.nome);

        setDescricao(p.descricao);

        setPreco(p.preco.toString());

        setUrl(p.url);

    };


    const limparFormulario = () => {

        setEditandoId(null);

        setNome('');

        setDescricao('');

        setPreco('');

        setUrl('');

    };

    return {

        produtos,
        loading,

        listarProdutos,
        salvar,
        excluir,
        prepararEdicao,

        nome,
        setNome,

        descricao,
        setDescricao,

        preco,
        setPreco,

        url,
        setUrl,

        editandoId,

        limparFormulario

    };
}