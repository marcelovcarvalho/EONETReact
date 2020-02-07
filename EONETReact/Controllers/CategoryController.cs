using System.Collections.Generic;
using System.Threading.Tasks;
using EONETReact.Classes;
using EONETReact.Classes.Dto;
using EONETReact.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EONETReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly IEonetApiService _eonetApiService;

        public CategoryController()
        {
            _eonetApiService = new EonetApiService();
        }

        [HttpGet("GetCategories")]
        public async Task<IEnumerable<DtoCategory>> GetCategories()
        {
            IEnumerable<DtoCategory> events = await _eonetApiService.GetCategories();

            return events;
        }
    }
}
