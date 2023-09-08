using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Teamo_API.Models;
using Teamo_API.Models.DTO;

namespace Teamo_API.Controllers
{
    [Route("api/Villa")]
    [ApiController]
    public class VillaController : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<List<Villa>> GetVillaList()
        {
            return VillaDTO.villaList;
        }

        [HttpGet("id", Name ="GetVillaRoute")]
        // Creates "/api/Villa/id" route
        //Response Templates
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(VillaDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Villa> GetVilla(int id)
        {
            var villa = VillaDTO.villaList.Where(i => i.Id == id).FirstOrDefault();
            if (villa == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(villa);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<VillaDTO> CreateVilla([FromBody]Villa villa)
        {
            if (villa == null)
            {
                return BadRequest(villa);
            }
            else if (villa.Id < 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            else
            {
                villa.Id = VillaDTO.villaList
                    .OrderByDescending(u => u.Id).FirstOrDefault().Id+1;
                VillaDTO.villaList.Add(villa);

                return CreatedAtRoute("GetVillaRoute", new {id=villa.Id }, villa);
                //"GetVilla" locationunda üretilir.
                //GetVilla routeu GetVilla(id) methodunu kullandığı için
                    //Bu id'ye parametre vermek adına yeni üretilecek villanın id'si verilir
                //O sayfada json olarak gösterilecek olan villa objesi de buraya eklenir.
            }
        }
    }
}
