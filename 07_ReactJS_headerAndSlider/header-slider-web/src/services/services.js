import api from "./api"


export const getFullAnimeDetails = async (id) => {
    try {
        const response = await api(`/anime/${id}/full`);
        return response;
    } catch (error) {
        return error
    }
}

export const getAllEpisodes = async (id) => {
    try {
        const response = await api(`/anime/${id}/episodes`)
        return response;
    } catch (error) {
        return error;

    }
}

export const getAllEpisodeImages = async (id) => {
    try {
        const response = await api(`/anime/${id}/videos`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getEpisodeSynopsisData = async (id, episodeId) => {
    try {
        const response = await api(`/anime/${id}/episodes/${episodeId}`);
        return response;
    } catch (error) {
        throw error;
    }
}