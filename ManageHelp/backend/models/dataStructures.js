// enum for the position (admin is default manager)
// TODO? add an admin role?

const position = {
    MANAGER: 0,
    EMPLOYEE: 1
}

// contains all the login info about a user

const accountInfo = {
    email,
    username,
    password
}

// contains corporate related items for user

const workInfo = {
    user_id,
    organization,
    position,
    job_title,
    pay_rate
}

// organize the shift time

const time = {
    start,
    end,
    duration
}