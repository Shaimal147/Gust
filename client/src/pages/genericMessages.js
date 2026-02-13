
const genericMessages = [
    "How's the sky looking today?",
    "Weather at a glance.",
    "Plan your day with confidence.",
    "Rain or shine, we’ve got you covered.",
    "Storm coming or sunshine ahead?",
    "Clouds gathering? Let’s find out.",
    "Weather, wherever you are.",
    "Smart weather insights."
]

 export function pickRandomMessage() {
    const message = Math.floor(Math.random() * genericMessages.length)
    return genericMessages[message]
}