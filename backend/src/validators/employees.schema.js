// src/validators/employees.schema.js
const { z } = require("zod");

// NOTE: theo bảng employees của bạn
const employeeCreateSchema = z.object({
  employeeCode: z.string().min(1).max(20),
  name: z.string().min(1).max(120),

  title: z.string().max(100).optional().nullable(),
  position: z.string().max(100).optional().nullable(),
  department: z.string().max(100).optional().nullable(),
  status: z.string().max(50).optional().nullable(),

  dob: z.string().optional().nullable(), // "YYYY-MM-DD"
  gender: z.string().max(10).optional().nullable(),
  address: z.string().max(255).optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  email: z.string().max(100).optional().nullable(),

  education: z.string().max(100).optional().nullable(),
  politicalStatus: z.string().max(50).optional().nullable(),
  politicalPartyDate: z.string().optional().nullable(),
  youthUnionMember: z.number().int().optional().nullable(), // tinyint(1)
  youthUnionDate: z.string().optional().nullable(),
  policyStatus: z.string().max(100).optional().nullable(),

  contractType: z.string().max(50).optional().nullable(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  workStatus: z.string().max(50).optional().nullable(),
  familyInfo: z.string().max(255).optional().nullable(),
  policyId: z.number().int().optional().nullable(),
});

const employeeUpdateSchema = employeeCreateSchema.partial().extend({
  employeeCode: z.string().min(1).max(20).optional(), // cho phép update nhưng vẫn validate
  name: z.string().min(1).max(120).optional(),
});

module.exports = { employeeCreateSchema, employeeUpdateSchema };