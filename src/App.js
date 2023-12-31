import logo from './logo.svg';
import './App.css';
import WebSocketComponent from "./WebSocketComponent";
import {v4 as uuidv4} from 'uuid';

function App() {
    const userId = uuidv4();
    return (
        <div className="App">
            <WebSocketComponent
                userId={userId}
            />
        </div>
    );
}

export default App;
