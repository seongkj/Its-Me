import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gamil.com',
    auth: {
      user: 'sight41siyah@gmail.com',
      pass: process.env.EMAIL_PASSWORD,
    },
  })
);

function sendMailer(email, pw) {
  const mailOptions = {
    from: 'sight41siyah@gmail.com', // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
    to: email, // 수신 메일 주소
    subject: 'Password search authentication code transmission', // 제목
    text: pw, // 내용
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('error:', error);
    } else {
      console.log('email send' + info.response);
    }
  });
}

export default sendMailer;
