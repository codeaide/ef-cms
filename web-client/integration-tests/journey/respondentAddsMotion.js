export default (test, fakeFile) => {
  return it('Respondent adds Motion with supporting Brief', async () => {
    await test.runSequence('gotoFileDocumentSequence', {
      docketNumber: test.docketNumber,
    });

    await test.runSequence('selectDocumentSequence');

    expect(test.getState('validationErrors')).toEqual({
      category: 'Select a Category.',
      documentType: 'Select a Document Type.',
    });

    await test.runSequence('updateFileDocumentWizardFormValueSequence', {
      key: 'category',
      value: 'Motion',
    });

    await test.runSequence('validateSelectDocumentTypeSequence');
    expect(test.getState('validationErrors')).toEqual({
      documentType: 'Select a Document Type.',
    });

    await test.runSequence('updateFileDocumentWizardFormValueSequence', {
      key: 'documentType',
      value: 'Motion for Continuance',
    });

    await test.runSequence('validateSelectDocumentTypeSequence');

    expect(test.getState('validationErrors')).toEqual({});

    await test.runSequence('selectDocumentSequence');
    await test.runSequence('selectDocumentSequence');

    expect(test.getState('form.documentType')).toEqual(
      'Motion for Continuance',
    );

    expect(test.getState('form.partyPrimary')).toBeUndefined();

    await test.runSequence('updateFileDocumentWizardFormValueSequence', {
      key: 'primaryDocumentFile',
      value: fakeFile,
    });

    await test.runSequence('updateFileDocumentWizardFormValueSequence', {
      key: 'certificateOfService',
      value: false,
    });

    await test.runSequence('updateFileDocumentWizardFormValueSequence', {
      key: 'attachments',
      value: false,
    });

    await test.runSequence('addSupportingDocumentToFormSequence', {
      type: 'primary',
    });

    await test.runSequence('updateFileDocumentWizardFormValueSequence', {
      key: 'supportingDocuments.0.supportingDocument',
      value: 'Brief in Support',
    });

    await test.runSequence('updateFileDocumentWizardFormValueSequence', {
      key: 'supportingDocuments.0.category',
      value: 'Supporting Document',
    });

    await test.runSequence('updateFileDocumentWizardFormValueSequence', {
      key: 'supportingDocuments.0.documentType',
      value: 'Brief in Support',
    });

    await test.runSequence('updateFileDocumentWizardFormValueSequence', {
      key: 'supportingDocuments.0.previousDocument',
      value: 'Motion for Continuance',
    });

    await test.runSequence('updateFileDocumentWizardFormValueSequence', {
      key: 'partyPrimary',
      value: true,
    });

    await test.runSequence('reviewExternalDocumentInformationSequence');

    expect(test.getState('validationErrors')).toEqual({
      objections: 'Enter selection for Objections.',
      supportingDocuments: [
        {
          index: 0,
          supportingDocumentFile: 'Upload a document.',
        },
      ],
    });

    await test.runSequence('updateFileDocumentWizardFormValueSequence', {
      key: 'objections',
      value: true,
    });

    await test.runSequence('updateFileDocumentWizardFormValueSequence', {
      key: 'supportingDocuments.0.supportingDocumentFile',
      value: fakeFile,
    });

    await test.runSequence('reviewExternalDocumentInformationSequence');

    await test.runSequence('submitExternalDocumentSequence');

    expect(test.getState('caseDetail.documents').length).toEqual(6);
  });
};