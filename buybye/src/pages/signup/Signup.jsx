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
import style from "./Signup.module.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpSlicerFunc } from "../../redux/user/userSlice";
import ROUTES from "../../routes/routes";

function Signup() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(user.success);

  const [userData, setUserData] = useState({
    name: "razib",
    email: "razib@gmail.com",
    password: "Password1789",
    role: "Consumer",
    address: "xyz",
    phone: "9871979816",
  });
  useEffect(() => {
    setError(user);
  }, [user]);
  useEffect(() => {
    if (user.success || user.userProfile) {
      navigate(ROUTES.HOMEPAGE);
    }
  }, [user.success, navigate]);
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const validateData = (userData) => {
    debugger;
    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.role ||
      !userData.address ||
      !userData.phone
    ) {
      setError("All fields are required");
      return false;
    }
    if (userData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (
      !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email)
    ) {
      setError("Please enter a valid email address");
      return false;
    }

    setError("");
    return true;
  };

  return (
    <Grid
      container
      style={{ minHeight: "100vh", overflowY: "hidden" }}
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      {/* Left Side */}

      {!isMobile && (
        <Grid
          item
          xs={12}
          md={6}
          style={{
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
            <Box>
              <Carousel
                autoPlay
                infiniteLoop
                axis="horizontal"
                showThumbs={false}
                showStatus={false}
                showArrows={false}
              >
                <div>
                  <img
                    src="https://via.placeholder.com/600x600"
                    alt="Image 1"
                    style={{
                      borderRadius: "8px",
                    }}
                  />
                  <p
                    className="legend"
                    style={{
                      fontSize: "20px",
                      backgroundColor: "none",
                      color: "black",
                    }}
                  >
                    Welcome to our platform!
                  </p>
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/600x600"
                    alt="Image 2"
                    style={{
                      borderRadius: "8px",
                    }}
                  />
                  <p className="legend">
                    Effortless account management awaits!
                  </p>
                </div>
              </Carousel>
            </Box>
          </Box>
        </Grid>
      )}

      {/* Right Side (Signup Box) */}
      <Grid
        item
        xs={12}
        md={6}
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <Box
          className={style.signupBox}
          style={{
            margin: "auto",
            width: "90%",
            maxheight: "70vh",
            maxWidth: isMobile ? "400px" : "700px",
            padding: "1rem",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            backgroundColor: "white",
            overflow: "hidden",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Sign Up
          </Typography>

          <form>
            {/* Name Field */}
            <TextField
              label="Full Name"
              type="text"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />

            {/* Email Field */}
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />

            {/* Password Field */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
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
            {/*address */}
            <TextField
              label="Address"
              type="text"
              fullWidth
              margin="normal"
              variant="outlined"
              value={userData.address}
              onChange={(e) => {
                setUserData({ ...userData, address: e.target.value });
              }}
            />
            {/* phone */}
            <TextField
              label="Phone"
              type="text"
              fullWidth
              margin="normal"
              variant="outlined"
              value={userData.phone}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  phone: e.target.value,
                });
              }}
            />
            {/* Role */}
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={userData.role}
                onChange={(e) =>
                  setUserData({ ...userData, role: e.target.value })
                }
              >
                <MenuItem value="Consumer">Consumer</MenuItem>
                <MenuItem value="Vendor">Vendor</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>

            {/* Signup Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "1rem" }}
              onClick={() => {
                if (validateData(userData)) {
                  debugger;
                  dispatch(signUpSlicerFunc(userData));
                }
              }}
            >
              Sign Up
            </Button>
          </form>

          {/* Already have an account */}
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          >
            Already have an account?{" "}
            <Button variant="text" color="primary">
              Log In
            </Button>
          </Typography>

          <Divider>OR</Divider>

          {/* Social Signup Buttons */}
          <Box
            style={{
              marginTop: "0.5rem",
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
              Sign Up with Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              color="primary"
              fullWidth
            >
              Sign Up with Facebook
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Signup;
