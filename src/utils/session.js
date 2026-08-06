export function getCurrentUser() {
  const user = localStorage.getItem("roommate");
  return user ? JSON.parse(user) : null;
}

export function saveCurrentUser(user) {
  localStorage.setItem("roommate", JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem("roommate");
}