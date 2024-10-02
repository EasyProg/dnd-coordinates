import './App.scss';
import { CircleContainer } from './components/CircleContainer';
import { CircleProvider } from './components/ContextProvider';
import { MaterialSelect } from './components/MaterialSelect';

function App() {
  return (
    <div className="App">
      <CircleProvider>
        <CircleContainer />
        <MaterialSelect />
      </CircleProvider>
    </div>
  );
}

export default App;
