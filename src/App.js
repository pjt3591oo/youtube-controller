import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
