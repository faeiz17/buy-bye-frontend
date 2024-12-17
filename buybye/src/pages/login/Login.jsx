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
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSlicerFunc } from "../../redux/user/userSlice";
import ROUTES from "../../routes/routes";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(user.success);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setError(user.error);
  }, [user]);
  useEffect(() => {
    if (user.success || user.userProfile) {
      navigate(ROUTES.HOMEPAGE); // Navigate to homepage when login is successful
    }
  }, [user.success, navigate]);

  const validateData = (data) => {
    debugger;
    if (!data.email || !data.password) {
      setError("Please fill all fields");
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
              onClick={() => {
                if (validateData(loginData)) {
                  debugger;

                  dispatch(loginSlicerFunc(loginData));
                }
              }}
            >
              Log In
            </Button>
          </form>

          {/* Don't have an account */}
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            Don’t have an account?{" "}
            <Button variant="text" color="primary">
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
