/**
 * gets the user based on the name provided.
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context used for getting the getUser use case
 * @param {Function} providers.props the cerebral props object used for getting the props.user
 * @returns {object} the user
 */
export const getUserAction = async ({ applicationContext, props }) => {
  const user = await applicationContext
    .getUseCases()
    .getUserInteractor(props.user);
  return { user };
};
