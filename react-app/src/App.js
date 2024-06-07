import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import BrowsePage from "./components/BrowsePage";
import SinglePin from "./components/SinglePin";
import NewPin from "./components/NewPin";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route exact path='/' component={SplashPage} />
          <ProtectedRoute exact path="/browse">
            <Navigation />
            <BrowsePage isLoaded={isLoaded} />
          </ProtectedRoute>
          <ProtectedRoute exact path='/pin/:pinId'>
            <Navigation />
            <SinglePin />
          </ProtectedRoute>
          <ProtectedRoute exact path='/new-pin'>
            <Navigation />
            <NewPin />
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
