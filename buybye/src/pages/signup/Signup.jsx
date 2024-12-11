import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import style from "./Signup.module.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Signup() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPassword((prev) => !prev);
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

            {/* <img
              src="https://via.placeholder.com/600x600"
              alt="Signup Illustration"
              style={{
                width: "700px",
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
                Join Us Today!
              </Typography>
              <Typography variant="body1" align="center">
                Create an account and start managing your orders effortlessly.
              </Typography>
            </div> */}
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
            />

            {/* Email Field */}
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />

            {/* Password Field */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password Field */}
            <TextField
              label="Confirm Password"
              type={confirmPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleConfirmPasswordVisibility}>
                      {!confirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Signup Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "1rem" }}
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
