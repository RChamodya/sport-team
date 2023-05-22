import React, {useEffect, useLayoutEffect, useState} from "react";
import axiosclass from "../../Config/axiosclass";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;
import "../../Styles/TeamManager.scss";
import userEvent from "@testing-library/user-event";
import UpdatePlayers from "../../CRUD/Manager/Update/updatePlayers";
import {date} from "yup";
import UpdateGames from "../../CRUD/Manager/Update/updateSports";
import SavePlayers from "../../CRUD/Manager/Save/savePlayers";
import SaveSports from "../../CRUD/Manager/Save/saveSports";

interface studentDetails {
    player_id: number;
    player_name: String;
    position: String;
    team_id: number;
    team_manager_id: number;
    password:String;
}

interface gameDetails {
    game_id: number;
    sport_name: String;
    team_id: number;
    date: String;
    time: String;
    location: String;
}
interface Manager {
    manager_id:String;
    manager_name:String;
    email:String;
    password:String;
    team_id:number;

}

interface id {
    team_manager_id: number;
}

const TeamManager: React.FC = () => {


    const [managerData,setManagerData] = useState({});
    const [selectedPlayer,setSelectedPlayer] = useState<studentDetails | null>( null)
    const[showUpdateForm, setShowUpdateForm] = useState(false)
    const [student, setStudent] = useState<Array<studentDetails>>([])

    const [game, setGame] = useState<Array<gameDetails>>([])
    const [selectedGame, setSelectedGame] = useState<gameDetails | null>(null)
    const [showUpdateFormGames, setShowUpdateFormGames] = useState(false)

//post method (player)
    const [showPostformPlayer, setShowPostFormPlayer] = useState(false)
    const [id,setId]= useState<number>(0)

// post method (sport)
    const [showPostFormSport, setShowPostSport] = useState(false)




    useEffect(() => {
        userId()
    },[showUpdateForm]);


    useEffect(() => {
        userId()
    },[student]);

    useEffect(() => {
        userId()
    },[showPostformPlayer])

    useEffect(()=>{
        userId()
    },[showPostFormSport])

    useEffect(() => {
        axiosclass.get("/game")

            .then((res) => setGame(res.data))
            .catch((err) => console.log(err))
    }, [showUpdateFormGames])


    const handleAddButtonClick = () =>{
        student.map((data) => {
            setId(data.team_manager_id)
        });
        setShowPostFormPlayer(true);
    }

    // sport
const handleAddButtonClickGame = () => {
        setShowPostSport(true);
}

    const cancelAddFormPlayer = () =>{
        setShowPostFormPlayer(false)
    }

    const cancelAddFormSport = () =>{
        setShowPostSport(false)
    }




    //delete button (player)
    const handleDeleteButton = (data: studentDetails) => {
        axiosclass.delete(`/player/delete/${data.player_id}`)
            .then(res => {
                const NewList = student.filter((student) => student.player_id !== data.player_id);
                setStudent(NewList);
                alert("deleted!")
            }).catch(error => {
                console.log(error);
        })

    }



    //delete button (sports)

    const handleDeleteButtonGame = (data: gameDetails) => {
        axiosclass.delete(`/game/delete/${data.game_id}`)
            .then(res => {
                const NewList1 = game.filter((game) => game.game_id !== data.game_id);
                setGame(NewList1);
                alert("game deleted successfully")
            }).catch(error => {
            console.log(error);
        })

    }



    const userId = async () => {
        let id = localStorage.getItem("User");
        // console.log(id);
        if (id === null){
            //console.log("ok")
        }else{
            const data:Manager = JSON.parse(id);
            setManagerData(data);

            // console.log(data.manager_id)
            // console.log(managerData);
            axiosclass.get(`/player/managerNPlayers/${data.manager_id}`)
                //.then((res)=>console.log(res.data))
                .then((res) => {
                    setStudent(res.data)
                    student.map((data) => {
                        setId(data.team_manager_id)
                    });
                    // console.log(res,data)
                    // localStorage.clear()
                })
                .catch((err) => console.log(err))

        }
    }






//players edit button
    const handleUpdateButtonClick = (data:studentDetails) => {
        setShowUpdateFormGames(false);
        setSelectedPlayer(data);
        setShowUpdateForm(true);
    }
    const handleUpdateFormSubmit = () => {
        setShowUpdateForm(false);
        setSelectedPlayer(null);
        userId();

    }
// sports edit button
    const handleUpdateButtonClickGames = (data:gameDetails) => {
        setShowUpdateForm(false);
        setSelectedGame(data);
        setShowUpdateFormGames(true);
    }

    const hadleUpdateGameFormSubmit = ()=>{
        setShowUpdateFormGames(false);
            setSelectedGame(null);
            userId();
    }




    return (
        <>


            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">

                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-home"
                            type="button" role="tab" aria-controls="pills-home" aria-selected="true">Players
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-profile"
                            type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Sports
                    </button>
                </li>

            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                     aria-labelledby="pills-home-tab"
                >
                    {/*table start*/}

                    <div className="">
                        <h3>Players</h3>




                        <button
                            onClick={handleAddButtonClick}
                            className="btn btn-outline-primary">Add</button>
                        <hr/>


                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Player Id</th>
                                <th scope="col">Player Name</th>
                                <th scope="col">Team Id</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>

                            </tr>
                            </thead>
                            <tbody>
                            {student.length > 0 ? (
                                student.map((player) => (
                                    <tr key={player.player_id}>
                                        <td scope="row">{player.player_id}</td>
                                        <td>{player.player_name}</td>
                                        <td>{player.team_id}</td>
                                        <td><button
                                            className="btn btn-outline-warning"
                                            onClick={() => handleUpdateButtonClick(player)}
                                        >edit</button></td>
                                        <td><button
                                            onClick={() => handleDeleteButton(player)}
                                            className="btn btn-outline-danger">delete</button></td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>Data not found</td>
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
                        <h3>Sports</h3>
                        <button

                            onClick={handleAddButtonClickGame}
                            className="btn btn-outline-primary">Add</button>
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
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {game.length > 0 ? (
                                game.map((game) => (
                                    <tr key={game.game_id}>
                                        <td scope="row">{game.game_id}</td>
                                        <td>{game.sport_name}</td>
                                        <td>{game.team_id}</td>
                                        <td>{game.date}</td>
                                        <td>{game.time}</td>
                                        <td>{game.location}</td>
                                        <td><button
                                            className="btn btn-outline-warning"
                                            onClick={()=>handleUpdateButtonClickGames(game)}
                                        >edit</button></td>
                                        <td><button
                                            onClick={() => handleDeleteButtonGame(game)}
                                            className="btn btn-outline-danger">delete</button></td>

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


            {/*table start*/}

            {/*<div className="container m-4">*/}
            {/*  <h3>TeamManager</h3>*/}

            {/*  <table className="table">*/}
            {/*    <thead>*/}
            {/*      <tr>*/}
            {/*        <th scope="col">Player Id</th>*/}
            {/*        <th scope="col">Name</th>*/}
            {/*        <th scope="col">Position</th>*/}
            {/*        <th scope="col">Team Id</th>*/}
            {/*        <th scope="col">Team Manager Id</th>*/}
            {/*      </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {student.length > 0 ? (*/}
            {/*        student.map((player)=>(*/}
            {/*            <tr key={player.player_id}>*/}
            {/*              <td scope="row">{player.player_id}</td>*/}
            {/*              <td>{player.player_name}</td>*/}
            {/*              <td>{player.position}</td>*/}
            {/*              <td>{player.team_id}</td>*/}
            {/*              <td>{player.team_manager_id}</td>*/}
            {/*            </tr>*/}
            {/*        ))*/}
            {/*    ) : (*/}
            {/*        <tr>*/}
            {/*          <td colSpan={5}>Data not found</td>*/}
            {/*        </tr>*/}
            {/*    ) }*/}

            {/*    </tbody>*/}
            {/*  </table>*/}
            {/*</div>*/}
            {/*table end*/}
            {showUpdateForm && selectedPlayer && (
                <UpdatePlayers
                 initialValues={selectedPlayer}
                 onCancel={handleUpdateFormSubmit}
                 onSubmit={handleUpdateFormSubmit}
                />
            )}
            {showUpdateFormGames && selectedGame && (
                <UpdateGames
                    initialValues={selectedGame}
                    onCancel={hadleUpdateGameFormSubmit}
                    onSubmit={hadleUpdateGameFormSubmit}/>
            )}

            {
                showPostformPlayer && (
                    <SavePlayers
                        initialValues={id}
                        onSubmit={cancelAddFormPlayer}
                        onCancel={cancelAddFormPlayer}/>
                )
            }

            {
                showPostFormSport && (
                <SaveSports
                    onSubmit={cancelAddFormSport}
                    onCancel={cancelAddFormSport}/>
                )
            }









        </>
    );
}

export default TeamManager;
