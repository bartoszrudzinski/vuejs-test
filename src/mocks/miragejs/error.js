import { Response } from 'miragejs'

export const wrongInputDataError = (message) => {
  return new Response(
    406,
    {},
    {
      message
    }
  )
}
