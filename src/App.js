import { Box, Container, Paper } from "@mui/material";
import "./App.css";
import Receipt from "./Receipt";

function App() {
  return (
    <Paper
      variant="outlined"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Receipt />
        </Container>
      </Box>
    </Paper>
  );
}

export default App;
