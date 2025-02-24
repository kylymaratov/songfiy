import { Header } from './components/Header/Header';
import { Player } from './components/Player/Player';
import { UseTheme } from './hooks/UseTheme';

function App() {
  const {} = UseTheme();
  return (
    <div id="container">
      <div id="header">
        <Header />
      </div>
      <div id="player" className="fixed bottom-0 left-0 w-full">
        <Player />
      </div>
    </div>
  );
}

export default App;
