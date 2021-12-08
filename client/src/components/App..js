import './App.css';
import { Switch, Route } from 'react-router-dom'
import Home from './pages/index/Home';
import BarPage from './pages/BarList/BarPage'
/* import CoasterDetails from './pages/coasterDetails/Details'; */
import Navbar from './layout/Navbar'

function App() {
    return (
        <>

            <Navbar />

            <main>
                <Switch>
                    <Route path="/" exact render={() => <Home />} />
                    <Route path="/Bar-list" render={() => <BarPage />} />
                    {/* <Route path="/coaster/:id" render={(props) => <CoasterDetails {...props} />} /> */}
                </Switch>
            </main>
        </>
    )
}

export default App;