import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTempletes.js"
import { mailtrapClient } from "./mailtrap.js"
import { sender } from "./mailtrap.js"

export  const sendVerificationEmail=async(email,verificationToken)=>{

    const recipient=[{email}]

    try {
        
        const response=await mailtrapClient.send(
            {
                from:sender,
                to :recipient,
                subject:"verify your email",
                html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
                category:"Email Verification",
            }
        )
        console.log ( "email sent successfulyyu",response)
    } catch (error) {
        console.log(`error sendingcerification ${error}`)
        throw new Error(`error sendong code ${error}`)
    }
}