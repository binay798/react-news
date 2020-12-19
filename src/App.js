import Homepage from "./containers/Homepage/Homepage";
import Layout from "./hoc/Layout/Layout";
import Details from './containers/Details/Details'
import Auth from './containers/Auth/Auth'
import { Route, Switch } from 'react-router-dom'
function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/accounts"  component={Auth} />
        <Route path="/details"  component={Details} />
        <Route path="/" exact component={Homepage} />
      </Switch>
    </Layout>
  );
}

export default App;
