using System.Collections.Generic;
using System.Threading.Tasks;
using EONETReact.Classes.Dto;

namespace EONETReact.Interfaces
{
    public interface IEonetApiService
    {
        Task<IEnumerable<DtoEvent>> GetEvents();

        Task<IEnumerable<DtoCategory>> GetCategories();

        Task<DtoEvent> GetEventById(string idEvent);
    }
}
