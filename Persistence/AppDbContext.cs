
using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Subscription> Subscriptions { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Notification> Notifications { get; set; }

    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Notification>()
            .HasOne(n => n.Subscription)
            .WithMany()
            .HasForeignKey(n => n.SubscriptionId)
            .OnDelete(DeleteBehavior.Restrict); 

        builder.Entity<Subscription>()
        .Property(s => s.Amount)
        .HasPrecision(18, 2); 

        builder.Entity<Transaction>()
        .Property(t => t.Amount)
        .HasPrecision(18, 2);
    }
}

