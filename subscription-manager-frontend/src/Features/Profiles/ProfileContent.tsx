import { observer } from "mobx-react-lite";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";
import { useState, useEffect } from "react";
import type { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import ProfileEditForm from "./ProfileEditForm";
import SubscriptionCard from "../subscriptions/dashboard/SubscriptionCard";
import type { Transaction } from "../../app/models/transaction";
import agent from "../../app/api/agent";

interface Props {
  profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
  const [tab, setTab] = useState(0);
  const { subscriptionStore } = useStore();
  const { subscriptions, loadSubscriptions, loadingInitial } = subscriptionStore;

  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  useEffect(() => {
    if (subscriptions.length === 0) loadSubscriptions();
  }, [subscriptions.length, loadSubscriptions]);

  const userSubscriptions = subscriptions.filter(
    (s) => s.appUserId === profile.id
  );

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);


    if (newValue === 4) {
      loadUserTransactions();
    }
  };

  const loadUserTransactions = async () => {
    try {
      setLoadingTransactions(true);
      const data = await agent.Transactions.listMine();
      setTransactions(data);
    } catch (err) {
      console.error("Error loading transactions:", err);
    } finally {
      setLoadingTransactions(false);
    }
  };

  return (
    <Box
      sx={{ width: "100%", bgcolor: "background.paper", boxShadow: 1, borderRadius: 2 }}
    >
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="Opis" />
        <Tab label="Edytuj profil" />
        <Tab label="Jestem właścicielem" />
        <Tab label="Należe do" />
        <Tab label="Transakcje" /> {/* NEW TAB */}
      </Tabs>

      <Box sx={{ p: 3 }}>
        {/* TAB 0 — OPIS */}
        {tab === 0 && (
          <Box>
            <p><strong>Imię i nazwisko:</strong> {profile.fullName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Bio:</strong> {profile.bio || "Brak opisu."}</p>
          </Box>
        )}

      
        {tab === 1 && <ProfileEditForm profile={profile} />}

     
        {tab === 2 && (
          <Box>
            {loadingInitial ? (
              <Typography color="text.secondary">Ładowanie subskrypcji...</Typography>
            ) : userSubscriptions.length === 0 ? (
              <Typography color="text.secondary">
                Ten użytkownik nie ma jeszcze żadnych subskrypcji.
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {userSubscriptions.map((sub) => (
                  <Grid key={sub.id}>
                    <SubscriptionCard subscription={sub} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        
        {tab === 3 && (
          <Box>
            {loadingInitial ? (
              <Typography color="text.secondary">Ładowanie subskrypcji...</Typography>
            ) : subscriptions.filter((s) =>
                s.contributors.some((c) => c.id === profile.id)
              ).length === 0 ? (
              <Typography color="text.secondary">
                Ten użytkownik nie należy do żadnej subskrypcji.
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {subscriptions
                  .filter((s) => s.contributors.some((c) => c.id === profile.id))
                  .map((sub) => (
                    <Grid key={sub.id} size={{ xs: 12, sm: 6, md: 4 }}>
                      <SubscriptionCard subscription={sub} />
                    </Grid>
                  ))}
              </Grid>
            )}
          </Box>
        )}

        {/* TAB 4 — TRANSAKCJE */}
        {tab === 4 && (
          <Box>
            {loadingTransactions ? (
              <Typography color="text.secondary">Ładowanie transakcji...</Typography>
            ) : transactions.length === 0 ? (
              <Typography color="text.secondary">Brak transakcji.</Typography>
            ) : (
              <Paper sx={{ p: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Nazwa</strong></TableCell>
                      <TableCell><strong>Data</strong></TableCell>
                      <TableCell><strong>Kwota</strong></TableCell>
                      <TableCell><strong>ID Subskrypcji</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell>{t.merchant || "—"}</TableCell>
                        <TableCell>{new Date(t.date).toLocaleDateString("pl-PL")}</TableCell>
                        <TableCell>{t.amount} zł</TableCell>
                        <TableCell>{t.subscriptionId}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default observer(ProfileContent);
