const BASE_URL = 'https://api.jikan.moe/v4';
const api = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`)
        // console.log("API respose :-->", response)
        if (!response.ok) {
            throw new Error(response.status.toString)
        }

        return await response.json();
    } catch (error) {
        console.error('Error while Fetching an API'.error)
    } finally {

    }
}
export default api;