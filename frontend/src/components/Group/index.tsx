
// GroupsPage.tsx
import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';

interface Group {
  id: string;
  name: string;
  memberCount: number;
}

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const mockGroups : Group[] = [
      {
        id: '1',
        name: 'Tech Enthusiasts',
        memberCount: 150
      },
      {
        id: '2', 
        name: 'Book Club',
        memberCount: 7
      },
      {
        id: '3',
        name: 'Fitness Community',
        memberCount: 20
      }
    ];
    setGroups(mockGroups);
  }, []);

  const handleJoinGroup = (groupId: string) => {
    // Add logic to join group
    console.log(`Joined group ${groupId}`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Groups
      </Typography>
      
      <Grid container spacing={3}>
        {groups.map((group) => (
          <Grid item xs={12} sm={6} md={4} key={group.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {group.name}
                </Typography>
        
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Members: {group.memberCount}
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ mt: 2 }}
                  onClick={() => handleJoinGroup(group.id)}
                >
                  Join Group
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GroupsPage;