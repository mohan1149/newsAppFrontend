import React, { Suspense } from "react";
import { Provider } from 'react-redux';
import store from './reducer/store';
import AppRouter from "./router/AppRouter";
const App = () => {
  return (
    <Provider store={store}>
      <Suspense fallback="loading....">
        <AppRouter />
      </Suspense>
    </Provider>

  );

}
export default App;
