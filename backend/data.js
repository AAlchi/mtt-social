const bcrypt = require('bcryptjs');

const data = {
    users: [
        {
            firstName: 'Ali',
            lastName: 'Alchikh Ibrahim',
            email: 'alialchi07@gmail.com',
            username: 'alialchi',
            address: '3940 W. Argyle St',
            zipCode: '60625',
            password: bcrypt.hashSync('123456'),
        },
        {
            firstName: 'First',
            lastName: 'Last',
            email: 'example@gmail.com',
            username: 'Username',
            address: 'Address',
            zipCode: 'ZipCode',
            password: bcrypt.hashSync('123456789'),
        }
    ]
}