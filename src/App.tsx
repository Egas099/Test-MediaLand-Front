import { useTypedSelector } from './shared/hooks/useTypedRedux';
import Login from 'pages/Login/Login';
import Notes from 'pages/Notes/Notes';

function App() {
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    return <>{isAuth ? <Notes /> : <Login />}</>;
}

export default App;
