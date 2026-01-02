const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic API call handler
const apiCall = async (endpoint, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add JWT token if available
  const token = localStorage.getItem('adminToken');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Projects API
export const projectsAPI = {
  getAll: () => apiCall('/projects'),
  getById: (id) => apiCall(`/projects/${id}`),
  create: (data) => apiCall('/projects', 'POST', data),
  update: (id, data) => apiCall(`/projects/${id}`, 'PUT', data),
  delete: (id) => apiCall(`/projects/${id}`, 'DELETE'),
};

// Skills API
export const skillsAPI = {
  getAll: () => apiCall('/skills'),
  getById: (id) => apiCall(`/skills/${id}`),
  create: (data) => apiCall('/skills', 'POST', data),
  update: (id, data) => apiCall(`/skills/${id}`, 'PUT', data),
  delete: (id) => apiCall(`/skills/${id}`, 'DELETE'),
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    return apiCall('/auth/login', 'POST', { email, password });
  },
};

// Testimonials API
export const testimonialsAPI = {
  getAll: () => apiCall('/testimonials'),
  getById: (id) => apiCall(`/testimonials/${id}`),
  create: (data) => apiCall('/testimonials', 'POST', data),
  update: (id, data) => apiCall(`/testimonials/${id}`, 'PUT', data),
  delete: (id) => apiCall(`/testimonials/${id}`, 'DELETE'),
};
