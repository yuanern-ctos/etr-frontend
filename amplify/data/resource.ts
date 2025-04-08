import { a, defineData } from "@aws-amplify/backend";

export const data = defineData({
  schema: a.schema({
    UserProfile: a
      .model({
        fullName: a.string().required(),
        rank: a.string(),
        service: a.string(),
        course: a.string(),
        courseNumber: a.string(),
        phoneNumber: a.string(),
        nextOfKinContact: a.string(),
        lastUnit: a.string(),
        passportPhoto: a.string(),
        medicalRecord: a.string(),
        role: a.string().required(),
        owner: a.string(),
      })
      .authorization((allow) => [allow.owner()]), // ✅ THIS IS THE CORRECT SYNTAX
  }),
});