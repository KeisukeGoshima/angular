using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace restServer.Controllers
{
    [Route("api/heroes")]
    [ApiController]
    public class HeroController : ControllerBase
    {
        private readonly HeroContext _context;

        public HeroController(HeroContext context)
        {
            _context = context;
        }

        // GET: api/Hero
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Heroes>>> GetHeroes()
        {
          if (_context.Heroes == null)
          {
              return NotFound();
          }
            return await _context.Heroes.ToListAsync();
        }

        // GET: api/Hero/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Heroes>> GetHeroes(long id)
        {
          if (_context.Heroes == null)
          {
              return NotFound();
          }
            var heroes = await _context.Heroes.FindAsync(id);

            if (heroes == null)
            {
                return NotFound();
            }

            return heroes;
        }

        [HttpGet("find/{word}")]
        public async Task<ActionResult<IEnumerable<Heroes>>> SearchHeroes(string word)
        {
            if (_context.Heroes == null)
            {
                return NotFound();
            }
            var heroes = await _context.Heroes.Where(x => x.Name.Contains(word)).ToListAsync();

            if (heroes == null)
            {
                return NotFound();
            }
            return heroes;
        }

        // PUT: api/Hero/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutHeroes(Heroes heroes)
        {
            if (heroes.Id < 0)
            {
                return BadRequest();
            }
            _context.Entry(heroes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HeroesExists(heroes.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Hero
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Heroes>> PostHeroes(Heroes heroes)
        {
          if (_context.Heroes == null)
          {
              return Problem("Entity set 'HeroContext.Heroes'  is null.");
          }
            _context.Heroes.Add(heroes);
            await _context.SaveChangesAsync();

            // return CreatedAtAction("GetHeroes", new { id = heroes.Id }, heroes);
            return CreatedAtAction(nameof(GetHeroes), new { id = heroes.Id }, heroes);
        }

        // DELETE: api/Hero/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHeroes(long id)
        {
            if (_context.Heroes == null)
            {
                return NotFound();
            }
            var heroes = await _context.Heroes.FindAsync(id);
            if (heroes == null)
            {
                return NotFound();
            }

            _context.Heroes.Remove(heroes);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HeroesExists(long id)
        {
            return (_context.Heroes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
