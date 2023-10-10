
//calculate risk by loanAmount & currentValue
export function calculateRisk(body) {
    let risk = body?.loanAmount / body?.currentValue;
    if (risk > 0.5) {
        risk += 0.1;
    }

    return Math.min(risk, 1);
}