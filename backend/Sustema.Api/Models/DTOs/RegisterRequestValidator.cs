using Sustema.Api.Models.DTOs;
using FluentValidation;

namespace Sustema.Api.Models.DTOs
{
    /// <summary>
    /// Validador para Requisição de Registro (RegisterRequest)
    /// </summary>
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        /// <summary>
        /// Validador da Requisição
        /// </summary>
        public RegisterRequestValidator()
        {
            RuleFor(x => x.Nome).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}
