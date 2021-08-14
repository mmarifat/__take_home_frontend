import * as TYPES from '../types'
import {UserInterface} from "../../lib/interfaces/user.interface";
import {StoreActionInterface} from "../../lib/interfaces/store-action.interface";

const userReducer = (state: UserInterface = {}, action: StoreActionInterface) => {
    switch (action.type) {
        case TYPES.SET_USER_DATA:
            return {...action.payload};
        default:
            return {...state}
    }
}

export default userReducer;
