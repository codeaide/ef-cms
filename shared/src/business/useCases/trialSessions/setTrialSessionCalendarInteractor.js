const {
  isAuthorized,
  TRIAL_SESSIONS,
} = require('../../../authorization/authorizationClientService');
const { Case } = require('../../entities/cases/Case');
const { TrialSession } = require('../../entities/TrialSession');
const { UnauthorizedError } = require('../../../errors/errors');

/**
 * set trial session calendar
 *
 * @param trialSessionId
 * @param applicationContext
 * @returns {*|Promise<*>}
 */
exports.setTrialSessionCalendarInteractor = async ({
  applicationContext,
  trialSessionId,
}) => {
  const user = applicationContext.getCurrentUser();

  if (!isAuthorized(user, TRIAL_SESSIONS)) {
    throw new UnauthorizedError('Unauthorized');
  }

  const trialSession = await applicationContext
    .getPersistenceGateway()
    .getTrialSessionById({
      applicationContext,
      trialSessionId,
    });

  const trialSessionEntity = new TrialSession(trialSession);

  trialSessionEntity.validate();

  const eligibleCases = await applicationContext
    .getPersistenceGateway()
    .getEligibleCasesForTrialSession({
      applicationContext,
      limit: trialSessionEntity.maxCases,
      skPrefix: trialSessionEntity.generateSortKeyPrefix(),
    });

  const setTrialSessionCalendar = async caseRecord => {
    const { caseId } = caseRecord;
    const caseEntity = new Case(caseRecord);

    caseEntity.setAsCalendared(trialSessionEntity);
    trialSessionEntity.addCaseToCalendar(caseEntity);

    // must these occur sequentially, or can they be parallel?
    await applicationContext.getPersistenceGateway().updateCase({
      applicationContext,
      caseToUpdate: caseEntity.validate().toRawObject(),
    });

    await applicationContext
      .getPersistenceGateway()
      .deleteCaseTrialSortMappingRecords({
        applicationContext,
        caseId,
      });
  };

  await Promise.all(eligibleCases.map(setTrialSessionCalendar));

  trialSessionEntity.setAsCalendared();

  return await applicationContext.getPersistenceGateway().updateTrialSession({
    applicationContext,
    trialSessionToUpdate: trialSessionEntity.validate().toRawObject(),
  });
};