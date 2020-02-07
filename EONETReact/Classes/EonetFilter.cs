using System.Collections.Generic;
using System.Linq;
using EONETReact.Classes.Dto;
using EONETReact.Interfaces;
namespace EONETReact.Classes
{
    public class EonetFilter : IEonetFilter
    {

        public IEnumerable<DtoEvent> Filter(IEnumerable<DtoEvent> events, DtoEventsFilterResquest filter)
        {
            if (filter == null) return events;

            if (filter.Date.HasValue)
            {
                events = events.Where(e => e.Geometries.Any(g => g.Date.Date == filter.Date.Value.Date));
            }

            if (filter.Status != null)
            {
                bool isClosed = filter.Status == "closed";
                events = events.Where(e => e.Closed.HasValue == isClosed);
            }

            if (filter.IdCategory.HasValue)
            {
                events = events.Where(e => e.Categories.Any(c => c.Id == filter.IdCategory.Value));
            }

            return events;
        }
    }
}
