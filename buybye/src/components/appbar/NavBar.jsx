import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Badge from '@mui/material/Badge';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import style from "./NavBar.module.scss";
function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const links = [
    { name: "Home", to: "/" },
    { name: "Shop", to: "/shop" },
    { name: "Ration Pack", to: "/ration-pack" },
    { name: "Contact", to: "/contact" },
    { name: "About Us", to: "/about-us" },
    isMobile ? { name: "Cart", to: "/cart" } : {},
  ];

  return (
    <AppBar position="relative" color="warning" className={style.appbar}>
      <Toolbar>
        {/* Mobile View */}
        {isMobile && (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={handleDrawerToggle}
                onKeyDown={handleDrawerToggle}
              >
                <List>
                  {links.map((link) => (
                    <ListItem
                      button
                      key={link.name}
                      component={Link}
                      to={link.to}
                    >
                      <ListItemText primary={link.name} />
                    </ListItem>
                  ))}
                  <OutlinedInput
                    sx={{
                      marginLeft: 1,
                      width: "25ch",
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.main",
                      },
                    }}
                    autoComplete="on"
                    inputProps={{ "aria-label": "search" }}
                    size="small"
                    placeholder="Search here"
                    type="search"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton>
                          <SearchIcon color="primary" />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </List>
              </Box>
            </Drawer>
          </>
        )}

        {/* BuyBye Title */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: isMobile ? 1 : 0,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          BuyBye
        </Typography>
        {isMobile && (
          <>
            {/* Mobile Cart and Profile Icons */}
            <Box sx={{}}>
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleProfileMenuOpen}
                sx={{ marginRight: 15 }}
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </>
        )}

        {/* Desktop View Links */}
        {!isMobile && (
          <>
            <OutlinedInput
              sx={{
                marginLeft: 4,
                marginRight: 4,
                width: "35ch",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              }}
              autoComplete="on"
              inputProps={{ "aria-label": "search" }}
              size="small"
              placeholder="Search here"
              type="search"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              }
            />
            {links.map((link) => (
              <Typography
                key={link.name}
                component={Link}
                to={link.to}
                sx={{
                  marginLeft: 2,
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: 500,
                }}
              >
                {link.name}
              </Typography>
            ))}
          </>
        )}

        {/* Cart and Profile Icons (Visible on Desktop) */}
        {!isMobile && (
          <Box
            sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
          >
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
        >
          <MenuItem onClick={handleProfileMenuClose} href="/login">
            Login
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>Sign Up</MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
