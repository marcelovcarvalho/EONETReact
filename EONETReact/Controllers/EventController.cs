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
    public class EventController : ControllerBase
    {
        private readonly IEonetApiService _eonetApiService;
        private readonly IEonetFilter _eonetFilter;
        private readonly IEonetOrder _eonetOrder;

        public EventController()
        {
            _eonetApiService = new EonetApiService();
            _eonetFilter = new EonetFilter();
            _eonetOrder = new EonetOrder();
        }

        [HttpPost("GetEvents")]
        public async Task<IEnumerable<DtoEvent>> GetEvents([FromBody] DtoEventsRequest eventsRequest)
        {
            IEnumerable<DtoEvent> events = await _eonetApiService.GetEvents();

            events = _eonetFilter.Filter(events, eventsRequest.filter);
            events = _eonetOrder.Order(events, eventsRequest.order);

            return events;
        }

        [HttpGet("GetEventById")]
        public async Task<DtoEvent> GetEventById(string id)
        {
            return await _eonetApiService.GetEventById(id);
        }
    }
}
