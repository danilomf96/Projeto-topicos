import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, List, ListItem, ListItemText, IconButton, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../api/api';

interface Funcionario {
  id: number;
  nome: string;
  salario: number;
  filialId: number;
  criadoEm: string;
}

interface Filial {
  id: number;
  local: string;
}

function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [filiais, setFiliais] = useState<Filial[]>([]);
  const [form, setForm] = useState<Omit<Funcionario, "id" | "criadoEm">>({
    nome: "",
    salario: 0,
    filialId: 0,
  });
  const [editing, setEditing] = useState<Funcionario | null>(null);

  useEffect(() => {
    fetchFuncionarios();
    fetchFiliais();
  }, []);

  async function fetchFuncionarios() {
    const res = await api.get('/funcionarios');
    setFuncionarios(res.data);
  }

  async function fetchFiliais() {
    const res = await api.get('/filiais');
    setFiliais(res.data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await api.put(`/funcionarios/${editing.id}`, { ...editing, ...form });
    } else {
      await api.post('/funcionarios', form);
    }
    setForm({ nome: "", salario: 0, filialId: 0 });
    setEditing(null);
    fetchFuncionarios();
  }

  async function handleDelete(id: number) {
    await api.delete(`/funcionarios/${id}`);
    fetchFuncionarios();
  }

  function handleEdit(funcionario: Funcionario) {
    setForm({
      nome: funcionario.nome,
      salario: funcionario.salario,
      filialId: funcionario.filialId
    });
    setEditing(funcionario);
  }

  return (
    <Box p={3}>
      <h2>Funcionários</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        <TextField
          label="Nome"
          value={form.nome}
          onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
          required
        />
        <TextField
          label="Salário"
          type="number"
          value={form.salario}
          onChange={e => setForm(f => ({ ...f, salario: Number(e.target.value) }))}
          required
        />
        <TextField
          select
          label="Filial"
          value={form.filialId}
          onChange={e => setForm(f => ({ ...f, filialId: Number(e.target.value) }))}
          required
          style={{ minWidth: 120 }}
        >
          <MenuItem value={0} disabled>Selecione</MenuItem>
          {filiais.map(filial => (
            <MenuItem key={filial.id} value={filial.id}>{filial.local}</MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" sx={{ height: 56 }}>
          {editing ? 'Salvar' : 'Adicionar'}
        </Button>
        {editing && (
          <Button color="secondary" onClick={() => { setForm({ nome: "", salario: 0, filialId: 0 }); setEditing(null); }}>
            Cancelar
          </Button>
        )}
      </form>
      <List>
        {funcionarios.map(func => (
          <ListItem
            key={func.id}
            secondaryAction={
              <>
                <IconButton onClick={() => handleEdit(func)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => handleDelete(func.id)}><DeleteIcon /></IconButton>
              </>
            }
          >
            <ListItemText
              primary={`${func.nome}`}
              secondary={`Salário: R$${func.salario} | Filial: ${filiais.find(f => f.id === func.filialId)?.local ?? ''}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
export default FuncionariosPage;
