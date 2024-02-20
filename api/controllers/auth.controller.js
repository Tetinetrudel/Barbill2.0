import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../middleware/error.js'
import jwt from 'jsonwebtoken'

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body
    try {
      const user = await User.findOne({ email })
      if (user) {
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET
        );
        const { password, ...rest } = user._doc
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest)
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8)
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
        const newUser = new User({
          company:
            name.toLowerCase().split(' ').join('') +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        })
        await newUser.save()
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET
        );
        const { password, ...rest } = newUser._doc
        res.status(200).cookie('access_token', token, { httpOnly: true, }).json(rest)
      }
    } catch (error) {
      next(error)
    }
  }

  export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
      next(errorHandler(400, 'Veuillez compléter tous les champs avant de poursuivre votre connection'));
    }
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return next(errorHandler(404, `Données d'identifications invalides`));
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(400, `Données d'identifications invalides`));
      }
      const token = jwt.sign(
        { id: validUser._id},
        process.env.JWT_SECRET
      )
      const { password: pass, ...rest } = validUser._doc
      res.status(200).cookie('access_token', token, { httpOnly: true, }).json(rest)
    } catch (error) {
      next(error)
    }
  }

  export const signout = (req, res, next) => {
    try {
      res
        .clearCookie('access_token')
        .status(200)
        .json('User has been signed out')
    } catch (error) {
      next(error)
    }
  }