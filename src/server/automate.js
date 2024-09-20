// generateDummyUsers.js

const { CreateUser } = require('./dbQueries'); // Import the CreateUser function from dbQueries
const bcrypt = require('bcrypt');

// Define dummy data for user creation based on football player names
const dummyUsers = [
    { name: 'Lionel Messi', email: 'lionel.messi@example.com', password: 'user', user_type: 'user' },
    { name: 'Cristiano Ronaldo', email: 'cristiano.ronaldo@example.com', password: 'user', user_type: 'admin' },
    { name: 'Neymar Jr', email: 'neymar.jr@example.com', password: 'user', user_type: 'guide' },
    { name: 'Kylian Mbappe', email: 'kylian.mbappe@example.com', password: 'user', user_type: 'user' },
    { name: 'Mohamed Salah', email: 'mohamed.salah@example.com', password: 'user', user_type: 'guide' },
    { name: 'Kevin De Bruyne', email: 'kevin.debruyne@example.com', password: 'user', user_type: 'user' },
    { name: 'Virgil van Dijk', email: 'virgil.vandijk@example.com', password: 'user', user_type: 'user' },
    { name: 'Sadio Mane', email: 'sadio.mane@example.com', password: 'user', user_type: 'guide' },
    { name: 'Robert Lewandowski', email: 'robert.lewandowski@example.com', password: 'user', user_type: 'user' },
    { name: 'Eden Hazard', email: 'eden.hazard@example.com', password: 'user', user_type: 'guide' },
    { name: 'Paul Pogba', email: 'paul.pogba@example.com', password: 'user', user_type: 'user' },
    { name: 'Antoine Griezmann', email: 'antoine.griezmann@example.com', password: 'user', user_type: 'guide' },
    { name: 'Zlatan Ibrahimovic', email: 'zlatan.ibrahimovic@example.com', password: 'user', user_type: 'admin' },
    { name: 'Gareth Bale', email: 'gareth.bale@example.com', password: 'user', user_type: 'user' },
    { name: 'Luka Modric', email: 'luka.modric@example.com', password: 'user', user_type: 'guide' },
    { name: 'Sergio Ramos', email: 'sergio.ramos@example.com', password: 'user', user_type: 'user' },
    { name: 'Karim Benzema', email: 'karim.benzema@example.com', password: 'user', user_type: 'user' },
    { name: 'Gerard Pique', email: 'gerard.pique@example.com', password: 'user', user_type: 'guide' },
    { name: 'Thiago Silva', email: 'thiago.silva@example.com', password: 'user', user_type: 'user' },
    { name: 'Manuel Neuer', email: 'manuel.neuer@example.com', password: 'user', user_type: 'guide' }
];

// Function to automatically create dummy users
async function createDummyUsers() {
    for (let user of dummyUsers) {
        try {
            // Call CreateUser function for each user, use bcrypt to hash the password
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await CreateUser(user.name, user.email, hashedPassword, user.user_type);
            console.log(`User ${user.name} created successfully.`);
        } catch (err) {
            console.error(`Failed to create user ${user.name}:`, err);
        }
    }
    console.log('All dummy users have been created.');
}

// Run the function to create the dummy users
createDummyUsers();
