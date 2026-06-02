'use client';

import { useState, useCallback } from 'react';
import api from '../lib/api';
import { Produto } from '../types/produto';
import { useRouter } from 'next/navigation';

export function useProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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
            alert('Erro ao buscar produtos');
        } finally {
            setLoading(false);
        }
    }, []);

    const buscarProdutoPorId = async (id: number) => {
        try {
            const resposta = await api.get(`/produtos/${id}`);
            prepararEdicao(resposta.data);
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar produto');
        }
    };

    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();

        const dados: Produto = {
            nome,
            descricao,
            preco: Number(preco),
            url
        };

        try {
            let resposta;

            if (editandoId) {
                resposta = await api.put(`/produtos/${editandoId}`, dados);
            } else {
                resposta = await api.post('/produtos/', dados);
            }

            console.log('Produto salvo:', resposta.data);

            limparFormulario();

            alert('Sucesso!');

            router.push('/dashboard');

        } catch (error: any) {
            console.error(error);
            console.error(error.response?.data);

            alert(
                error.response?.data?.message ||
                error.message ||
                'Erro ao salvar produto'
            );
        }
    };

    const excluir = async (id: number) => {
        if (!confirm('Excluir este produto?')) return;

        try {
            await api.delete(`/produtos/${id}`);
            listarProdutos();
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir produto');
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
        buscarProdutoPorId,
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