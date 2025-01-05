using KVI_NetCore_Web_API_CRUD.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace KVI_NetCore_Web_API_CRUD.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public DbSet<Users> Users { get; set; }
    }
}
