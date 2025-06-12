import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, List, ListItem, ListItemText, IconButton, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../api/api';

interface Produto {
  id: number;
  nome: string;
  tipo: string;
  preco: number;
  quantidade: number;
  categoriaId: number;
  criadoEm: string;
}

interface Categoria {
  id: number;
  nome: string;
}

function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState<Omit<Produto, "id" | "criadoEm">>({
    nome: "",
    tipo: "",
    preco: 0,
    quantidade: 0,
    categoriaId: 0,
  });
  const [editing, setEditing] = useState<Produto | null>(null);

  useEffect(() => {
    fetchProdutos();
    fetchCategorias();
  }, []);

  async function fetchProdutos() {
    const res = await api.get('/produtos');
    setProdutos(res.data);
  }

  async function fetchCategorias() {
    const res = await api.get('/categorias');
    setCategorias(res.data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await api.put(`/produtos/${editing.id}`, { ...editing, ...form });
    } else {
      await api.post('/produtos', form);
    }
    setForm({ nome: "", tipo: "", preco: 0, quantidade: 0, categoriaId: 0 });
    setEditing(null);
    fetchProdutos();
  }

  async function handleDelete(id: number) {
    await api.delete(`/produtos/${id}`);
    fetchProdutos();
  }

  function handleEdit(produto: Produto) {
    setForm({
      nome: produto.nome,
      tipo: produto.tipo,
      preco: produto.preco,
      quantidade: produto.quantidade,
      categoriaId: produto.categoriaId
    });
    setEditing(produto);
  }

  return (
    <Box p={3}>
      <h2>Produtos</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        <TextField
          label="Nome"
          value={form.nome}
          onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
          required
        />
        <TextField
          label="Tipo"
          value={form.tipo}
          onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}
          required
        />
        <TextField
          label="Preço"
          type="number"
          value={form.preco}
          onChange={e => setForm(f => ({ ...f, preco: Number(e.target.value) }))}
          required
        />
        <TextField
          label="Quantidade"
          type="number"
          value={form.quantidade}
          onChange={e => setForm(f => ({ ...f, quantidade: Number(e.target.value) }))}
          required
        />
        <TextField
          select
          label="Categoria"
          value={form.categoriaId}
          onChange={e => setForm(f => ({ ...f, categoriaId: Number(e.target.value) }))}
          required
          style={{ minWidth: 120 }}
        >
          <MenuItem value={0} disabled>Selecione</MenuItem>
          {categorias.map(cat => (
            <MenuItem key={cat.id} value={cat.id}>{cat.nome}</MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" sx={{ height: 56 }}>
          {editing ? 'Salvar' : 'Adicionar'}
        </Button>
        {editing && (
          <Button color="secondary" onClick={() => { setForm({ nome: "", tipo: "", preco: 0, quantidade: 0, categoriaId: 0 }); setEditing(null); }}>
            Cancelar
          </Button>
        )}
      </form>
      <List>
        {produtos.map(prod => (
          <ListItem
            key={prod.id}
            secondaryAction={
              <>
                <IconButton onClick={() => handleEdit(prod)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => handleDelete(prod.id)}><DeleteIcon /></IconButton>
              </>
            }
          >
            <ListItemText
              primary={`${prod.nome} (${prod.tipo})`}
              secondary={`Preço: R$${prod.preco} | Qtd: ${prod.quantidade} | Categoria: ${categorias.find(c => c.id === prod.categoriaId)?.nome ?? ''}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
export default ProdutosPage;
