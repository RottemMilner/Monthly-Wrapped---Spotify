/**
 * Example usage:
 * const dateString = "3/12/2024, 11:15:26 AM"; // this is the output of 'new Date(Date.now()).toLocaleString();'
 * const differenceInHours = hoursDiffFromNow(dateString);
 * console.log(`Difference in hours: ${differenceInHours}`); // Difference in hours: 0.57598...
 */
export const hoursDiffFromNow = (dateString) => {
  const inputDate = new Date(dateString);
  const now = new Date();
  const diffInMilliseconds = now - inputDate;
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  return diffInHours;
};
