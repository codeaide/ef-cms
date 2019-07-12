import { state } from 'cerebral';

/**
 * sets the state.pdfPreviewUrl which is used for displaying PDF rendering previews
 *
 * @param {object} providers the providers object
 * @param {object} providers.props the cerebral props object containing the props.pdfUrl
 * @param {object} providers.store the cerebral store used for setting the state.pdfPreviewUrl
 */
export const clearPdfPreviewUrlAction = ({ get }) => {
  const oldUrl = get(state.pdfPreviewUrl);
  window.URL.revokeObjectURL(oldUrl);
};
