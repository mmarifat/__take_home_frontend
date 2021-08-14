import Image from 'next/image'
import styles from '../../styles/Dashboard.module.css'
import {NasaDataInterface} from "../../lib/interfaces/nasa-data.interface";
import useSWR from "swr";
import {connect} from "react-redux";
import {Fragment, useEffect, useRef} from "react";
import DashboardCommon from "../../components/dashboard/dashboard-common";
import {nasaDataAction} from "../../redux/actions/nasa-data.action";
import {withAuthentication} from "../../components/authentication/with-authentication";

const linkPath: string = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY`

const fetcher = (resource, init) => fetch(resource, init).then(res => res.json())

function Dashboard(props) {

    const {nasaData, setNasaData} = props

    // using useSWR hook to data fetching and also detect changes
    const {data, error} = useSWR(nasaData.length < 1 ? linkPath : null, fetcher)

    const retrievedData = useRef(nasaData);

    // storing the values inside redux store
    useEffect(() => {
        const errorHandledData = (!data || data.error) ? [] : data.photos as NasaDataInterface[];
        setNasaData(errorHandledData)

        retrievedData.current = errorHandledData
    }, [data, retrievedData, setNasaData])

    if (error) {
        return (
            <Fragment>
                <DashboardCommon/>

                <h2 className={styles.title}> ............... Data Fetching Error ...........</h2>
            </Fragment>)
    }

    if (!data && retrievedData.current.length < 1) {
        return (
            <Fragment>
                <DashboardCommon/>

                <h2 className={styles.title}> ............... Data Fetching ...........</h2>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <DashboardCommon/>

            <main>
                <div className={styles.row}>

                    {
                        retrievedData.current && retrievedData.current.map((nasa: NasaDataInterface, _) => {
                            return (
                                <div className={styles.column} key={_}>
                                    <Image
                                        src={nasa.img_src}
                                        alt={nasa.camera.full_name}
                                        width={200}
                                        height={200}/>
                                    <p> Earth Date: {nasa.earth_date}</p>
                                </div>
                            )
                        })
                    }

                </div>
            </main>
        </Fragment>
    )
}

const bindStateToProps = (state) => ({
    nasaData: state.nasaData as NasaDataInterface[]
})

const bindDispatchToProps = {
    setNasaData: nasaDataAction
}

export default connect(bindStateToProps, bindDispatchToProps)(withAuthentication(Dashboard));
