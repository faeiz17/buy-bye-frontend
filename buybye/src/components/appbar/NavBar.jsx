import { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReceiptIcon from "@mui/icons-material/Receipt";

import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { alpha } from '@mui/material/styles';

import style from "./NavBar.module.scss";

function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const { isLoggedIn, user, logout } = useAuth();
  const { getCartCount } = useCart();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const getNavIcon = (name) => {
    switch(name) {
      case "Home": return <HomeIcon />;
      case "Shop": return <StoreIcon />;
      case "Ration Pack": return <LocalShippingIcon />;
      case "Contact": return <ContactMailIcon />;
      case "About Us": return <InfoIcon />;
      case "Cart": return <ShoppingCartIcon />;
      case "Orders": return <ReceiptIcon />;
      default: return null;
    }
  };

  const links = [
    { name: "Home", to: "/" },
    { name: "Shop", to: "/shop" },
    { name: "Ration Pack", to: "/ration-pack" },
    ...(isLoggedIn ? [{ name: "Orders", to: "/orders" }] : []),
    { name: "Contact", to: "/contact" },
    { name: "About Us", to: "/about-us" },
    isMobile ? { name: "Cart", to: "/cart" } : {},
  ].filter(link => link.name);

  return (
    <AppBar 
      position="sticky" 
      elevation={scrolled ? 4 : 0}
      sx={{
        bgcolor: 'warning.main',
        transition: 'all 0.3s ease',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(77, 33, 109, 0.1)' : 'none',
      }}
      className={`${style.appbar} ${scrolled ? style.scrolled : ''}`}
    >
      <Toolbar sx={{ py: { xs: 1, md: 1.5 } }}>
        {/* Mobile View */}
        {isMobile && (
          <>
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'warning.contrastText',
                '&:hover': {
                  bgcolor: alpha('#4d216d', 0.08),
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            
            {/* Mobile Drawer */}
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              PaperProps={{
                sx: {
                  width: '85%',
                  maxWidth: 300,
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
                  bgcolor: '#FFFFFF',
                  boxShadow: '0 8px 24px rgba(77, 33, 109, 0.12)'
                }
              }}
            >
              <Box sx={{ 
                p: 2, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(77, 33, 109, 0.1)',
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'primary.main',
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  BuyBye
                </Typography>
                <IconButton onClick={handleDrawerToggle}>
                  <CloseIcon color="primary" />
                </IconButton>
              </Box>
              
              <Box sx={{ mt: 2, mb: 2, mx: 2 }}>
                <Paper
                  component={Link}
                  to="/search"
                  elevation={0}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid rgba(77, 33, 109, 0.2)',
                    borderRadius: 2,
                    bgcolor: alpha('#f5f5f5', 0.7),
                    px: 1,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: alpha('#f5f5f5', 0.9),
                      border: '2px solid #4d216d',
                    }
                  }}
                >
                  <Typography
                    sx={{ ml: 1, flex: 1, color: 'text.secondary', fontSize: '0.875rem' }}
                  >
                    Search products...
                  </Typography>
                  <IconButton sx={{ p: 1 }}>
                    <SearchIcon color="primary" fontSize="small" />
                  </IconButton>
                </Paper>
              </Box>
              
              <List sx={{ px: 1 }}>
                {links.map((link) => (
                  <ListItem
                    key={link.name}
                    component={Link}
                    to={link.to}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      '&:hover': {
                        bgcolor: alpha('#4d216d', 0.08),
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: '#4d216d' }}>
                      {getNavIcon(link.name)}
                    </ListItemIcon>
                    <ListItemText 
                      primary={link.name} 
                      primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 500,
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ 
                mt: 'auto', 
                p: 2, 
                borderTop: '1px solid rgba(77, 33, 109, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}>
                {!isLoggedIn ? (
                  <>
                    <MenuItem 
                      component={Link} 
                      to="/login"
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: alpha('#4d216d', 0.08),
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40, color: '#4d216d' }}>
                        <LoginIcon />
                      </ListItemIcon>
                      <ListItemText primary="Login" />
                    </MenuItem>
                    <MenuItem 
                      component={Link} 
                      to="/signup"
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: alpha('#4d216d', 0.08),
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40, color: '#4d216d' }}>
                        <HowToRegIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sign Up" />
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem 
                      component={Link} 
                      to="/profile"
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: alpha('#4d216d', 0.08),
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40, color: '#4d216d' }}>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary={user?.name || "Profile"} />
                    </MenuItem>
                    <MenuItem 
                      component={Link} 
                      to="/orders"
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: alpha('#4d216d', 0.08),
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40, color: '#4d216d' }}>
                        <ReceiptIcon />
                      </ListItemIcon>
                      <ListItemText primary="Orders" />
                    </MenuItem>
                    <MenuItem 
                      onClick={() => {
                        logout();
                        handleDrawerToggle();
                      }}
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: alpha('#4d216d', 0.08),
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40, color: '#4d216d' }}>
                        <LoginIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </>
        )}

        {/* Logo */}
        <Typography
          component={Link}
          to="/"
          variant="h5"
          sx={{
            flexGrow: isMobile ? 1 : 0,
            textAlign: isMobile ? "center" : "left",
            fontWeight: 700,
            color: 'warning.contrastText',
            fontFamily: '"Poppins", sans-serif',
            letterSpacing: '-0.5px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              textDecoration: 'none',
            }
          }}
        >
          Buy<Box component="span" sx={{ color: '#ffd600' }}>Bye</Box>
        </Typography>

        {/* Desktop Search Bar */}
        {!isMobile && (
          <Paper
            component={Link}
            to="/search"
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: isTablet ? '30%' : '35%',
              ml: 4,
              mr: isTablet ? 2 : 4,
              px: 2,
              py: 0.5,
              borderRadius: 3,
              border: '1px solid rgba(77, 33, 109, 0.2)',
              bgcolor: alpha('#f5f5f5', 0.7),
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': {
                bgcolor: alpha('#f5f5f5', 0.9),
                transform: 'translateY(-1px)',
                boxShadow: 3,
                border: '2px solid #4d216d',
              }
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <Typography
              sx={{
                flex: 1,
                color: 'text.secondary',
                fontSize: '0.875rem',
                pointerEvents: 'none',
              }}
            >
              Search for products...
            </Typography>
          </Paper>
        )}

        {/* Mobile Cart and Profile Icons */}
        {isMobile && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              aria-label="cart"
              component={Link}
              to="/cart"
              sx={{ 
                color: 'warning.contrastText',
                '&:hover': {
                  bgcolor: alpha('#4d216d', 0.08),
                }
              }}
            >
              <Badge badgeContent={getCartCount()} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            
            <IconButton
              aria-label="account"
              onClick={handleProfileMenuOpen}
              sx={{ 
                color: 'warning.contrastText',
                '&:hover': {
                  bgcolor: alpha('#4d216d', 0.08),
                }
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
        )}

        {/* Desktop View Links */}
        {!isMobile && (
          <>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              flexGrow: 1,
              justifyContent: 'center',
              ml: isTablet ? 1 : 2
            }}>
              {links.map((link) => (
                <Typography
                  key={link.name}
                  component={Link}
                  to={link.to}
                  sx={{
                    px: isTablet ? 1 : 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    color: 'warning.contrastText',
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    position: 'relative',
                    overflow: 'hidden',
                    textTransform: 'uppercase',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: '0%',
                      height: '3px',
                      backgroundColor: '#ffd600',
                      transition: 'all 0.3s ease',
                      transform: 'translateX(-50%)',
                      borderRadius: '4px 4px 0 0',
                    },
                    '&:hover': {
                      backgroundColor: alpha('#4d216d', 0.08),
                      '&::after': {
                        width: '60%',
                      }
                    },
                    '&:focus': {
                      '&::after': {
                        width: '70%',
                      }
                    }
                  }}
                >
                  {link.name}
                </Typography>
              ))}
            </Box>
          </>
        )}

        {/* Desktop Cart and Profile Icons */}
        {!isMobile && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1
          }}>
            <Tooltip title="Favorites" arrow>
              <IconButton 
                color="inherit"
                sx={{ 
                  color: 'warning.contrastText',
                  '&:hover': {
                    bgcolor: alpha('#4d216d', 0.08),
                  }
                }}
              >
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Shopping Cart" arrow>
              <IconButton 
                aria-label="cart"
                component={Link}
                to="/cart"
                sx={{ 
                  color: 'warning.contrastText',
                  '&:hover': {
                    bgcolor: alpha('#4d216d', 0.08),
                  }
                }}
              >
                <Badge 
                  badgeContent={getCartCount()} 
                
                  color= 'secondary'
                  sx={{
                    '& .MuiBadge-badge': {
                      fontWeight: 'bold',
                      color:"purple"
                    }
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Account" arrow>
              <IconButton
                edge="end"
                onClick={handleProfileMenuOpen}
                sx={{ 
                  color: 'warning.contrastText',
                  '&:hover': {
                    bgcolor: alpha('#4d216d', 0.08),
                  }
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: alpha('#4d216d', 0.85),
                    fontSize: 16
                  }}
                >
                  U
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {/* Account Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              borderRadius: 2,
              minWidth: 180,
              mt: 1,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(77, 33, 109, 0.15))',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          TransitionComponent={Fade}
        >
          {!isLoggedIn ? (
            <>
              <MenuItem 
                onClick={handleProfileMenuClose} 
                component={Link} 
                to="/login"
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  gap: 1.5,
                  '&:hover': {
                    bgcolor: alpha('#4d216d', 0.08),
                  }
                }}
              >
                <LoginIcon fontSize="small" sx={{ color: '#4d216d' }} />
                <Typography>Login</Typography>
              </MenuItem>
              
              <MenuItem 
                onClick={handleProfileMenuClose}
                component={Link} 
                to="/signup"
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  gap: 1.5,
                  '&:hover': {
                    bgcolor: alpha('#4d216d', 0.08),
                  }
                }}
              >
                <HowToRegIcon fontSize="small" sx={{ color: '#4d216d' }} />
                <Typography>Sign Up</Typography>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem 
                onClick={handleProfileMenuClose}
                component={Link} 
                to="/profile"
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  gap: 1.5,
                  '&:hover': {
                    bgcolor: alpha('#4d216d', 0.08),
                  }
                }}
              >
                <PersonIcon fontSize="small" sx={{ color: '#4d216d' }} />
                <Typography>{user?.name || "Profile"}</Typography>
              </MenuItem>
              <MenuItem 
                onClick={handleProfileMenuClose}
                component={Link} 
                to="/orders"
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  gap: 1.5,
                  '&:hover': {
                    bgcolor: alpha('#4d216d', 0.08),
                  }
                }}
              >
                <ReceiptIcon fontSize="small" sx={{ color: '#4d216d' }} />
                <Typography>Orders</Typography>
              </MenuItem>
              
              <Box sx={{ my: 1, borderTop: '1px solid rgba(77, 33, 109, 0.1)' }} />
              
              <MenuItem 
                onClick={() => {
                  logout();
                  handleProfileMenuClose();
                }}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  gap: 1.5,
                  '&:hover': {
                    bgcolor: alpha('#4d216d', 0.08),
                  }
                }}
              >
                <LoginIcon fontSize="small" sx={{ color: '#4d216d' }} />
                <Typography>Logout</Typography>
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;