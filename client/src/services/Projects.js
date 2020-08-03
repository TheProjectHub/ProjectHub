import http from "../http-common";

export function getProject(id, token) {
  return http.get(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function getAllProjectNames(token) {
  return http.get("/projects", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function createProject(data, token) {
  return http.post("/projects", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function updateProject(id, data, token) {
  return http.put(`/projects/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
