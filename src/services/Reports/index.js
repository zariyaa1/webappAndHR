import axios from "../axios";


export const getReportAPICALL = async () => {
    try {
        const url = 'content-service/apis/reports';
        const response = await axios.get(url, { responseType: 'blob' });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch report');
    }
};