import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../api/api';

interface Categoria {
  id: number;
  nome: string;
  criadoEm: string;
}

function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nome, setNome] = useState('');
  const [editing, setEditing] = useState<Categoria | null>(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

  async function fetchCategorias() {
    const res = await api.get('/categorias');
    setCategorias(res.data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await api.put(`/categorias/${editing.id}`, { ...editing, nome });
    } else {
      await api.post('/categorias', { nome });
    }
    setNome('');
    setEditing(null);
    fetchCategorias();
  }

  async function handleDelete(id: number) {
    await api.delete(`/categorias/${id}`);
    fetchCategorias();
  }

  function handleEdit(categoria: Categoria) {
    setNome(categoria.nome);
    setEditing(categoria);
  }

  return (
    <Box p={3}>
      <h2>Categorias</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <TextField
          label="Nome da categoria"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          {editing ? 'Salvar' : 'Adicionar'}
        </Button>
        {editing && (
          <Button color="secondary" onClick={() => { setNome(''); setEditing(null); }}>
            Cancelar
          </Button>
        )}
      </form>
      <List>
        {categorias.map(cat => (
          <ListItem
            key={cat.id}
            secondaryAction={
              <>
                <IconButton onClick={() => handleEdit(cat)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => handleDelete(cat.id)}><DeleteIcon /></IconButton>
              </>
            }
          >
            <ListItemText primary={cat.nome} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default CategoriasPage;
