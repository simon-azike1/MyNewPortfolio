const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic API call handler
const apiCall = async (
  endpoint,
  method = 'GET',
  data = null,
  requiresAuth = false
) => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log('🔍 API Call:', url); // ADD THIS
  console.log('📦 Method:', method); // ADD THIS
  console.log('🔐 Requires Auth:', requiresAuth); // ADD THIS
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add JWT token ONLY when required
  if (requiresAuth) {
    const token = localStorage.getItem('adminToken');
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    console.log('📥 Response status:', response.status); // ADD THIS
    console.log('📄 Content-Type:', response.headers.get('content-type')); // ADD THIS

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ API call error:', error);
    throw error;
  }
};

// ================= PUBLIC APIs =================
export const projectsAPI = {
  getAll: () => apiCall('/projects'),
  getById: (id) => apiCall(`/projects/${id}`),
};

export const skillsAPI = {
  getAll: () => apiCall('/skills'),
  getById: (id) => apiCall(`/skills/${id}`),
};

export const testimonialsAPI = {
  getAll: () => apiCall('/testimonials'),
  getById: (id) => apiCall(`/testimonials/${id}`),
};

// ================= ADMIN APIs =================
export const adminProjectsAPI = {
  create: (data) => apiCall('/projects', 'POST', data, true),
  update: (id, data) => apiCall(`/projects/${id}`, 'PUT', data, true),
  delete: (id) => apiCall(`/projects/${id}`, 'DELETE', null, true),
};

export const adminSkillsAPI = {
  create: (data) => apiCall('/skills', 'POST', data, true),
  update: (id, data) => apiCall(`/skills/${id}`, 'PUT', data, true),
  delete: (id) => apiCall(`/skills/${id}`, 'DELETE', null, true),
};

export const adminTestimonialsAPI = {
  create: (data) => apiCall('/testimonials', 'POST', data, true),
  update: (id, data) => apiCall(`/testimonials/${id}`, 'PUT', data, true),
  delete: (id) => apiCall(`/testimonials/${id}`, 'DELETE', null, true),
};

export const authAPI = {
  login: (email, password) =>
    apiCall('/auth/login', 'POST', { email, password }),
};
