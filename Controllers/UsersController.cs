using KVI_NetCore_Web_API_CRUD.Data;
using KVI_NetCore_Web_API_CRUD.Models.DTOs;
using KVI_NetCore_Web_API_CRUD.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KVI_NetCore_Web_API_CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public UsersController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _dbContext.Users.ToList();
            return Ok(users);
        }

        [HttpGet]
        [Route("{Id:guid}")]
        public IActionResult GetUser(Guid Id) 
        {
            var user = _dbContext.Users.Find(Id);

            if (user == null) 
            { 
                return NotFound(); 
            }

            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddUser(AddUsersDTO addUsers)
        {
            var userEntity = new Users()
            {
                Name = addUsers.Name,
                Email = addUsers.Email,
                Gender = addUsers.Gender,
                Age = addUsers.Age,
                BirthDate = addUsers.BirthDate
            };

            _dbContext.Users.Add(userEntity);
            _dbContext.SaveChanges();

            return Ok(userEntity);
        }

        [HttpPut]
        [Route("{Id:guid}")]
        public IActionResult UpdateUser(Guid Id, UpdateUsersDTO updateUsersDTO)
        {
            var user = _dbContext.Users.Find(Id);

            if (user == null)
            {
                return NotFound();
            }

            user.Name = updateUsersDTO.Name;
            user.Email = updateUsersDTO.Email;
            user.Gender = updateUsersDTO.Gender;
            user.Age = updateUsersDTO.Age;
            user.BirthDate = updateUsersDTO.BirthDate;

            _dbContext.SaveChanges();

            return Ok(user);
        }

        [HttpDelete]
        [Route("{Id:guid}")]
        public IActionResult DeleteUser(Guid Id)
        {
            var user = _dbContext.Users.Find(Id);

            if (user == null) 
            { 
                return NotFound(); 
            }

            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}
