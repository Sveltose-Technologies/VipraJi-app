import { axiosInstance } from './axios';

export interface YajmanApiPayload {
  name: string;
  email?: string;
  callingMobileNumber: string;
  whatsappMobileNumber?: string;
  birthday?: string;
  anniversary?: string;
  yearlyFixedProgramDate?: string;
  city?: string;
  state?: string;
  address?: string;
  categoryId?: string; // Send category name string for now
  date?: string; // kycDate
  remark?: string;
}

export const yajmanApi = {
  create: async (data: YajmanApiPayload) => {
    const response = await axiosInstance.post('/yajman-entry/create', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<YajmanApiPayload>) => {
    const response = await axiosInstance.put(`/yajman-entry/update/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/yajman-entry/delete/${id}`);
    return response.data;
  },
  
  getById: async (id: string) => {
    // Fallback standard GET by ID route if specific one isn't provided
    const response = await axiosInstance.get(`/yajman-entry/${id}`);
    return response.data;
  },
  
  getAll: async () => {
    // Assumed endpoint based on standard patterns
    const response = await axiosInstance.get('/yajman-entry/getall');
    return response.data;
  }
};
