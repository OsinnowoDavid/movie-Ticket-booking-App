import joi from 'joi';

const validator = (schema) => (payload) => {
    const { error, value } = schema.validate(payload, { abortEarly: false });
    return { error, value: error ? null : value };
};

const coming_soon_validator = joi.object({
    movieName: joi.string().required(),
    moviePicture: joi.any(), // Validate moviePicture as any type
    moviesWatchingDate: joi.string().required(),
    MovieDescription: joi.string(),
});

const comingSoon = validator(coming_soon_validator);

const ticketValidation = joi.object({
    movieName:joi.string().required(),
    movieDate:joi.string().required(),
    movieTime:joi.string().required(),
    seatNo:joi.string().required(),
    email:joi.string().email(),
    phone:joi.string().email(),
name:joi.string().email(),

})
const ticketValid = validator(ticketValidation)


const reset_password = joi.object({
    email: joi.string().required(),
    newPassword:joi.string().required(),
    OTP: joi.string(). min(6).max(6). required(),
})

const reset_password_validation = validator(reset_password)
const schema_validator = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().max(10).min(3).required(),
    role: joi.string(),

});

const validate = validator(schema_validator);

export {validate, comingSoon , ticketValid, reset_password_validation };
