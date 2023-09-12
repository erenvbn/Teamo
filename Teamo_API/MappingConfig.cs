using AutoMapper;
using Persistence;
using Teamo_API;
using Teamo_API.Models.DTO;

namespace Teamo_API
{
    public class MappingConfig:Profile
    {
        public MappingConfig()
        {
            //.ReverseMap() for both way of mapping
            CreateMap<AssignmentDTO, Assignment>().ReverseMap();

            CreateMap<UserDTO, User>().ReverseMap();

            CreateMap<ProjectDTO, Project>().ReverseMap();

            CreateMap<CommentDTO, Comment>().ReverseMap();
        }
    }
}
