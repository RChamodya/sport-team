import React, {useEffect} from 'react'
import * as Yup from 'yup';
import axiosclass from "../../../Config/axiosclass";
import {ErrorMessage, Field, Form, Formik} from "formik";
import "../../../Styles/saveMAnagers.scss"

interface Manager{
   // manager_id:number;
    manager_name:String;
    email:String;
    password:String;
    team_id:number;
}

interface SManagers{

    onSubmit:(values:Manager) => void;
    onCancel: () => void;
}



const SaveManager :React.FC<SManagers> = ({
                                          onSubmit,
                                          onCancel,


                                      }) => {



    const validations = Yup.object({

        manager_name:Yup.string().required("Required"),
        email:Yup.string().required("Required"),
        password:Yup.string().required("Required"),
        team_id:Yup.string().required("Required")
    })

    const update = async (values: Manager) => {
        try{
            const putData = await axiosclass.post(
                `/Manager/save`,
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
                initialValues={{
                    manager_name:"",
                    email:"",
                    password:"",
                    team_id:0
                }}
                onSubmit={update}
                validationSchema={validations}
            >
                {(formik) => (


                    <div className="card">
                        <div className="card-header">
                            Save Manager
                        </div>
                        <div className="card-body">
                            <div className="main">
                            <blockquote className="blockquote mb-0">
                                <Form className="Manager_form">
                                    <div className="container">
                                        <label htmlFor="manager_name">Name: </label>
                                        <Field
                                            type="text"
                                            id="manager_name"
                                            name="manager_name"
                                            className="manager_name"
                                        />
                                        <ErrorMessage
                                            name="manager_name"
                                            component="div"
                                            className="text-danger"
                                        />

                                    </div>

                                    <div className="container">
                                        <label htmlFor="email">Email:</label>
                                        <Field
                                            type="text"
                                            id="email"
                                            name="email"
                                            className="email"
                                        />
                                        <ErrorMessage
                                            name="email"
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

                            </blockquote>

                        </div>
                        </div>
                    </div>

















                )
                }

            </Formik>
        </div>


    )



}

export default SaveManager;

