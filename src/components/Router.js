import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

import EatTogether from "routes/EatTogether";
import WriteEat from "components/EaTN/WriteEat";
import DetailEat from "components/EaTN/DetailEat";

import GoodsTogether from "routes/GoodsTogether";
import WriteGoods from "components/GoodsTN/WriteGoods";
import DetailGoods from "./GoodsTN/DetailGoods";

import TaxiTogether from "routes/TaxiTogether";
import WriteTaxi from "components/TaxiTN/WriteTaxi";
import DetailTaxi from "./TaxiTN/DetailTaxi";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>

            <Route exact path="/eatTogether">
              <EatTogether userObj={userObj} />
            </Route>
            <Route exact path="/eatTogether/writeeat">
              <WriteEat userObj={userObj} />
            </Route>
            <Route
              exact
              path="/eatTogether/detailEat/:no"
              component={DetailEat}
              userObj={userObj}
            />

            <Route exact path="/goodsTogether">
              <GoodsTogether userObj={userObj} />
            </Route>
            <Route exact path="/goodsTogether/writegoods">
              <WriteGoods userObj={userObj} />
            </Route>
            <Route
              exact
              path="/goodsTogether/detailGoods/:no"
              component={DetailGoods}
              userObj={userObj}
            />

            <Route exact path="/taxiTogether">
              <TaxiTogether userObj={userObj} />
            </Route>
            <Route exact path="/taxiTogether/writetaxi">
              <WriteTaxi userObj={userObj} />
            </Route>
            <Route
              exact
              path="/taxiTogether/detailtaxi/:no"
              component={DetailTaxi}
              userObj={userObj}
            />
          </div>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;
