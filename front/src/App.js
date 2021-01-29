import { Route } from 'react-router-dom';
import Lobby from './components/Lobby';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {withRouter,Switch} from 'react-router-dom';
import MakeRoom from './components/MakeRoom';
import Game from './components/Game';
import NotFound from './components/NotFound';

function App() {  
  console.log('App 랜더링')
  return (
    
    <>
    <Switch>
    <Route path='/' component={Login} exact={true}/>
    <Route path='/lobby' component={Lobby}/>
    <Route path='/signup' component={SignUp}/>
    <Route path='/makeRoom' component={MakeRoom}/>
    <Route path='/game' component={Game}/>
    <Route component={NotFound}/>
    </Switch>
    </>
  );
}

export default withRouter(App);
