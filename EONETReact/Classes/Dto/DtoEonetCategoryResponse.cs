using System;
using System.Collections.Generic;

namespace EONETReact.Classes.Dto
{
    public class DtoEonetCategoryResponse : DtoEonetResponse
    {
        public IEnumerable<DtoCategory> Categories { get; set; }
    }
}
