import { starterQuestions } from './questions/starter.js'
import { questions as administration } from './questions/setup-administration.js'
import { questions as userInterface } from './questions/netSuite-user-interface.js'
import { questions as processFlows } from './questions/standard-process-flows.js'
import { questions as analytics } from './questions/suiteanalytics.js'
import { questions as maintenanceSecurity } from './questions/maintenance-security.js'

export const questions = [
  ...starterQuestions,
  ...administration,
  ...userInterface,
  ...processFlows,
  ...analytics,
  ...maintenanceSecurity,
]

export const questionCount = questions.length
