import { body } from 'express-validator';


export const createGroup = [
    body('name').notEmpty().withMessage('name is required').isString().withMessage('name must be a string'),
    body('active').isBoolean().withMessage('active must be a boolean'),
    body('privacy').isIn(['PUBLIC', 'PRIVATE']).withMessage('privacy must be PUBLIC or PRIVATE'),
    body('adminId').isString().withMessage('adminId must be a string'),
];

export const editGroup = [
    body('name').isString().withMessage('name must be a string'),
    body('active').isBoolean().withMessage('active must be a boolean'),
    body('privacy').isIn(['PUBLIC', 'PRIVATE']).withMessage('privacy must be PUBLIC or PRIVATE'),
    body('adminId').isString().withMessage('adminId must be a string'),
];

export const updateGroup = [
    body('name').isString().withMessage('name must be a string'),
    body('active').isBoolean().withMessage('active must be a boolean'),
    body('privacy').isIn(['PUBLIC', 'PRIVATE']).withMessage('privacy must be PUBLIC or PRIVATE'),
    body('adminId').isString().withMessage('adminId must be a string'),
]


export const addMember = [
    body('memberId').isString().withMessage('memberId must be a string'),
    body('adminId').isString().withMessage('adminId must be a string'),
]

export const makeAdmin = [
    body('memberId').isString().withMessage('memberId must be a string'),
    body('adminId').isString().withMessage('adminId must be a string'),
]

export const removeAdmin = [
    body('adminId').isString().withMessage('adminId must be a string'),
]