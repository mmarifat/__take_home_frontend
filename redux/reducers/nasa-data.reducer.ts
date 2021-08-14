import * as TYPES from '../types'
import {StoreActionInterface} from "../../lib/interfaces/store-action.interface";
import {NasaDataInterface} from "../../lib/interfaces/nasa-data.interface";

const nasaDataReducer = (state: NasaDataInterface[] = [], action: StoreActionInterface) => {
    switch (action.type) {
        case TYPES.SET_NASA_DATA:
            return [...action.payload];
        default:
            return [...state]
    }
}

export default nasaDataReducer;
