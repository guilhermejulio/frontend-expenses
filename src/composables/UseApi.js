import { api } from "boot/axios";

export default function useApi() {
  const list = async (resource) => {
    try {
      const response = await api.get(resource);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const get = async (resource, params) => {
    try {
      const response = await api.get(resource, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getById = async (resource, id) => {
    try {
      const response = await api.get(`${resource}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const post = async (resource, data) => {
    try {
      const response = await api.post(resource, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const update = async (resource, id, data) => {
    try {
      const response = await api.put(`${resource}/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const remove = async (resource, id) => {
    try {
      const response = await api.delete(`${resource}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    list,
    get,
    getById,
    post,
    update,
    remove
  };
}
