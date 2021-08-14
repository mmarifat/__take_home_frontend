import {useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {JsonParseHelper} from "../lib/helper/common.helper";
import {userAction} from "../redux/actions/user.action";
import {connect} from 'react-redux'
import SIGN_IN_QUERY from "../lib/queries/signin.query";
import jwt from 'jsonwebtoken'
import {UserInterface} from "../lib/interfaces/user.interface";
import {LocalStorageEnum} from "../lib/enum/local-storage.enum";
import Link from 'next/link'
import styles from '../styles/SignIn.module.css'
import Router from "next/router";
import {useForm} from "react-hook-form";
import Head from "next/head";
import {withOutAuthentication} from "../components/authentication/without-authentication";


type SignInData = {
    email: string;
    password: string
};

function SignIn({setLoggedUser}) {

    const [loginError, setLoginError] = useState('');

    const {register, handleSubmit} = useForm<SignInData>();

    const onSubmit = data => {
        const {email, password} = data
        signin({variables: {email, password, isRemembered: 1}});
    };

    let [signin] = useLazyQuery(SIGN_IN_QUERY, {
        fetchPolicy: "network-only",
        onCompleted: data => {
            const jwtDecodedData = jwt.decode(data.signin.accessToken)

            const userToRedux: UserInterface = {
                email: jwtDecodedData['email']
            }

            // dispatch user to redux
            setLoggedUser(userToRedux);

            // set accessToken into session storage
            if (typeof window !== "undefined") {
                localStorage.setItem(LocalStorageEnum.LOGGED, data.signin.accessToken)
            }
            // redirecting to dashboard
            Router.push('/dashboard');
        },
        onError: error => {
            const parsedError = JsonParseHelper(error)
            setLoginError(parsedError.message)
        },
    });

    return (
        <div className={styles.loginContainer}>
            <Head>
                <title>Nasa Sign In</title>
                <meta name="description" content="This is nasa login panel"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>


            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Sign In Page</p>

                <div className={styles.inputSpace}>
                    <input
                        type="text"
                        {...register("email")}
                        aria-label="Email"
                    />
                </div>

                <div className={styles.inputSpace}>
                    <input
                        type="password"
                        {...register("password")}
                        aria-label="Password"
                    />
                </div>

                <div className={styles.inputSpace}>
                    <button type="submit">Login</button>
                </div>

                {loginError && <p style={{color: 'red'}}>{loginError}</p>}

                <div className={styles.register}> Not registered yet ?
                    <span className={styles.registerHere}>
                    <Link href="/sign-up"> Sign Up Here </Link>
                </span>
                </div>
            </form>
        </div>
    );
}

const bindDispatchToProps = {
    setLoggedUser: userAction
}

export default connect(null, bindDispatchToProps)(withOutAuthentication(SignIn));
