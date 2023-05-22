import React, {useEffect, useState} from "react";
import axiosclass from "../../Config/axiosclass";

interface goalDetails {
    game_id:number;
    player_id:number;
    goal:String;
}

interface Games {
    game_id:number;
    sport_name:String;
    team_id:number;
    date:String;
    time:String;
    location:String;
}






//goal details
function Players() {

    useEffect(()=>{
        axiosclass.get('/goals')
            //.then((res)=>console.log(res.data))
            .then((res) => setGoal(res.data))
            .catch((err)=>console.log(err))
    },[])

    const [goal, setGoal] = useState<Array<goalDetails>>([])

    // game details

    useEffect(()=>{
        axiosclass.get('/game')
            .then((res)=>setGame(res.data))
            .catch((res)=>console.log(res))
    })

    const [game, setGame] = useState<Array<Games>>([])



  return (
    <>



        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button" role="tab" aria-controls="pills-home" aria-selected="true">Game Statics
                </button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Players
                </button>
            </li>



        </ul>
        <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                 aria-labelledby="pills-home-tab"
            >
                {/*table start*/}

                <div className="">
                    <h3>Game Statics</h3>

                    <hr/>

                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Game ID</th>
                            <th scope="col">Player Id</th>
                            <th scope="col">Goal</th>


                        </tr>
                        </thead>
                        <tbody>
                        {goal.length > 0 ? (
                            goal.map((goalStatic) => (
                                <tr key={goalStatic.player_id}>
                                    <td scope="row">{goalStatic.player_id}</td>
                                    <td>{goalStatic.game_id}</td>
                                    <td>{goalStatic.goal}</td>


                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>Data not found</td>
                            </tr>
                        )}

                        </tbody>
                    </table>
                </div>
                {/*table end*/}
            </div>
            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"
            >


                {/*table start*/}

                <div className="">
                    <h3>Players Talbe</h3>
                    <hr/>

                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Game Id</th>
                            <th scope="col">Sport Name</th>
                            <th scope="col">Team Id</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Location</th>

                        </tr>
                        </thead>
                        <tbody>
                        {game.length > 0 ? (
                            game.map((games) => (
                                <tr key={games.game_id}>
                                    <td scope="row">{games.game_id}</td>
                                    <td>{games.sport_name}</td>
                                    <td>{games.team_id}</td>
                                    <td>{games.date}</td>
                                    <td>{games.time}</td>
                                    <td>{games.location}</td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>Data not found</td>
                            </tr>
                        )}

                        </tbody>
                    </table>
                </div>
                {/*table end*/}











            </div>

        </div>

























        {/*<h3>Players</h3>*/}
        {/*  <table className="table">*/}
        {/*      <thead>*/}
        {/*      <tr>*/}
        {/*         <th scope="col">Game ID</th>*/}
        {/*          <th scope="col">Player Id</th>*/}
        {/*          <th scope="col">Goal</th>*/}
        {/*      </tr>*/}
        {/*      </thead>*/}
        {/*      <tbody>*/}

        {/*      {goal.length > 0 ? (*/}
        {/*          goal.map((goalStatic)=>(*/}
        {/*              <tr key={goalStatic.player_id}>*/}
        {/*                  <td scope="row">{goalStatic.player_id}</td>*/}
        {/*                  <td>{goalStatic.game_id}</td>*/}
        {/*                  <td>{goalStatic.goal}</td>*/}

        {/*              </tr>*/}
        {/*          ))*/}
        {/*      ) : (*/}
        {/*          <tr>*/}
        {/*              <td colSpan={5}>Data not found</td>*/}
        {/*          </tr>*/}
        {/*      ) }*/}

        {/*      </tbody>*/}
        {/*  </table>*/}

    </>
  );
}

export default Players;
