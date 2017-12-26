using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using kiosk.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace kiosk.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private IEmailSender _emailSender;
        private IConfigurationRoot _config;

        public ContactController(IEmailSender emailSender, IConfigurationRoot config)
        {
            _emailSender = emailSender;
            _config = config;
        }
        [HttpPost]
        public async Task<IActionResult> ContactUs([FromBody] Contact model)
        {
            try
            {
                var emailSubject = $"{model.Subject}";
                var emailBody = $@"Name: {model.Name}<br>
                                    Email: {model.Email}<br>
                                    Message: {model.Message}<br>";
                await _emailSender.SendEmailAsync(_config["Email:ToAddress"], emailSubject, emailBody);
                return Ok("You'll be receiving an email from us shortly!");
            }
            catch (Exception)
            {
                return BadRequest("Something went wrong sending the email.");
            }
        }

        public class Contact
        {
            public string Name { get; set; }
            public string Subject { get; set; }
            public string Email { get; set; }
            public string Message { get; set; }
        }
    }
}
