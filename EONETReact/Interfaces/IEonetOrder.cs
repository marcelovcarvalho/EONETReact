using System.Collections.Generic;
using EONETReact.Classes.Dto;

namespace EONETReact.Interfaces
{
    public interface IEonetOrder
    {
        IEnumerable<DtoEvent> Order(IEnumerable<DtoEvent> events, DtoEventsOrderRequest order);
    }
}
