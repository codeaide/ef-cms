export default test => {
  return it('Petitions clerk views dashboard', async () => {
    await test.runSequence('gotoDashboardSequence');
    expect(test.getState('currentPage')).toEqual('DashboardPetitionsClerk');
    expect(test.getState('workQueue').length).toBeGreaterThanOrEqual(0);
    expect(test.getState('sectionWorkQueue').length).toBeGreaterThan(0);
    expect(test.getState('users').length).toBeGreaterThan(0);
    expect(test.getState('workQueueToDisplay')).toEqual('individual');
    await test.runSequence('switchWorkQueueSequence', {
      workQueueToDisplay: 'section',
    });
    expect(test.getState('workQueueToDisplay')).toEqual('section');
    const workItem = test
      .getState('sectionWorkQueue')
      .find(workItem => workItem.docketNumber === test.docketNumber);
    expect(workItem).toBeDefined();
    test.documentId = workItem.document.documentId;
    test.workItemId = workItem.workItemId;
  });
};
