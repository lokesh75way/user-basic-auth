import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const groups = [
  { name: 'Developers Hub', type: 'PUBLIC' },
  { name: 'Marketing Squad', type: 'PRIVATE' },
];

export default function ChatAppHome() {
  const navigate = useNavigate();
  return (
    <Box>
      {/* Hero Section */}
      <Container maxWidth='lg' sx={{ textAlign: 'center', my: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant='h3' gutterBottom>
            Welcome to ChatApp
          </Typography>
          <Typography variant='h6' color='textSecondary' paragraph>
            Connect with your friends and colleagues instantly, securely, and
            effortlessly.
          </Typography>
          <Button variant='contained' color='primary' size='large'>
            Get Started
          </Button>
        </Paper>
      </Container>

      {/* Groups Section */}
      <Container maxWidth='lg' sx={{ mt: 4 }}>
        <Typography variant='h5' gutterBottom>
          Your Groups
        </Typography>
        <Grid container spacing={2}>
          {groups.map((group, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant='h6'>{group.name}</Typography>
                <Chip
                  label={group.type}
                  color={group.type === 'PUBLIC' ? 'success' : 'secondary'}
                />
                <Button variant='outlined' color='primary' sx={{ mt: 2 }}>
                  Open Group
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Button
        variant='contained'
        color='primary'
        onClick={() => navigate('/group')}
        sx={{ my: 5, mx: 'auto', display: 'block' }}
      >
        View All Groups
      </Button>
    </Box>
  );
}
