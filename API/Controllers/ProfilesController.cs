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

    [HttpGet("{username}")]
    public async Task<ActionResult<ProfileDto>> GetProfile(string username)
    {
        var profile = await _details.GetProfileAsync(username);
        if (profile == null) return NotFound();
        return Ok(profile);
    }

    [HttpPut]
    public async Task<IActionResult> EditProfile([FromBody] ProfileDto dto)
    {
        var success = await _edit.EditProfileAsync(dto.Email, dto.FullName, dto.Bio, dto.BankAccountNumber);
        if (!success) return BadRequest("Profile update failed");
        return NoContent();
    }
}
