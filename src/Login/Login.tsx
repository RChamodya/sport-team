import React, {JSX, useEffect, useState} from "react";
import "../Styles/Login.scss";

import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {Axios} from "axios";
import axiosclass from "../Config/axiosclass";
import {isDataView} from "util/types";


interface PlayerDetails {
    player_id: number;
    player_name: String;
    position: String;
    team_id: number;
    team_manager_id: number;
    password:String;
}

interface Manager {
    manager_id: String;
    manager_name: String;
    email: String;
    password: String;
    team_id: number;

}


function LoginApp() {

    const formik = useFormik({
        initialValues: {
            id: '',
        }, onSubmit: values => {
            //setEnteredId(values.id)
            console.log("onSubmit", values);
            handleSubmit();
        },
        validate: (values) => {
            const errors: any = {};
            if (!values.id) {
                errors.id = "please enter user id!";
            }
            return errors
        }
    })
    // const {
    //     register,
    //     handleSubmit,
    //     trigger,
    //     formState: {errors},
    // } = useForm<validate>();

    const code = formik.values.id.toString();


    const navigate = useNavigate();

    const [Player, setPlayer] = useState<Array<PlayerDetails>>([]);
    const [idData, setIdData] = useState<String>("");
    const [managerData, setManagerData] = useState<Manager | null>(null);



    console.log(idData);
    let user = {}
    let managerId= "";
    // useEffect(() => {
    //     managerId = idData.toString();
    // }, [idData]);

    useEffect(() => {
        axiosclass.get(`/Manager/${code}`)
            .then((res) => {
                setManagerData(res.data)
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }, [code])



    const ManagerLogin = () => {

        try{
            axiosclass.get(`/Manager/${code}`)
                // .then((res) => setPlayer(res.data))
                .then((res) => {
                    // localStorage.clear();
                    setManagerData(res.data)
                    user = res.data;
                    console.log(res.data);
                    localStorage.setItem("User", JSON.stringify(res.data))
                    setIdData(res.data.manager_id)

                    // setIdData(res.data)
                    console.log(user);

                })
                .catch((err) => console.log(err))
        }
        catch (e){
            console.log(e)
        }

    }
    // useEffect(() => {
    //     localStorage.setItem("User", JSON.stringify(user))
    //
    // },[user])


    const AdminLogin = async () => {
        axiosclass.get(`/admin/${code}`)
            // .then((res) => setPlayer(res.data))
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
    }





    function handleSubmit() {

        const isValid = managerData && managerData.manager_id == code;


        const selectElement = document.getElementById("select") as HTMLSelectElement;
        const selectedValue = selectElement.value;

        if (selectedValue == "admin") {
            AdminLogin()
            if (code == "1"){
                navigate("/admin")
            }else{
                alert("invalid Id!")
            }
            console.log(selectedValue);
            //navigate("/admin")


        }
        if (selectedValue == "teamManager") {
            ManagerLogin()
            console.log(selectedValue);
            console.log(managerId)
            console.log(code)
            if (isValid) {
                navigate("/teamManager")
            } else {
               // console.log("invalid")
                alert("invalid id!!")
            }
        }
        if (selectedValue == "player") {
            console.log(selectedValue);
            navigate("/player")
        }
        // if (idData){
        //     const {manager_id,manager_name,email,password,team_id} = idData;
        //     const user = {manager_id,manager_name,email,password,team_id}
        //     localStorage.setItem("userId",JSON.stringify(user))
        // }

    }


    return (
        <>
            <div className="container m-4">

                <div className="main">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="text">
                            <h4>Login Here</h4>
                        </div>
                        <div className="inputs">
                            <label>Select Position</label> <br/>
                            <select id="select">
                                <option id="admin" value="admin">Admin</option>
                                <option id="teamManager" value="teamManager">Team Manager</option>
                                {/*<option id="player" value="player">Player</option>*/}
                            </select> <br/>
                            <label>Enter ID</label><br/>

                            <input
                                type="text"
                                placeholder="Enter Id"
                                name="id"
                                value={formik.values.id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />
                            <div className="error">{formik.errors.id && formik.touched.id && formik.errors.id}</div>
                            <br/>

                            {/*<button type="submit" onClick={handleSubmit}>Submit</button>*/}
                            <button
                                type="submit" className="btn btn-primary">Login
                            </button>
                        </div>
                    </form>

                </div>


            </div>
        </>
    );

}

export default LoginApp;
