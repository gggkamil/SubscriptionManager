namespace API.DTOs
{
    public class UserDto
    {
         public string Id { get; set; } = null!;  
        public string Email { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string Token { get; set; } = null!;
    }
}
