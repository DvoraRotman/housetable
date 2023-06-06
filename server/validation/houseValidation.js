
//validation on new house fields
export default async function validateHouse(body) {
    try {
        if (!body.address || !body.currentValue || !body.loanAmount) {
            throw { message: 'missing address or current value or loan Amount', status: 401 }
        }
        if (typeof body.currentValue !== 'number')
            throw { message: 'current value should be number', status: 401 }

        if (typeof body.address !== 'string')
            throw { message: 'address should be string', status: 401 }


    } catch (error) {
        throw error;
    }

}