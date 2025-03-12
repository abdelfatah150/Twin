using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Service.HelperServices;

namespace TwinBackend.Service.MainServices
{
    public class MailService
    {
        private readonly MailSettings _MailSettings;

        public MailService(IOptions<MailSettings> mailSettings) { 
            _MailSettings = mailSettings.Value;
        }

        public void sendEmail(string email, string subject, string message) { 
            var Mail = new MimeMessage();
            Mail.From.Add(MailboxAddress.Parse(_MailSettings.SenderEmail));
            Mail.To.Add(MailboxAddress.Parse(email));
            Mail.Subject = subject;
            Mail.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = message };
            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect(_MailSettings.Host, _MailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_MailSettings.SenderEmail, _MailSettings.Password);
            smtp.Send(Mail);
            smtp.Disconnect(true);
        }
    }
}
