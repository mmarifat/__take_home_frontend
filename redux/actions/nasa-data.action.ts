import * as TYPES from '../types'
import {StoreActionInterface} from "../../lib/interfaces/store-action.interface";
import {NasaDataInterface} from "../../lib/interfaces/nasa-data.interface";

export const nasaDataAction = (nasaData: NasaDataInterface[]): StoreActionInterface => ({
    type: TYPES.SET_NASA_DATA,
    payload: nasaData
})
