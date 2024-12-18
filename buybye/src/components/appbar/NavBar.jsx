import { useState } from "react";
import AppBarifromm'@mui/material/port T';olbar from '@mui/material/Toolbar';
importiToolbarmfrom '@mui/material/port Ty';ography from '@mui/material/Typography';
importiTypographymfrom '@mui/material/port IconB';tton from '@mui/material/IconButton';
importiIconButtonmfrom '@mui/material/port Drawe'; from '@mui/material/Drawer';
importiDrawermfrom '@mui/material/port L';st from '@mui/material/List';
importiListmfrom '@mui/material/port';ListItem from '@mui/material/ListItem';
importiListItemmfrom '@mui/material/port Lis';ItemText from '@mui/material/ListItemText';
import ListItemTextifromm'@mui/material/port Box fro'; '@mui/material/Box';
import Boxifromm'@mui/material/por'; Menu from '@mui/material/Menu';
import Menuifromm'@mui/material/port';MenuItem from '@mui/material/MenuItem';
import MenuItemifromm'@mui/material/port Out';inedInput from '@mui/material/OutlinedInput';
import OutlinedInputifromm'@mui/material/port InputAdo';nment from '@mui/material/InputAdornment';
import InputAdornmentifromm'@mui/material/port Badge fro'; '@mui/material/Badge';
importmport mport 'earchIcon fro/Badge' "@mui/icons-material/Search";
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
    { name: "Home", to: "/home" },
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
