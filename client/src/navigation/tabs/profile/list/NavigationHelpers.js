/**
 * Helper module para eliminar ciclos de dependencias en la navegación
 * Este módulo contiene funciones auxiliares para la navegación
 */

export const getListDetailNavigationComponent = () => {
  return require('./ListDetailNavigator').default;
};

export const getListsNavigationComponent = () => {
  return require('./ListsNavigator').default;
};
