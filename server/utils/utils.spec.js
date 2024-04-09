// import { hoursDiffFromNow } from "./dateDiff.js";
// describe("hoursDiffFromNow", () => {
//   test("returns correct difference in hours for a past date", () => {
//     const pastDate = new Date();
//     pastDate.setHours(pastDate.getHours() - 5); // 5 hours in the past
//     const dateString = pastDate.toISOString();
//     const differenceInHours = hoursDiffFromNow(dateString);
//     expect(differenceInHours).toBeCloseTo(5, 0); // The second parameter is the number of digits after the decimal point to check for
//   });

//   test("returns negative difference in hours for a future date", () => {
//     const futureDate = new Date();
//     futureDate.setHours(futureDate.getHours() + 5); // 5 hours in the future
//     const dateString = futureDate.toISOString();
//     const differenceInHours = hoursDiffFromNow(dateString);
//     expect(differenceInHours).toBeCloseTo(-5, 0); // Expecting a negative difference
//   });

//   test("returns NaN for an invalid date string", () => {
//     const invalidDateString = "This is not a date!";
//     const differenceInHours = hoursDiffFromNow(invalidDateString);
//     expect(differenceInHours).toBeNaN();
//   });
// });
