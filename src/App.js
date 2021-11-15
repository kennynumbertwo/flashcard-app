import './styles/App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainContainer from './MainContainer';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(51, 170, 137, 1)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MainContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
