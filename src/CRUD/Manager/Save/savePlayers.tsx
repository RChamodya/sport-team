import React, {useEffect} from 'react'
import * as Yup from 'yup';
import axiosclass from "../../../Config/axiosclass";
import {ErrorMessage, Field, Form, Formik} from "formik";
import "../../../Styles/savePlayers.scss"

interface studentDetails {
   // player_id: number;
    player_name: String;
    position: String;
    team_id: number;
    team_manager_id: number;
    password:String;
}

interface id {
    team_manager_id: number;
}


interface SPlayer{
    initialValues:number
    onSubmit:(values:studentDetails) => void;
    onCancel: () => void;
}



const SavePlayers :React.FC<SPlayer> = ({

                                              onSubmit,
                                              onCancel,
    initialValues

                                          }) => {


    const validations = Yup.object({
        player_name:Yup.string().required("Required"),
        team_id:Yup.string().required("Required"),
        position:Yup.string().required("Required"),
        password:Yup.string().required("Required")
    })

    const update = async (values: studentDetails) => {
        try{
            console.log(values)
            const postData = await axiosclass.post(
                `/player/save`,
                values
            );
            console.log(postData);
            onSubmit(values);
        } catch (error){
            console.log(error)
        }
    }

    const hadndleCanel = () => {
        onCancel();
    }

    return(
        <div className="container ">
            <Formik
                initialValues={{
                   player_id: 0,
                    player_name: "",
                    position: "",
                    team_id: 0,
                    team_manager_id:initialValues ,
                    password:""
                }}
                onSubmit={update}
                validationSchema={validations}
            >
                {(formik) => (

                    <div className="main">


                        <div className="card">
                            <div className="card-header">
                                Quote
                            </div>
                            <div className="main">
                            <div className="card-body">

                                <blockquote className="blockquote mb-0">
                                    <Form className="player_id">
                                        <div className="container">
                                            <label htmlFor="player_name">Name: </label>
                                            <Field
                                                type="text"
                                                id="player_name"
                                                name="player_name"
                                                className="player_name"
                                            />
                                            <ErrorMessage
                                                name="player_name"
                                                component="div"
                                                className="text-danger"
                                            />

                                        </div>

                                        <div className="container">
                                            <label htmlFor="team_id">Team Id:</label>
                                            <Field
                                                type="text"
                                                id="team_id"
                                                name="team_id"
                                                className="team_id"
                                            />
                                            <ErrorMessage
                                                name="team_id"
                                                component="div"
                                                className="text-danger"
                                            />

                                        </div>

                                        <div className="container">
                                            <label htmlFor="position">Position:</label>
                                            <Field
                                                type="text"
                                                id="position"
                                                name="position"
                                                className="position"
                                            />
                                            <ErrorMessage
                                                name="position"
                                                component="div"
                                                className="text-danger"
                                            />

                                        </div>

                                        <div className="container">
                                            <label htmlFor="password">Password:</label>
                                            <Field
                                                type="text"
                                                id="password"
                                                name="password"
                                                className="password"
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-danger"
                                            />

                                        </div>

                                        <div className="submitButton">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-sm"
                                                disabled={!formik.isValid}
                                            >Save
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={hadndleCanel}
                                        >Cancel
                                        </button>

                                    </Form>
                                    {/*<footer className="blockquote-footer">*/}
                                    {/*    <table>*/}

                                    {/*    <tr><td><button  type="button" className="btn btn-primary btn-sm" disabled={!formik.isValid}>Save</button>*/}
                                    {/*    </td><td><button type="button"  className="btn btn-primary btn-sm" onClick={hadndleCanel} >Cancel</button></td></tr>*/}
                                    {/*</table></footer>*/}
                                </blockquote>

                            </div>
                            </div>
                        </div>












                    </div>

                )
                }

            </Formik>
        </div>
    )



}

export default SavePlayers;

