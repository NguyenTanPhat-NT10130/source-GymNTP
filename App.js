import * as React from 'react';
import Login from './components/LoginComponent';
import SignUp from './components/SignUpComponent';
import Home from './components/HomeComponent';
import Main from './components/MainComponent';
import Package from './components/PackageComponent';
import MonthlySubscriptions from './components/MonthlySubscriptionsComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';
const store = ConfigureStore();
function App() {
  return (
    <Provider store={store}>
        <Main />
      </Provider>
  );
}

export default App;
