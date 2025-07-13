const nodemailer = require('nodemailer');

exports.sendResetEmail = async (to, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

  await transporter.sendMail({
    from: '"HUI Study" <no-reply@huistudy.com>',
    to,
    subject: 'Khôi phục mật khẩu',
    html: `<p>Click vào link dưới đây để đặt lại mật khẩu:</p><a href="${resetUrl}">${resetUrl}</a>`
  });
};
