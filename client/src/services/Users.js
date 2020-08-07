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

export function addConversationToUser(id, convId, token) {
  return http.post(
    "/users/addconversationtouser",
    { id, convId },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function rejectConversationRequest(id, convId, token) {
  return http.post(
    "/users/rejectconversationrequest",
    { id, convId },
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
