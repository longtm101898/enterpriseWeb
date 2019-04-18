import jwtDecode from "jwt-decode";
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("tokenKey");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function hasPermission(functionId, action) {
  var user = getCurrentUser();
  let result = false;
  var permission = JSON.parse(user.permissions);
  switch (action) {
    case "create":
      var hasRole = permission.findIndex(x => x == functionId);
      if (hasRole !== -1) result = true;
      break;
    case "update":
      var hasRole = permission.findIndex(x => x == functionId);
      if (hasRole !== -1) result = true;
      break;
    case "delete":
      var hasRole = permission.findIndex(x => x == functionId);

      if (hasRole !== -1) result = true;
      break;
  }
  return result;
}
