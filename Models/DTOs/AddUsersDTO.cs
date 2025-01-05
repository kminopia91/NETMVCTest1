namespace KVI_NetCore_Web_API_CRUD.Models.DTOs
{
    public class AddUsersDTO
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public int Gender { get; set; }
        public int Age { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
