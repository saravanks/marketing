export * from './amplitude'

export const EVENTS = {
  PAGE_VIEW: 'page:view',
  JOIN_BETA: {
    OPEN: 'join_beta:open',
    CLOSE: 'join_beta:close',
    FILL_FORM: 'join_beta:fill_form',
    SUBMIT: 'join_beta:submit',
    SEND: 'join_beta:send'
  },
  APPLY_TO_JOB: {
    OPEN: 'apply_to_job:open',
    CLOSE: 'apply_to_job:close',
    FILL_FORM: 'apply_to_job:fill_form',
    SUBMIT: 'apply_to_job:submit',
    SEND: 'apply_to_job:send'
  }
};