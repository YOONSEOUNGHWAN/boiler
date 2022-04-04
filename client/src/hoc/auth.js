import Axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../_actions/user_action'


export default function (SpecificComponent, option, adminRoute = null) {
    // option
    // null => 아무나 출입가능
    // true => 로그인한 유저만
    // false => 로그인한 유저는 출입불가능
    function AuthenticationCheck(props) {
        const navigate = useNavigate();
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)
                //로그인 안 한 상태
                if(!response.payload.isAuth){
                    if(option){
                        navigate('/login')
                    }
                }else{
                    //로그인
                    if(adminRoute && !response.payload.isAdmin){
                        navigate('/')
                    }else{
                        if(option === false){
                            navigate('/')
                        }
                    }
                }
            })
        }, [])

        return(
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}