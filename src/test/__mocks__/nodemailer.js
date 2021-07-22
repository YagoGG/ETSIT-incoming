import nodemailer from 'nodemailer';
import nodemailerMock from 'nodemailer-mock';

export default nodemailerMock.getMockFor(nodemailer);
