using System;
using System.Collections.Generic;

namespace EONETReact.Classes.Dto
{
    public class DtoEonetEventResponse : DtoEonetResponse
    {
        public IEnumerable<DtoEvent> Events { get; set; }
    }
}
