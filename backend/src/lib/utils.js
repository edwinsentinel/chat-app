import jwt from 'jsonwebtoken';


//generate token
export const generateToken = (userId,res) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });//generate token
    res.cookie("jwt",token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,//7 days
        httpOnly: true,//cookie can only be accessed by the server
        sameSite:"Strict",//cookie is not sent with cross-origin requests
        secure: process.env.NODE_ENV !== "development" ,//cookie is only sent over HTTP OR HTTPS
          });//set cookie
    return token;//return token
}
