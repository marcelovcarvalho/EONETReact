using System;
using System.Collections;
using System.Collections.Generic;
using EONETReact.Classes.Dto;

namespace EONETReact.Interfaces
{
    public interface IEonetFilter
    {
        IEnumerable<DtoEvent> Filter(IEnumerable<DtoEvent> events, DtoEventsFilterResquest filter);
    }
}
