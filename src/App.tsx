import { Container } from "@mui/material";
import "./App.css";
import Header from "./containers/Header/Header.index";
import AppBoard from "./containers/App/AppBoard";

function App() {
  return (
    <Container maxWidth={false} disableGutters sx={{ height: "100vh" }}>
      <Header />
      <AppBoard />
    </Container>
  );
}

export default App;
