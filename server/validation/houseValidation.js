

export default async function validateHouse(body) {
    try {
        if (!body.address || !body.currentValue) {
            throw { message: 'missing address or current value', status: 401 }
        }
        if (typeof body.currentValue !== 'number')
            throw { message: 'current value should be number', status: 401 }

        if (typeof body.address !== 'string')
            throw { message: 'address should be string', status: 401 }


    } catch (error) {
        throw error;
    }

}