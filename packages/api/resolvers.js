import {
  apiCreateCommission,
  apiGetCommissions,
  apiGetAcceptedCommissions,
  apiGetBeatenCommissions,
  apiGetUnacceptedCommissions,
  apiGetPendingCommissions,
  apiGetUserCommissions,
  apiGetTopCommission,
  apiGetUserCompletedCommissions,
  apiGetNameCommissions,
  apiUpdateCommissionQueue,
  apiUpdateInactiveCommissions,
  apiCompletedCommissions,
  apiGetCommission,
  apiGetMinPriceForName,
  apiGetPositionForPrice,
  apiUpdateCommission,
  apiUpdateCommissionBid,
  apiFlagCommissions,
  apiGetCommissionsCount,
  apiRemoveCommission,
  apiUpdateCommissionAltNames,
} from './controllers/commissions.js'
import {
  apiUpdateMinBid,
  apiGetConfigs,
  apiGetAdmin,
} from './controllers/config.js'
import { apiGetGallery } from './controllers/gallery'
import { apiGetQueue } from './controllers/queue'
import { apiGetMetrics } from './controllers/metrics'
import {
  apiCompleteZombies,
  apiGetMembersCommissions,
  apiGetZombies,
  apiRegisterZombies,
} from './controllers/members'
import { apiUploadMintImage, apiUploadNFTMetadata } from './controllers/mint'

export default {
  Query: {
    admin: (parents, args) => apiGetAdmin(args),
    commissions: () => apiGetCommissions(),
    membersCommissions: (parent, args) => apiGetMembersCommissions(args),
    commissionsCount: () => apiGetCommissionsCount(),
    commission: (parent, id) => apiGetCommission(id),
    topCommissionPrice: () => apiGetTopCommission(),
    commissionsAccepted: () => apiGetAcceptedCommissions(),
    commissionsBeaten: () => apiGetBeatenCommissions(),
    commissionsUnaccepted: () => apiGetUnacceptedCommissions(),
    commissionsPending: () => apiGetPendingCommissions(),
    commissionsByUser: (parent, args) => apiGetUserCommissions(args),
    commissionsByName: (parent, args) => apiGetNameCommissions(args),
    commissionsByUserCompleted: (parent, args) =>
      apiGetUserCompletedCommissions(args),
    zombies: () => apiGetZombies(),
    configs: () => apiGetConfigs(),
    position: (parent, args) => apiGetPositionForPrice(args),
    minPrice: (parent, args) => apiGetMinPriceForName(args),
    gallery: (parent, args) => apiGetGallery(args),
    queue: () => apiGetQueue(),
    metrics: () => apiGetMetrics(),
  },
  Mutation: {
    createCommission: (root, args) => apiCreateCommission(args),
    updateCommission: (root, args) => apiUpdateCommission(args),
    removeCommission: (root, id) => apiRemoveCommission(id),
    updateCommissionBid: (root, args) => apiUpdateCommissionBid(args),
    updateCommissionAltNames: (root, args) => apiUpdateCommissionAltNames(args),
    updateCommissionQueue: (root, args) => apiUpdateCommissionQueue(args),
    updateCompletedCommissions: (root, args) => apiCompletedCommissions(args),
    updateInactiveCommissions: (root, args) =>
      apiUpdateInactiveCommissions(args),
    updateMinBid: (root, args) => apiUpdateMinBid(args),
    flagCommissions: (root, args) => apiFlagCommissions(args),
    registerZombies: (parent, args) => apiRegisterZombies(args),
    completeZombies: (parent, args) => apiCompleteZombies(args),
    uploadMintImage: (parent, args) => apiUploadMintImage(args),
    uploadNFTMetadata: (parent, args) => apiUploadNFTMetadata(args),
  },
}
