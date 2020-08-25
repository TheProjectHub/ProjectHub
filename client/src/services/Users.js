import http from "../http-common";

export function getUser(identifier, token) {
  return http.get(`/users/${identifier}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function inviteUserToConversation(email, convId, token) {
  return http.post(
    "/users/invitetoconversation",
    { email, convId },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function addConversationToUser(id, projID, token) {
  return http.post(
    "/users/addconversationtouser",
    { id, projID },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function rejectConversationRequest(id, projID, token) {
  return http.post(
    "/users/rejectconversationrequest",
    { id, projID },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function inviteUserToProject(email, projID, token) {
  return http.post(
    "/users/invitetoproject",
    { email, projID },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function addProjectToUser(id, projID, token) {
  return http.post(
    "/users/addprojecttouser",
    { id, projID },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function rejectProjectRequest(id, projID, token) {
  return http.post(
    "/users/rejectprojectrequest",
    { id, projID },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function createUser(data, token) {
  return http.post("/users", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function updateUser(id, data, token) {
  return http.put(`/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
