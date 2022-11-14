using Microsoft.EntityFrameworkCore;

namespace Models;

public class HeroContext : DbContext
{
	public HeroContext(DbContextOptions<HeroContext> options) : base(options)
	{

	}

	public DbSet<Heroes> Heroes { get; set; } = null;
}

