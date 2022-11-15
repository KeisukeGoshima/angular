namespace Models;

public class Heroes
{
	public long Id { get; set;}
	public string? Name { get; set;}

	public Heroes(long id, string name)
	{
		this.Id = id;
		this.Name = name;
	}
}