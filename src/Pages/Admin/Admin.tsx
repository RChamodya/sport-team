import React, {useEffect, useState} from "react";
import axiosclass from "../../Config/axiosclass";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import UpdateManagers from "../../CRUD/Admin/update/updateManagers";
import UpdatePlayers from "../../CRUD/Admin/update/updatePlayers";
import players from "../Players/Players";
import SaveManager from "../../CRUD/Admin/Save/saveManagers";
import SavePlayer from "../../CRUD/Admin/Save/savePlayers";


interface Manager{
    manager_id:number;
    manager_name:String;
    email:String;
    password:String;
    team_id:number;
}

interface  Players{
    player_id: number;
    player_name:String;
    position:String;
    team_id:number;
    team_manager_id:number;
}



const Admin: React.FC = () => {


    const [managerData, setManagerData] = useState<Array<Manager>>([])
    const [playerData, setPlayerData]=useState<Array<Players>>([])

    const [selectedManager, setSelectedManager] = useState<Manager | null>(null)
    const [showUpdateFormManager, setShowUpdateFormManager] = useState(false)

    const [selectPlayer, setSelectPlayer] =useState<Players | null>(null)
    const [showUpdatePlayer, setShowUpdatePlayer] = useState(false)


    const [showPostFormManager, setShowPostManager] = useState(false)
    const [showPostForPlayer, setShowPostPlayer] = useState(false)

// Manager data
      useEffect(()=>{

          axiosclass.get("/Manager")
             // .then((res)=>console.log(res.data))
              .then((res)=>setManagerData(res.data))
              .catch((err)=>console.log(err))

      },[managerData])

//Team Data
    useEffect(()=>{
        axiosclass.get("/player")
            .then((res)=>setPlayerData(res.data))
            .catch((err)=>console.log(err))
    },[playerData])




// update Managers
    const handleUpdateButtonClickManager = (data:Manager) =>{
          setSelectedManager(data);
          setShowUpdateFormManager(true);
    }
    const handleUpdateFormSubmitManager = ()=>{
       setShowUpdateFormManager(false);
       setSelectedManager(null);


    }


// update Players


    const handleUpdateButtonPlayer = (data:Players) =>{
            setSelectPlayer(data);
            setShowUpdatePlayer(true);

    }

    const handleUpdateformSubmitPlayer = () =>{
        setSelectPlayer(null);
        setShowUpdatePlayer(false);
    }



    // save manager
    // const handleAddButtonClickGame = () => {
    //     setShowPostManager(true);
    // }

    const cancelAddFormManager = () =>{
        setShowPostManager(false)
    }

    const handleAddButtonClickManager = () => {
        setShowPostManager(true);
    }

    // save Player
    const cancelAddFormPlayer = () =>{
        setShowPostPlayer(false)
    }

    const handleAddButtonClickPlayer = () => {
        setShowPostPlayer(true);
    }


    //delete manager

    const handleDeleteButtonManager = (data: Manager) => {
        axiosclass.delete(`/Manager/delete/${data.manager_id}`)
            .then(res => {
                const NewList2 = managerData.filter((manager) => manager.manager_id !== data.manager_id);
                setManagerData(NewList2);
                alert("deleted!")
            }).catch(error => {
            console.log(error);
        })

    }

    //delete players
    const handleDeleteButtonPlayers = (data: Players) => {
        axiosclass.delete(`/player/delete/${data.player_id}`)
            .then(res => {
                const NewList3 = playerData.filter((player) => player.player_id !== data.player_id);
               setPlayerData(NewList3);
                alert("deleted!")
            }).catch(error => {
            console.log(error);
        })

    }


    return(
<>


    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button" role="tab" aria-controls="pills-home" aria-selected="true">Managers
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
                <h3>Manager Table</h3>
                <button
                    onClick={handleAddButtonClickManager}
                    className="btn btn-outline-primary">Add</button>
                <hr/>

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Manager Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Manager Id</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>

                    </tr>
                    </thead>
                    <tbody>
                    {managerData.length > 0 ? (
                        managerData.map((manager) => (
                            <tr key={manager.manager_id}>
                                <td scope="row">{manager.manager_name}</td>
                                <td>{manager.email}</td>
                                <td>{manager.team_id}</td>
                                <td><button
                                    onClick={()=>{handleUpdateButtonClickManager(manager)}}
                                    className="btn btn-outline-warning">edit</button></td>

                                <td><button
                                    onClick={() => handleDeleteButtonManager(manager)}
                                    className="btn btn-outline-danger">Delete</button></td>

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
                <h3>Players Talbe</h3>
                <button
                    onClick={handleAddButtonClickPlayer}
                    className="btn btn-outline-primary">Add</button>
                <hr/>

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Player Id</th>
                        <th scope="col">Player Name</th>
                        <th scope="col">Position</th>
                        <th scope="col">Team Id</th>
                        <th scope="col">Team Manager Id</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {playerData.length > 0 ? (
                        playerData.map((players) => (
                            <tr key={players.player_id}>
                                <td scope="row">{players.player_id}</td>
                                <td>{players.player_name}</td>
                                <td>{players.position}</td>
                                <td>{players.team_id}</td>
                                <td>{players.team_manager_id}</td>
                                <td><button
                                    onClick={()=>{handleUpdateButtonPlayer(players)}}
                                   // onClick={()=>{handleUpdateButtonPlayer(players)}
                                    className="btn btn-outline-warning">edit</button></td>
                                <td><button
                                    onClick={() => handleDeleteButtonPlayers(players)}
                                    className="btn btn-outline-danger">Delete</button></td>
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

    </div>



    {/*<div className="container m-4">*/}
    {/*    <h3>Players</h3>*/}
    {/*    <table className="table">*/}
    {/*        <thead>*/}
    {/*        <tr>*/}
    {/*            <th scope="col">Game ID</th>*/}
    {/*            <th scope="col">Player Id</th>*/}
    {/*            <th scope="col">Goal</th>*/}
    {/*        </tr>*/}
    {/*        </thead>*/}
    {/*        <tbody>*/}

    {/*        {managerData.length > 0 ? (*/}
    {/*            managerData.map((manager)=>(*/}
    {/*                <tr key={manager.manager_id}>*/}
    {/*                    <td scope="row">{manager.manager_id}</td>*/}
    {/*                    <td>{manager.manager_name}</td>*/}
    {/*                    <td>{manager.email}</td>*/}
    {/*                    <td>{manager.team_id}</td>*/}
    {/*                    <td>Edit icon</td>*/}
    {/*                    <td>Delete</td>*/}

    {/*                </tr>*/}
    {/*            ))*/}
    {/*        ) : (*/}
    {/*            <tr>*/}
    {/*                <td colSpan={5}>Data not found</td>*/}
    {/*            </tr>*/}
    {/*        ) }*/}

    {/*        </tbody>*/}
    {/*    </table>*/}
    {/*</div>*/}

    {showUpdateFormManager && selectedManager && (
        <UpdateManagers
            initialValues={selectedManager}
            onSubmit={handleUpdateFormSubmitManager}
            onCancel={handleUpdateFormSubmitManager}/>
    )}

    {
        showUpdatePlayer && selectPlayer && (
            <UpdatePlayers
                initialValues={selectPlayer}
                onSubmit={handleUpdateformSubmitPlayer}
                onCancel={handleUpdateformSubmitPlayer}/>
        )
    }

    {
        showPostFormManager && (
            <SaveManager
                onSubmit={cancelAddFormManager}
                onCancel={cancelAddFormManager}/>
        )
    }

    {
        showPostForPlayer && (
            <SavePlayer
                onSubmit={cancelAddFormPlayer}
                onCancel={cancelAddFormPlayer}/>
        )
    }


</>
  );
}

export default Admin;
