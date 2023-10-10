
//validation on new house fields
export default async function validateHouse(body) {
    try {
        if (!body.address || !body.currentValue || !body.loanAmount)
            throw { message: 'Missing Address or Current Value or Loan Amount', status: 401 }

        if (typeof body.currentValue !== 'number')
            throw { message: 'Current Value should be number', status: 401 }

        if (typeof body.loanAmount !== 'number')
            throw { message: 'Loan Amount should be number', status: 401 }

        if (typeof body.address !== 'string')
            throw { message: 'Address should be string', status: 401 }

        if (parseFloat(body.loanAmount) > parseFloat(body.currentValue))
            throw { message: 'Please ensure that the Current Value of the property is greater than or equal to the Loan Amount', status: 401 }


    } catch (error) {
        throw error;
    }

}