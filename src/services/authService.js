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
  
  var hasRole = permission.findIndex(x => x === functionId);
  switch (action) {
    case "create":
      if (hasRole !== -1) result = true;
      break;
    case "update":
      if (hasRole !== -1) result = true;
      break;
    case "delete":
      if (hasRole !== -1) result = true;
      break;
    case "download":
      if (hasRole !== -1) result = true;
      break;
    default:
      break;
  }
  return result;
}
