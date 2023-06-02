import { axios } from '@/configuration/axios';

export const fetchDocument = async (url: string) => {
    const res = await axios.get(url);
    return res.data;
};

export const createRevision = async (pageId: string, newContent: string) => {
    await axios.post(`/page/${pageId}`, { page: newContent });
};
