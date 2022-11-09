import nodemailer from 'nodemailer'
import config from '../config/config.js'

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'maggie.eichmann@ethereal.email',
    pass: 'uas1GWvYqEK4bQehCh'
  }
})

const sendEmail = async (email, subject, text) => {
  const mailOptions = {
    from: config.email,
    to: email,
    subject,
    text
  }

  await transporter.sendMail(mailOptions)
}

export { sendEmail }
