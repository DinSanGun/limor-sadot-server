import express from 'express'
import aws from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();
aws.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY})
const ses = new aws.SES({region: 'us-east-1'});

router.post('/email', async (req,res) => {
    console.log(req.body)
    const {name: senderName, subject, email, message} = req.body;

    try{
        const respond = await sesMail(senderName, subject, email, message)
        console.log(respond)
        res.status(200).send('OK')
    }catch(error) {
        console.log(error)
        res.status(400).send('ERROR')
    }


    // sesMail(senderName, subject, email, message).then((val) => {
    //     console.log('Got: ', val)
    //     res.send('success!')
    // }).catch((err) => {
    //     res.send('/error' + err)
    // })
});

function sesMail(senderName, subject, email, message) {
    const params = {
        Destination: {
            ToAddresses: ['zeremhatodaart@gmail.com']
        },
        Message: {
            Body: {
                Text: {
                    Data: "From: " + senderName + "\n" + message + "\n" + email
                }
            },
            Subject: {
                Data: subject + " | " + senderName
            }
        },
        Source: "Contact@limorsadot.com"
    };

    console.log(params)
    return ses.sendEmail(params).promise();
}


export default router;