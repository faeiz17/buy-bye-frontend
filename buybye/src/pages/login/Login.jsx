import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuthLoading, selectAuthError, selectIsAuthenticated } from "../../redux/slices/authSlice";
import ROUTES from "../../routes/routes";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select from Redux store using correct selectors
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // If user is authenticated, redirect to homepage
    if (isAuthenticated) {
      navigate(ROUTES.HOMEPAGE);
    }
  }, [isAuthenticated, navigate]);

  const validateData = (data) => {
    if (!data.email || !data.password) {
      return false;
    }
    return true;
  };

  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = () => {
    if (validateData(loginData)) {
      dispatch(login(loginData));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Grid
      container
      style={{ minHeight: "100vh", overflowY: "hidden !important" }}
    >
      {/* Left Side */}
      {!isMobile && (
        <Grid
          item
          xs={12}
          md={6}
          style={{
            backgroundColor: "#1976d2", // Primary main color
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            objectFit: "contain",
            overflow: "hidden",
          }}
        >
          <Box>
            <img
              src="https://via.placeholder.com/600x600"
              alt="Login Illustration"
              style={{
                width: "80px",
                borderRadius: "8px",
                position: "absolute",
                zIndex: "1",
                left: "0",
                top: "0",
                height: "100vh",
              }}
            />
            <div style={{ position: "relative", zIndex: "10" }}>
              <Typography variant="h4" align="center" gutterBottom>
                Welcome Back!
              </Typography>
              <Typography variant="body1" align="center">
                Manage your account, track orders, and more with our platform.
              </Typography>
            </div>
          </Box>
        </Grid>
      )}

      {/* Right Side (Login Box) */}
      <Grid
        item
        xs={12}
        md={6}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <Box
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "2rem",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          {error && (
            <Alert severity="error" style={{ marginBottom: "1rem" }}>
              {error}
            </Alert>
          )}

          <form>
            {/* Email Field */}
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={loginData.email}
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
              }}
              onKeyPress={handleKeyPress}
            />

            {/* Password Field */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={loginData.password}
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {!showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Login Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "1rem" }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
            </Button>
          </form>

          {/* Forgot Password Link */}
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "0.5rem" }}
          >
            <Button 
              variant="text" 
              color="primary" 
              size="small"
              onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
            >
              Forgot Password?
            </Button>
          </Typography>

          {/* Don't have an account */}
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
          >
            Don't have an account?{" "}
            <Button 
              variant="text" 
              color="primary"
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Sign Up
            </Button>
          </Typography>

          <Divider>OR</Divider>

          {/* Social Login Buttons */}
          <Box
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              color="error"
              fullWidth
            >
              Login with Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              color="primary"
              fullWidth
            >
              Login with Facebook
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;