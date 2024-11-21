"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { usePathname, useRouter } from "next/navigation";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleModal } from "@/store/modelSlice";
import { MainLayoutConstant } from "./layout-const";

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

const drawerWidth = 240;
const navItems = [
  {
    name: "Notes",
    redirect: "keep-notes",
  },
  {
    name: "Login",
    redirect: "sign-in",
  },
];

export default function DrawerAppBar(props: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { window, children } = props;
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {MainLayoutConstant.TITLE}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => router.push(`/${item.redirect}`)}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: pathname === "/keep-notes" ? "flex-start" : "center",
        alignItems: pathname === "/keep-notes" ? "flex-start" : "center",
        background: "#f3f1dd",
        height: "100vh",
        width: "100%",
      }}
    >
      <CssBaseline />
      <AppBar component="nav" sx={{ background: "skyblue" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {MainLayoutConstant.TITLE}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "#fff" }}
                onClick={() => router.push(`/${item.redirect}`)}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        {children}
      </Box>

      {/* Floating "Add" Icon Button */}
      {pathname === "/keep-notes" && (
        <Tooltip title="Add Notes">
          <IconButton
            sx={{
              position: "fixed",
              bottom: 18,
              right: 18,
              zIndex: 1000,
              borderRadius: "50%",
              backgroundColor: "#e4b381",
              "&:hover": {
                backgroundColor: "#e4b381",
              },
            }}
            onClick={() => dispatch(toggleModal())}
          >
            <TextSnippetIcon sx={{ color: "#FFF", fontSize: "20px" }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
