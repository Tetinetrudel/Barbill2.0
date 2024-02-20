import { errorHandler } from "../middleware/error.js"
import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'

export const createUser = async (req, res, next) => {
    const { company, email, password } = req.body
    if(!company || !email || !password) {
        return next(errorHandler(400, `Veuillez compléter tous les champs avant de poursuivre votre inscription`))
    }

    try {
        const existingCompany = await User.findOne({ company }).exec()
        if(existingCompany) {
            return next(errorHandler(401, `${company} n'est pas disponible pour le moment.`))
        }

        const existingEmail = await User.findOne({ email }).exec()
        if(existingEmail) {
            return next(errorHandler(401, `${email} n'est pas disponible pour le moment`))
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            company,
            email,
            password: hashedPassword,
        })
        
        await newUser.save();
        res.json('Inscription réussie')
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    const { company, email, profilePicture } = req.body
    console.log(req.user)
    try {
        const user = await User.findById(req.user.id).exec()

        if (!user) {
            return next(errorHandler(400, `L'usager n'a pas été trouvé`))
        }

        const duplicate = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec()

        if (duplicate && duplicate?._id.toString() !== req.user.id) {
            return next(errorHandler(409, `Le courriel que vous tenté d'entrer existe déjà`))
        }

        user.company = company
        user.email = email

        if(!profilePicture) {
            user.profilePicture = user.profilePicture
        } else {
            user.profilePicture = profilePicture
        }

        user.password = user.password


    const updatedUser = await user.save()

    const { password, ...rest } = updatedUser._doc
    res.json(rest)
    } catch (error) {
        next(error)
    }
}