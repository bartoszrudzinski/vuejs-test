import { Serializer } from 'miragejs'
import { getAllRelationKeys, normalizeRelationForLists, numerizeIds } from '@/mocks/miragejs/utils'

export const AppSerializer = Serializer.extend({
  embed: true,
  root: false,
  include: function (request, collectionOrChild) {
    if (!collectionOrChild) return []

    return getAllRelationKeys(collectionOrChild)
  },
  serialize(...args) {
    // This is how to call super, as Mirage borrows [Backbone's implementation of extend](http://backbonejs.org/#Model-extend)
    let json = Serializer.prototype.serialize.apply(this, args)

    const [collectionOrChild] = args
    if (Array.isArray(json)) {
      json = json.map((object) => numerizeIds(object))
      json = json.map((object) =>
        normalizeRelationForLists(object, getAllRelationKeys(collectionOrChild))
      )
    } else {
      json = numerizeIds(json)
    }

    return json
  }
})
