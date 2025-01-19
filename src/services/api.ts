import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api.github.com/',
    headers: {
        Accept: 'application/vnd.github.v3+json',
    },
});

export const fetchRepo = async (page: number) => {
    try {
        const response = await api.get(`search/repositories`, {
            params: { q: 'java', sort: 'watchers', order: 'desc', page },
        });
        if (response.data && Array.isArray(response.data.items)) {
            return response.data.items;
        } else {
            console.error('Incorrect API response:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
};
