import Router from './router/Router'
import { ThemeProvider, createTheme } from '@material-ui/core/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: "#171717"
    },
    secondary: {
      main: "#DA0037"
    },
    idle: {
      main: '#444444'
    },
    smallWhite: {
      main: '#EDEDED'
    }
  }
});


function App() {
  return (
    <ThemeProvider theme = {theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
