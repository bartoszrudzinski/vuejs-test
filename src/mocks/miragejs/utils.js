export const getAllRelationKeys = (collectionOrChild) => {
  if (collectionOrChild.models) {
    // "array" response
    return Object.keys(collectionOrChild.models[0]?.associations)
  }
  // "object" response
  return Object.keys(collectionOrChild.associations)
}

/**
 * Changes "id" values from string to numbers as MirageJS does not do it by default
 *
 * @param object
 */
export const numerizeIds = (object) => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (key === 'id') return [key, Number(value)]

      if (Array.isArray(value)) return [key, value.map((valueItem) => numerizeIds(valueItem))]

      if (value === Object(value)) return [key, numerizeIds(value)]

      return [key, value]
    })
  )
}

/**
 * Changes relationship objects to array with id keys.
 * Used for list endpoints
 *
 * @param object
 */
export const normalizeRelationForLists = (object, relationshipKeys = []) => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (!relationshipKeys.includes(key)) {
        return [key, value]
      }

      if (Array.isArray(value)) {
        return [key, value.map(({ id }) => id)]
      }

      return [key, value.id]
    })
  )
}
