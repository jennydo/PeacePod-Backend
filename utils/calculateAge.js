const calculateAge = (dob) => {
    const now = new Date();

    // Calculate the difference in years
    let age = now.getFullYear() - dob.getFullYear();

    // Check if the birthday has occurred this year
    if (now.getMonth() < dob.getMonth() || (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())) {
        age--;
    }

    return age;
}

module.exports = { calculateAge }
