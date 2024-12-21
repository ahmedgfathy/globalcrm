export const checkRole = (ele, role) => {
  if (role.includes(ele)) {
    return true;
  }
  return false;
}