import { databases, ID, storage, account } from '@/services/appwrite/client'
import { Query } from 'appwrite'
import { getAllLeadsForTeamLead } from './leadsAction'

const getCurrentUserId = async () => {
  try {
    const currentUser = await account.get()
    return currentUser.$id || ''
  } catch (error) {
    console.warn('No user logged in, continuing without user ID.')
    return ''
  }
}

// if the userId is not provided it will get all for admin
const countLeadsGeneric = async (
  filterValue,
  userId = null,
  field = 'name'
) => {
  try {
    console.log(`Counting leads with filter: ${filterValue}`)

    const queries = []

    if (userId) {
      queries.push(Query.equal('userId', userId)) // Ensure count is scoped to the user
    }

    if (filterValue) {
      queries.push(Query.equal(field, filterValue))
    }

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      queries
    )

    console.log('Raw response:', response)

    const leadCount = response.total
    console.log('Lead count:', leadCount)
    return leadCount
  } catch (error) {
    console.error('Error counting leads:', error)
    throw error
  }
}

export const countLeadsByType = async (type, userId = null) => {
  return countLeadsGeneric(type, userId, 'type')
}

export const countLeadsByCustomerSource = async (
  customerSource,
  userId = null
) => {
  return countLeadsGeneric(customerSource, userId, 'customerSource')
}

export const countLeadsByLeadStatus = async (leadStatus, userId = null) => {
  return countLeadsGeneric(leadStatus, userId, 'leadStatus')
}

export const countLeadsByClass = async (classValue, userId = null) => {
  return countLeadsGeneric(classValue, userId, 'class')
}

// Usage example or get the id from the front End
const userId = await getCurrentUserId()

export const generateLeadsReport = async (userId = null) => {
  try {
    const report = {}

    // Count leads by type
    // const types = ['type1', 'type2', 'type3']; // Replace with actual types
    // report.types = {};
    // for (const type of types) {
    //   report.types[type] = await countLeadsByType(type, userId);
    // }

    // Count leads by customer source
    const customerSources = ['Facebook Leads', 'WhatsApp Leads', 'Agent Leads'] // Replace with actual customer sources
    report.customerSources = {}
    for (const source of customerSources) {
      report.customerSources[source] = await countLeadsByCustomerSource(
        source,
        userId
      )
    }

    // Count leads by lead status
    // const leadStatuses = ['status1', 'status2', 'status3']; // Replace with actual lead statuses
    // report.leadStatuses = {};
    // for (const status of leadStatuses) {
    //   report.leadStatuses[status] = await countLeadsByLeadStatus(status, userId);
    // }

    // Count leads by class
    // const classes = ['class1', 'class2', 'class3']; // Replace with actual classes
    // report.classes = {};
    // for (const classValue of classes) {
    //   report.classes[classValue] = await countLeadsByClass(classValue, userId);
    // }

    console.log('Generated report:', report)
    return report
  } catch (error) {
    console.error('Error generating leads report:', error)
    throw error
  }
}

// const countLeadsByCriteria = (leads, criteria) => {
//   return leads.reduce((acc, lead) => {
//     const key = lead[criteria]
//     if (!acc[key]) {
//       acc[key] = 0
//     }
//     acc[key]++
//     return acc
//   }, {})
// }
// export const countForTeamLead = async () => {
//   const leads = await getAllLeadsForTeamLead()
//   const countByType = countLeadsByCriteria(leads, 'type')
//   const countByCustomerSource = countLeadsByCriteria(leads, 'customerSource')
//   const countByClass = countLeadsByCriteria(leads, 'class')
//   console.log('Count by Type:', countByType)
//   console.log('Count by Customer Source:', countByCustomerSource)
//   console.log('Count by Class:', countByClass)
//   return { countByType, countByCustomerSource, countByClass }
// }
