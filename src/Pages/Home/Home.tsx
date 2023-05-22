import React from "react";
import "../../Styles/Home.scss";

function Home() {
  return (
    <>
      <div className="">
        {/*<h3>Welcome</h3>*/}
        <img src={require("../../images/home3.png")} className="img-fluid" alt="..."/>

        <div className="container tile-container mt-5">
          <div className="row">
            <div className="col">
              <div className="card" style={{ width: "18rem" }}>
                <img src={require("../../images/manager.jpg")} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Team Manager</h5>
                  <p className="card-text">

                  </p>
                  <a href="http://localhost:3000/login" className="btn btn-primary">
                    Go to Team Manager
                  </a>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card" style={{ width: "18rem" }}>
                <img src={require("../../images/player.jpg")} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Player</h5>
                  <p className="card-text">

                  </p>
                  <a href="http://localhost:3000/players" className="btn btn-primary">
                    Go to Team Player
                  </a>
                </div>
              </div>
            </div>

            <div className="col ">
              <div className="card" style={{ width: "18rem" }}>
                <img src={require("../../images/admmin.jpg")} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Admin</h5>
                  <p className="card-text">

                  </p>
                  <a href="http://localhost:3000/login" className="btn btn-primary">
                    Go to Team Admin
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
