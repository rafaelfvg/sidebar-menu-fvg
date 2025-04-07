const usePermissionOnMenu = (userPermissions) => {
  
  if (!userPermissions) {
    return () => false;
  }

  return (permissions) => {
    return permissions.some((permission) => userPermissions.includes(permission));
  };
};

export default usePermissionOnMenu;