import { body } from "express-validator";

export const addDeviceValidator = [
    body('deviceName', 'device name cannot be empty').not().isEmpty(),
    body('deviceType', 'device type cannot be empty').not().isEmpty(),
    body('deviceStatus', 'device status cannot be empty').not().isEmpty()
]
export const deviceGroupValidator = [
    body('groupName', 'group name cannot be empty').not().isEmpty(),
]