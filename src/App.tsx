import { useTypedSelector } from './shared/hooks/useTypedRedux';
import Login from './Pages/Login/Login';
import Notes from './Pages/Notes/Notes';

function App() {
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    return <>{isAuth ? <Notes /> : <Login />}</>;
}

export default App;
