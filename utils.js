module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()

    const month = today.getMonth() - birthDate.getMonth()
        if(month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
            age = age - 1
        }

        return age

    },
    date: function(timestamp) {
        // get date
        const date = new Date(timestamp)
        // get year
        const year = date.getFullYear()
        // get month 
        const month = date.getFullYear() + 1
        // get day
        const day = date.getFullYear()

        console.log(`${year}-${month}-${day}`)
    }
}