import React, {useEffect} from 'react'
import * as Yup from 'yup';
import axiosclass from "../../../Config/axiosclass";
import {ErrorMessage, Field, Form, Formik} from "formik";


interface gameDetails {
    game_id: number;
    sport_name: String;
    team_id: number;
    date: String;
    time: String;
    location: String;
}

interface Ugames {
    initialValues: gameDetails;
    onSubmit: (values: gameDetails) => void;
    onCancel: () => void;

}


const UpdateGames: React.FC<Ugames> = ({
                                           initialValues,
                                           onSubmit,
                                           onCancel
                                       }) => {
    const validations = Yup.object({

        sport_name: Yup.string().required("Required"),
        team_id: Yup.string().required("Required"),
        date: Yup.string().required("Required"),
        location: Yup.string().required("Required")
    })
    // @ts-ignore
    const update = async (values: gameDetails) => {


        try {

            const putData = await axiosclass.put(
                "/game/update",
                values
            );
            console.log(putData)
            onSubmit(values);



        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{

    })

    const hadndleCancel = () => {
        onCancel();
    }

    return (
        <>
            <div className="container">

                <Formik
                    initialValues={initialValues}
                    onSubmit={update}
                    validationSchema={validations}>

                    {(formik) => (
                        <div className="main">
                        <Form className="game_form">

                            <div className="container">
                                <label htmlFor="sport_name">Sport Name: </label>
                                <Field
                                    type="text"
                                    id="sport_name"
                                    name="sport_name"
                                    className="sport_name"
                                />
                                <ErrorMessage
                                    name="sport_name"
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
                                <label htmlFor="date">Date: </label>
                                <Field
                                    type="text"
                                    id="date"
                                    name="date"
                                    className="date"
                                />
                                <ErrorMessage
                                    name="date"
                                    component="div"
                                    className="text-danger"
                                />

                            </div>

                            <div className="container">
                                <label htmlFor="time">Time: </label>
                                <Field
                                    type="text"
                                    id="time"
                                    name="time"
                                    className="time"
                                />
                                <ErrorMessage
                                    name="time"
                                    component="div"
                                    className="text-danger"
                                />

                            </div>

                            <div className="container">
                                <label htmlFor="location">Location: </label>
                                <Field
                                    type="text"
                                    id="location"
                                    name="location"
                                    className="location"
                                />
                                <ErrorMessage
                                    name="location"
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
                                onClick={hadndleCancel}
                            >Cancel
                            </button>

                        </Form>
                        </div>
                    )}


                </Formik>


            </div>


        </>
    )


}


export default UpdateGames;

