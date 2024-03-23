import * as Yup from 'yup'

export const QUESTION = 'question'
export const QUESTION_LABEL = 'Question'

export const OPTIONS1 = 'options1'
export const OPTIONS1_LABEL = 'Options 1'

export const OPTIONS2 = 'options2'
export const OPTIONS2_LABEL = 'Options 2'

export const OPTIONS3 = 'options3'
export const OPTIONS3_LABEL = 'Options 3'

export const OPTIONS4 = 'options4'
export const OPTIONS4_LABEL = 'Options 4'

export const OPTIONS5 = 'options5'
export const OPTIONS5_LABEL = 'Options 5'

export default Yup.object({
  [QUESTION]: Yup.string().label(QUESTION_LABEL).required(),
  [OPTIONS1]: Yup.string().label(OPTIONS1_LABEL).required(),
  [OPTIONS2]: Yup.string().label(OPTIONS2_LABEL).required(),
  [OPTIONS3]: Yup.string().label(OPTIONS3_LABEL).required(),
  [OPTIONS4]: Yup.string().label(OPTIONS4_LABEL).optional(),
  [OPTIONS5]: Yup.string().label(OPTIONS5_LABEL).optional()
})
