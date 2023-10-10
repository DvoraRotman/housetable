import validateHouse from '../validation/houseValidation.js'
import { houses } from '../DB/houses.js'

import { calculateRisk } from '../logic/generalLogic.js';


export async function addHouse(body) {
    try {
        await validateHouse(body);
        body.risk = calculateRisk(body)
        body.id = await houses.getNewId();
        await houses.setHouse(body);
        return body.id
    } catch (error) {
        throw error;
    }
}
export async function getHouseDetails(id) {

    try {
        const houseDetails = await houses.getHouse(id)
        if (!houseDetails)
            throw { message: 'id does not exist', status: 401 };
        let obj =
            { Id: houseDetails.id, "Current Value": houseDetails.currentValue, "Loan Amount": houseDetails.loanAmount, Address: houseDetails.address, Risk: houseDetails.risk }
        return obj
    } catch (error) {
        throw error;
    }
}
export async function updateHouse(req) {
    try {
        const houseDetails = await houses.getHouse(req?.url?.match(/\/(\d+)$/)[1])
        if (!houseDetails)
            throw { message: 'id does not exist', status: 401 };
        if (req?.body?.currentValue != houseDetails?.currentValue || req?.body?.loanAmount != houseDetails?.loanAmount) {
            req.body.risk = calculateRisk(req?.body)
            req.body.id = req?.url?.match(/\/(\d+)$/)[1]
            await houses.updateHouseDB(req?.body)
        }
    } catch (error) {
        throw error;
    }
}