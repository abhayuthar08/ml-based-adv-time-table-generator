// You can move the validation logic from timetableService.js to here if needed
const validateTimetableData = (data) => {
    if (!data.collegeName || !data.branchName) {
      return { isValid: false, message: 'College name or branch name missing.' };
    }
    // Additional checks
    return { isValid: true };
  };
  
  module.exports = { validateTimetableData };
  