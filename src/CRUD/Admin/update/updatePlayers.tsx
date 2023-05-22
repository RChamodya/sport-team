import React from 'react'
import * as Yup from 'yup';
import axiosclass from "../../../Config/axiosclass";
import {ErrorMessage, Field, Form, Formik} from "formik";

interface  Players{
    player_id: number;
    player_name:String;
    position:String;
    team_id:number;
    team_manager_id:number;
}

interface UPlayers{
    initialValues: Players;
    onSubmit:(values:Players) => void;
    onCancel: () => void;
}
const UpdatePlayers :React.FC<UPlayers> = ({
                                                initialValues,
                                                onSubmit,
                                                onCancel

                                            }) => {


    const validations = Yup.object({

        //manager_name:Yup.string().required("Required"),
        //player_id:Yup.string().required("Required"),
        player_name: Yup.string().required("Required"),
        position: Yup.string().required("Required"),
        team_id: Yup.string().required("Required"),
        team_manager_id: Yup.string().required("Required"),
       // password: Yup.string().required("Required")
    })

    const update = async (values: Players) => {
        try{
            const putData = await axiosclass.put(
                `/player/update`,
                values
            );
            console.log(putData);
            onSubmit(values);
        } catch (error){
            console.log(error)
        }
    }
    const hadndleCanel = () => {
        onCancel();
    }


    return(

        <div className="container">
            <Formik
                initialValues={initialValues}
                onSubmit={update}
                validationSchema={validations}
            >
                {(formik) => (
                    <div className="main">
                    <Form className="Player_form">
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
                            <label htmlFor="team_id">Team Id: </label>
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
                            <label htmlFor="team_manager_id">Team Manager Id:</label>
                            <Field
                                type="text"
                                id="team_manager_id"
                                name="team_manager_id"
                                className="pteam_manager_id"
                            />
                            <ErrorMessage
                                name="team_manager_id"
                                component="div"
                                className="text-danger"
                            />

                        </div>


                        <div className="submitButton">
                            <button
                                type="submit"
                                className="btn btn-primary btn-sm"
                                disabled={!formik.isValid}
                            >Update
                            </button>
                        </div>

                        <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={hadndleCanel}
                        >Cancel
                        </button>

                    </Form>
                    </div>
                )
                }

            </Formik>
        </div>


    )





}


export default UpdatePlayers;