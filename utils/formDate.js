export const formDate = (dateTimeStamp) => {
  const convertToDate = new Date(dateTimeStamp)
  return convertToDate.toLocaleDateString('en-GB')
}