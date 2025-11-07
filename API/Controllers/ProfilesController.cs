using Application.Profiles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProfilesController : ControllerBase
{
    private readonly Details _details;
    private readonly Edit _edit;

    public ProfilesController(Details details, Edit edit)
    {
        _details = details;
        _edit = edit;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProfileDto>> GetProfile(string id)
    {
        var profile = await _details.GetProfileByIdAsync(id);
        if (profile == null) return NotFound($"User with id {id} not found");
        return Ok(profile);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditProfile(string id, [FromBody] ProfileDto dto)
    {
        var success = await _edit.EditProfileAsync(id, dto.FullName, dto.Bio, dto.BankAccountNumber);
        if (!success) return BadRequest("Profile update failed");
        return NoContent();
    }
}
