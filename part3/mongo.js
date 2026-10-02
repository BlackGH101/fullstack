
const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1'])

const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://kofisponsor_db_user:${password}@cluster0.cxaa9jf.mongodb.net/phoneBook?appName=Cluster0`

mongoose.set('strictQuery', false)

const phoneSchema = new mongoose.Schema({
    userName: String,
    phoneNumber: String,
})

const phoneBook = mongoose.model('phoneBook', phoneSchema)

if (process.argv.length === 3) {

    // Get all phonebook entries
    mongoose.connect(url, { family: 4 })
        .then(() => {
            return phoneBook.find({})
        })
        .then(result => {
            console.log('PhoneBook')
            result.forEach(phone => {
                console.log(`${phone.userName}, ${phone.phoneNumber}`)
            })

            mongoose.connection.close()
        })
        .catch(error => {
            console.log(error)
            mongoose.connection.close()
        })

} else if (process.argv.length === 5) {

    const userName = process.argv[3]
    const phoneNumber = process.argv[4]

    // Connect once
    mongoose.connect(url, { family: 4 })
        .then(() => {

            const phone = new phoneBook({
                userName: userName,
                phoneNumber: phoneNumber,
            })

            return phone.save()
        })
        .then(() => {
            console.log(`Added ${userName} number ${phoneNumber} to phonebook`)
            mongoose.connection.close()
        })
        .catch(error => {
            console.log(error)
            mongoose.connection.close()
        })

} else {
    console.log('give password and the fields (eg. Anna 043-433-3222) as argument')
    process.exit(1)
}

