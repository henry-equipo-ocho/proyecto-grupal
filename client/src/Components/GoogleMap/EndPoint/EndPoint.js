import axios from "axios";

const axiosMpap = axios.create({ withCredentials: false })

export const getPlacesData = async (type, sw, ne) => {
    const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
    try {
        const { data: { data } } = await axiosMpap.get(URL, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,

            },
            headers: {
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API,
            }
        });

        return data;

    } catch (error) {
        console.log(error)
    }

}
export const getWeatherData = async (lat, lng) => {
    try {
        if (lat && lng) {
            const { data } = await axiosMpap.get('https://community-open-weather-map.p.rapidapi.com/find', {
                params: { lat, lon: lng },
                headers: {
                    'x-rapidapi-key': process.env.REACT_APP_RAPID_API,
                    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                },
            });

            return data;
        }
    } catch (error) {
        console.log(error);
    }
};
