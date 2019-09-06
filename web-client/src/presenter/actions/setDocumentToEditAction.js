import { state } from 'cerebral';

/**
 * sets the document to be edited from the current caseDetail
 *
 * @param {object} providers the providers object
 * @param {object} providers.props the cerebral props object
 * @param {object} providers.store the cerebral store object
 * @returns {void} sets the documentToEdit on state
 */
export const setDocumentToEditAction = ({ props, store }) => {
  const { caseDetail, documentIdToEdit } = props;

  if (documentIdToEdit) {
    const documentToEdit = caseDetail.documents.find(
      document => document.documentId === documentIdToEdit,
    );

    const draftState = documentToEdit.draftState || {};

    store.set(state.documentToEdit, documentToEdit);
    store.set(state.form, draftState);
  }
};
