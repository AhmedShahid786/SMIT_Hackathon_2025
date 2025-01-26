import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Button,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  ShoppingCart as OrderIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const AdminDashboard = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">Admin Panel</Typography>
        </Box>
        <List>
          {[
            { text: "Dashboard", icon: <DashboardIcon />, active: true },
            { text: "Users", icon: <UsersIcon /> },
            { text: "Orders", icon: <OrderIcon /> },
            { text: "Analytics", icon: <AnalyticsIcon /> },
            { text: "Settings", icon: <SettingsIcon /> },
          ].map((item) => (
            <ListItem
              key={item.text}
              sx={{
                backgroundColor: item.active ? "action.selected" : "inherit",
                "&:hover": { backgroundColor: "action.hover" },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <Grid container spacing={3}>
          {[
            {
              title: "Total Users",
              value: "1,234",
              change: "+12%",
              icon: <UsersIcon />,
            },
            {
              title: "Total Orders",
              value: "456",
              change: "+5%",
              icon: <OrderIcon />,
            },
            {
              title: "Revenue",
              value: "$45,231",
              change: "+8%",
              icon: <AnalyticsIcon />,
            },
            {
              title: "Active Now",
              value: "12",
              change: "Users online",
              icon: <ChevronRightIcon />,
            },
          ].map((metric) => (
            <Grid item xs={12} sm={6} md={3} key={metric.title}>
              <Card>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">{metric.icon}</IconButton>
                  }
                  title={
                    <Typography variant="subtitle2" color="text.secondary">
                      {metric.title}
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {metric.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {metric.change}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Recent Orders" />
              <CardContent>
                {[1, 2, 3].map((order) => (
                  <Box
                    key={order}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2">
                        Order #{1000 + order}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        John Doe
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2">$129.99</Typography>
                    <Button size="small" variant="outlined">
                      View
                    </Button>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Quick Actions" />
              <CardContent>
                <Grid container spacing={2}>
                  {[
                    { text: "Manage Users", icon: <UsersIcon /> },
                    { text: "System Settings", icon: <SettingsIcon /> },
                    { text: "New Order", icon: <OrderIcon /> },
                    { text: "Generate Report", icon: <AnalyticsIcon /> },
                  ].map((action) => (
                    <Grid item xs={6} key={action.text}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={action.icon}
                      >
                        {action.text}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
