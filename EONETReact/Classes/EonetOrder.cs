using System;
using System.Collections.Generic;
using System.Linq;
using EONETReact.Classes.Dto;
using EONETReact.Interfaces;
namespace EONETReact.Classes
{
    public class EonetOrder : IEonetOrder
    {
        public IEnumerable<DtoEvent> Order(IEnumerable<DtoEvent> events, DtoEventsOrderRequest order)
        {
            if (order == null) order = new DtoEventsOrderRequest();

            switch (order.OrderBy)
            {
                case "date":
                    if (order.Ascending)
                        events = events.OrderBy(e => e.Geometries.Select(g => g.Date).OrderByDescending(g => g).FirstOrDefault()).ThenBy(e => e.Id);
                    else
                        events = events.OrderByDescending(e => e.Geometries.Select(g => g.Date).OrderByDescending(g => g).FirstOrDefault()).ThenByDescending(e => e.Id);
                    break;
                case "status":
                    if (order.Ascending)
                        events = events.OrderBy(e => e.Closed.HasValue).ThenBy(e => e.Id);
                    else
                        events = events.OrderByDescending(e => e.Closed.HasValue).ThenByDescending(e => e.Id);
                    break;
                case "category":
                    if (order.Ascending)
                        events = events.OrderBy(e => e.Categories.OrderBy(c => c.Title).Select(c => c.Title).FirstOrDefault()).ThenBy(e => e.Id);
                    else
                        events = events.OrderByDescending(e => e.Categories.OrderBy(c => c.Title).Select(c => c.Title).FirstOrDefault()).ThenByDescending(e => e.Id);
                    break;
                default:
                    events = events.OrderByDescending(e => e.Id);
                    break;
            }

            return events;
        }
    }
}
