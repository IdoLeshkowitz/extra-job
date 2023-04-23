export default function getHebrewDate(date: Date) {
    const d = new Date(date)
    const year = d.toLocaleString('he-IL', {year: 'numeric'})
    const month = d.toLocaleString('he-IL', {month: 'long'})
    const day = d.toLocaleString('he-IL', {day: 'numeric'})
    return `${year} ${month} ${day}`.split(' ').reverse().join(' ')
}
