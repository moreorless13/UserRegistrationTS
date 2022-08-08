import React from 'react';
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { VERIFY_USER } from "../utils/queries";
import Auth from '../utils/auth';


const ConfirmationSuccess = () => {
    const { userId }: any = useParams();
    useQuery(VERIFY_USER, { variables: { userId } });

    Auth.logout();
    window.location.assign('/login') 
    return (
        <div>
            <h1>Email Successfully Verified!</h1>
        </div>
    )


}

export default ConfirmationSuccess;