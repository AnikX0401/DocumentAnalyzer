const mailBody = {
  getUserMailBody: (payload) => {
    const { name } = payload;

    return `<div>
                <h1>Dear ${name},</h1><br/>
                <h2>Welcome Praise Array - Unleash your Web Development Superpowers!</h2>
                <p>Welcome to DocPro! We are thrilled to have you on board as a registered user of our web development platform. Get ready to dive into a world of coding, creativity, and endless possibilities!</p>
                <p>Happy coding!</p>
                <p>Best regards,</p>
                <h3>DocPro Team</h3>
            </div>`;
  },
  getAdminMailBody: (payload)=>{
    const {userName, email, phoneNumber, businessName, businessDescription, workType, currentWebsiteUrl} = payload;
    return `<div>
                <p>Name: ${userName},</p><br/>
                <p>Email: ${email},</p><br/>
                <p>Phone Number: ${phoneNumber},</p><br/>
                <p>Buisness Name: ${businessName},</p><br/>
                <p>Buisness Description: ${businessDescription},</p><br/>
                <p>Work Type: ${workType},</p><br/>
                <p>Current Website URL:  ${currentWebsiteUrl},</p><br/>
            </div>`;
  },
};

module.exports = mailBody;
