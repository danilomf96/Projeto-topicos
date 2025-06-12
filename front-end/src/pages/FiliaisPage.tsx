import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../api/api';

interface Filial {
  id: number;
  proprietario: string;
  local: string;
  lucro: number;
  despesas: number;
  criadoEm: string;
}

function FiliaisPage() {
  const [filiais, setFiliais] = useState<Filial[]>([]);
  const [form, setForm] = useState<Omit<Filial, "id" | "criadoEm">>({
    proprietario: "",
    local: "",
    lucro: 0,
    despesas: 0,
  });
  const [editing, setEditing] = useState<Filial | null>(null);

  useEffect(() => {
    fetchFiliais();
  }, []);

  async function fetchFiliais() {
    const res = await api.get('/filiais');
    setFiliais(res.data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await api.put(`/filiais/${editing.id}`, { ...editing, ...form });
    } else {
      await api.post('/filiais', form);
    }
    setForm({ proprietario: "", local: "", lucro: 0, despesas: 0 });
    setEditing(null);
    fetchFiliais();
  }

  async function handleDelete(id: number) {
    await api.delete(`/filiais/${id}`);
    fetchFiliais();
  }

  function handleEdit(filial: Filial) {
    setForm({
      proprietario: filial.proprietario,
      local: filial.local,
      lucro: filial.lucro,
      despesas: filial.despesas,
    });
    setEditing(filial);
  }

  return (
    <Box p={3}>
      <h2>Filiais</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        <TextField
          label="Proprietário"
          value={form.proprietario}
          onChange={e => setForm(f => ({ ...f, proprietario: e.target.value }))}
          required
        />
        <TextField
          label="Local"
          value={form.local}
          onChange={e => setForm(f => ({ ...f, local: e.target.value }))}
          required
        />
        <TextField
          label="Lucro"
          type="number"
          value={form.lucro}
          onChange={e => setForm(f => ({ ...f, lucro: Number(e.target.value) }))}
          required
        />
        <TextField
          label="Despesas"
          type="number"
          value={form.despesas}
          onChange={e => setForm(f => ({ ...f, despesas: Number(e.target.value) }))}
          required
        />
        <Button type="submit" variant="contained" sx={{ height: 56 }}>
          {editing ? 'Salvar' : 'Adicionar'}
        </Button>
        {editing && (
          <Button color="secondary" onClick={() => { setForm({ proprietario: "", local: "", lucro: 0, despesas: 0 }); setEditing(null); }}>
            Cancelar
          </Button>
        )}
      </form>
      <List>
        {filiais.map(filial => (
          <ListItem
            key={filial.id}
            secondaryAction={
              <>
                <IconButton onClick={() => handleEdit(filial)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => handleDelete(filial.id)}><DeleteIcon /></IconButton>
              </>
            }
          >
            <ListItemText
              primary={`${filial.local} - ${filial.proprietario}`}
              secondary={`Lucro: R$${filial.lucro} | Despesas: R$${filial.despesas}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
export default FiliaisPage;
