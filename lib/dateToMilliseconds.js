export const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const dateInMilliSeconds = new Date(start.getTime())

    const dates = []

    while(dateInMilliSeconds <= end){
        dates.push(new Date(dateInMilliSeconds).getTime())
        dateInMilliSeconds.setDate(dateInMilliSeconds.getDate() + 1)
    }
}