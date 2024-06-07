import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
// import { Dashboard  } from "@mui/icons-material";
// import Navbar from "@/scenes/navbar";
// import Dashboard from "@/scenes/dashboard";
// import Predictions from "@/scenes/predictions";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> 
          {/* commented out this portion bc it needed other files in order to not receive an error */}
          {/* <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/predictions" element={<Predictions />} />
            </Routes>
          </Box> */}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
