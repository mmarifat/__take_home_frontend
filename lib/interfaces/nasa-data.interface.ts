export interface NasaDataInterface {
	id: number
	sol: number
	img_src: string
	earth_date: Date | string
	camera: NasaDataCameraInterface
	rover: NasaDataRoverInterface
}

export interface NasaDataCameraInterface {
	id: number
	name: string
	rover_id: number
	full_name: string
}

export interface NasaDataRoverInterface {
	id: number
	name: string
	landing_date: Date | string
	launch_date: Date | string
	status: string
}
