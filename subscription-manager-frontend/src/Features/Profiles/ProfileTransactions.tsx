import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import type { Transaction } from "../../app/models/transaction";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from "@mui/material";

export default function ProfileTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Transactions.listMine()
      .then(setTransactions)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Typography>Ładowanie transakcji...</Typography>;

  if (transactions.length === 0)
    return <Typography color="text.secondary">Brak transakcji.</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Kwota</TableCell>
            <TableCell>Subskrypcja</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions.map(t => (
            <TableRow key={t.id}>
              <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
              <TableCell>{t.amount} zł</TableCell>
              <TableCell>{t.subscriptionId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
