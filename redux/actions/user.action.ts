import * as TYPES from '../types'
import {UserInterface} from "../../lib/interfaces/user.interface";
import {StoreActionInterface} from "../../lib/interfaces/store-action.interface";

export const userAction = (user: UserInterface): StoreActionInterface => ({
	type: TYPES.SET_USER_DATA,
	payload: user
})
