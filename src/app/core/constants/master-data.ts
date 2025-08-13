import { Specialization } from "../models/facilitator.model";

  export const SPECIALIZATION_DATA: Specialization[] = [
    { specializationId: 1, specializationName: 'Medical Agent', categoryId: 4, categoryName: 'Medical Agent' },
    { specializationId: 2, specializationName: 'Travel Agent', categoryId: 2, categoryName: 'Travel Agent' },
    { specializationId: 3, specializationName: 'Booking Agent', categoryId: 1, categoryName: 'Booking Agent' },
    { specializationId: 4, specializationName: 'Insurance Agent', categoryId: 3, categoryName: 'Insurance Agent' },
    { specializationId: 5, specializationName: 'Medical Tourism', categoryId: 5, categoryName: 'Medical Tourism' },
    { specializationId: 6, specializationName: 'Healthcare Consultant', categoryId: 4, categoryName: 'Medical Agent' },
  ];
   // Replace with API if available
   export const AGENT_CATEGORY = [
    { id: 1, name: 'Booking Agent' },
    { id: 2, name: 'Travel Agent' },
    { id: 3, name: 'Insurance Agent' },
    { id: 4, name: 'Medical Agent' },
    { id: 5, name: 'Medical Tourism' }
  ];
