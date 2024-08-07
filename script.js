// Script for calculating BAC
document.getElementById('bac-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const drinks = parseFloat(document.getElementById('drinks').value);
    const hours = parseFloat(document.getElementById('hours').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;

    const genderConstant = (gender === 'male') ? 0.73 : 0.66;
    
    // Calculate BAC using the Widmark formula
    const bac = ((drinks * 5.14 / weight * genderConstant) - 0.015 * hours).toFixed(3);

    const resultDiv = document.getElementById('result');
    if (bac >= 0.08) {
        resultDiv.innerHTML = `BAC: ${bac}. It's not safe to drive.`;
        resultDiv.style.color = 'red';
    } else {
        resultDiv.innerHTML = `BAC: ${bac}. It's safe to drive.`;
        resultDiv.style.color = 'green';
    }
});