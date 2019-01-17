const {
  isAuthorized,
  WORKITEM,
} = require('../../../authorization/authorizationClientService');
const { UnauthorizedError } = require('../../../errors/errors');
const WorkItem = require('../../entities/WorkItem');
const Message = require('../../entities/Message');

/**
 * getWorkItem
 *
 * @param userId
 * @param workItemId
 * @param applicationContext
 * @returns {Promise<*>}
 */
exports.assignWorkItems = async ({ userId, workItems, applicationContext }) => {
  if (!isAuthorized(userId, WORKITEM)) {
    throw new UnauthorizedError('Unauthorized for assign work item');
  }

  const user = applicationContext.user;

  const workItemEntities = await Promise.all(
    workItems.map(workItem => {
      return applicationContext
        .getPersistenceGateway()
        .getWorkItemById({
          workItemId: workItem.workItemId,
          applicationContext,
        })
        .then(fullWorkItem =>
          new WorkItem(fullWorkItem)
            .assignToUser({
              assigneeId: workItem.assigneeId,
              assigneeName: workItem.assigneeName,
              role: user.role,
            })
            .addMessage(
              new Message({
                message: 'The work item was assigned.',
                sentBy: user.name,
                userId: user.userId,
                sentTo: workItem.assigneeName,
                createdAt: new Date().toISOString(),
              }),
            ),
        );
    }),
  );

  await Promise.all(
    workItemEntities.map(workItemEntity => {
      return applicationContext.getPersistenceGateway().saveWorkItem({
        workItemToSave: workItemEntity.validate().toRawObject(),
        applicationContext,
      });
    }),
  );
};