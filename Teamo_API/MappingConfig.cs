using AutoMapper;
using Persistence;
using Persistence.Models;
using Teamo_API.Models.DTO;
using Teamo_DataAccess.Models;

namespace Teamo_API
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            //.ReverseMap() for both way of mapping
            CreateMap<AssignmentDTO, Assignment>().ReverseMap();

            CreateMap<UserDTO, User>().ReverseMap();

            CreateMap<ProjectDTO, Project>().ReverseMap();

            CreateMap<CommentDTO, Comment>().ReverseMap();

            CreateMap<AssignmentUserDTO, AssignmentUser>().ReverseMap();

            CreateMap<LoginRequestDTO, LoginRequest>().ReverseMap();

            CreateMap<LoginResponseDTO, LoginResponse>().ReverseMap();

            CreateMap<RegistrationRequestDTO, RegistrationRequest>().ReverseMap();


        }
    }
}
