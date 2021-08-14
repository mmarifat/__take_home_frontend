import {useState} from "react";
import {useMutation} from "@apollo/client";
import Link from 'next/link'
import SIGN_UP_QUERY from "../../lib/queries/signup.query";
import {JsonParseHelper} from "../../lib/helper/common.helper";
import styles from '../../styles/SignUp.module.css'
import {useForm} from "react-hook-form";
import Head from "next/head";
import {withOutAuthentication} from "../../components/authentication/without-authentication";

type SignUpData = {
    email: string;
    password: string
};

function SignUp() {
    const [signUpError, setSignUpError] = useState('');

    const {register, formState: {errors}, handleSubmit} = useForm<SignUpData>();

    const onSubmit = data => {
        const {email, password} = data
        signup({variables: {email, password}});
    };

    let [signup] = useMutation(SIGN_UP_QUERY, {
        fetchPolicy: "network-only",
        onCompleted: data => {
            alert(`Sign Up Success as ${data.signup.email}. You may login now`)
        },
        onError: error => {
            const parsedError = JsonParseHelper(error)
            alert(parsedError.message)
            setSignUpError(parsedError.message)
        },
    });

    return (
        <div className={styles.signUpContainer}>
            <Head>
                <title>Nasa Sign Up</title>
                <meta name="description" content="This is nasa sign up panel"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Sign Up Page</p>

                <div className={styles.inputSpace}>
                    <input
                        type="text"
                        {...register("email", {
                            required: true,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        })}
                        aria-label="Email"
                    />
                    {errors.email && <p style={{color: 'red'}}> Valid Email is Required </p>}
                </div>

                <div className={styles.inputSpace}>
                    <input
                        type="password"
                        {...register("password", {
                            required: true
                        })}
                        aria-label="Password"
                    />
                    {errors.password && <p style={{color: 'red'}}> Password is Required </p>}
                </div>

                <div className={styles.inputSpace}>
                    <button type="submit">Sign Up</button>
                </div>

                {signUpError && <p style={{color: 'red'}}>{signUpError}</p>}

                <div className={styles.signIn}> Already registered?
                    <span className={styles.signInHere}>
                    <Link href="/"> Sign In Here </Link>
                </span>
                </div>
            </form>
        </div>
    );
}


export default withOutAuthentication(SignUp);
