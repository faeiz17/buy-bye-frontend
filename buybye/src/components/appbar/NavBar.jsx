import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function NavBar() {
  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h6">BuyBye</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
