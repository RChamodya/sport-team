import React from 'react'
import * as Yup from 'yup';
import axiosclass from "../../../Config/axiosclass";
import {ErrorMessage, Field, Form, Formik} from "formik";

interface studentDetails {
    player_id: number;
    player_name: String;
    position: String;
    team_id: number;
    team_manager_id: number;
    password:String;
}


interface UPlayer{
    initialValues: studentDetails;
    onSubmit:(values:studentDetails) => void;
    onCancel: () => void;
}



const UpdatePlayers :React.FC<UPlayer> = ({
    initialValues,
    onSubmit,
    onCancel

}) => {


    const validations = Yup.object({
        player_name:Yup.string().required("Required"),
        team_id:Yup.string().required("Required"),
    })

    const update = async (values: studentDetails) => {
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
                    <Form className="player_form">
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
                            <label htmlFor="team_id">Id:</label>
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

