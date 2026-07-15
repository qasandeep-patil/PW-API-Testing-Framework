const processENV = process.env.TEST_ENV
const env = processENV || 'dev'
console.log('Test environment is: '+env)


const config = {

    apiUrl:'https://conduit-api.bondaracademy.com/api',
    userEmail:'sandeep@yopmail.com',
    userPassword:'sandeep@1984'
}

if(env === 'qa'){
    config.userEmail = 'sandeep@yopmail.com'
    config.userPassword = 'sandeep@1984'
}

if(env === 'prod'){
    config.userEmail = 'sandeep@yopmail.com'
    config.userPassword = 'sandeep@1984'
}

export {config}