using AutoMapper;
namespace TwinBackend.APIs.Helpers
{
    public class MappedProfile : Profile
    {
        public MappedProfile() 
        {
            CreateMap<QuestionDTO,Question>().ReverseMap();
            CreateMap<QuestionChoices,QuestionChoicesDTO>().ReverseMap();
        }
    }
}
