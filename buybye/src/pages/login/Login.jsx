import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";

function Login() {
  return (
    <>
      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          We&apos;ll never share your email.
        </FormHelperText>
      </FormControl>
    </>
  );
}

export default Login;
