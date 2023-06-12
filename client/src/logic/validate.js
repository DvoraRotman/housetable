


function validate(house, isAddPage) {

    const requiredFields = ['currentValue', 'loanAmount', ...(isAddPage ? ['address'] : [])];
    const missingField = requiredFields.find(field => !house[field]);
    if (missingField) {
        return { status: 'failed', message: `${missingField} is a required field.` };
    }
    if (parseFloat(house.loanAmount) > parseFloat(house.currentValue)) {
        return { status: 'failed', message: "Please ensure that the Current Value of the property is greater than or equal to the Loan Amount" };
    }
    return { status: 'ok' };

}
export default validate;