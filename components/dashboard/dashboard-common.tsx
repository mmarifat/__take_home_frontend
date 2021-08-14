import Head from "next/head";
import styles from "../../styles/Dashboard.module.css";
import {connect} from "react-redux";

function DashboardCommon({loggedUser}) {
    return (
        <div>
            <Head>
                <title>Nasa Dashboard</title>
                <meta name="description" content="This is nasa demo dashboard"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <h1 className={styles.title}>
                Welcome {loggedUser.email}
            </h1>

        </div>
    )
}

const bindStateToProps = (state) => ({
    loggedUser: state.user,
})

export default connect(bindStateToProps)(DashboardCommon);
