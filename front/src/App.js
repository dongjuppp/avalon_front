import { Route } from 'react-router-dom';
import Lobby from './components/Lobby';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {withRouter} from 'react-router-dom';
import MakeRoom from './components/MakeRoom';
import Game from './components/Game';

function App() {  
  console.log('App 랜더링')
  return (
    
    <>
    <Route path='/' component={Login} exact/>
    <Route path='/lobby' component={Lobby}/>
    <Route path='/signup' component={SignUp}/>
    <Route path='/makeRoom' component={MakeRoom}/>
    <Route path='/game' component={Game}/>
    </>
  );
}

export default withRouter(App);
