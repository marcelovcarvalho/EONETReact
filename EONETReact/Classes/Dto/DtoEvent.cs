using System;
using System.Collections;
using System.Collections.Generic;

namespace EONETReact.Classes.Dto
{
    public class DtoSimpleEvent
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public DateTime? Closed { get; set; }
        public IEnumerable<DtoCategory> Categories { get; set; }
        public IEnumerable<DtoSource> Sources { get; set; }
        public IEnumerable<DtoGeometry> Geometries { get; set; }
        
    }

    public class DtoEvent : DtoSimpleEvent
    {
        public string Description { get; set; }
        public string Link { get; set; }
    }
}
