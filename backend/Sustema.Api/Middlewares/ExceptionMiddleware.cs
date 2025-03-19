namespace Sustema.Api.Middlewares
{
    /// <summary>
    /// Middleware
    /// </summary>
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="next"></param>
        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        /// <summary>
        /// Método para lidar com Exceptions durante o processamento de requisições HTTP.
        /// Captura a Exception e joga para o próximo middleware na pipeline,
        /// transforma o status code para 500 e retorna um objeto JSON com a mensagem de erro.
        /// </summary>
        /// <param name="context">The HttpContext for the current request.</param>
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsJsonAsync(new { error = ex.Message });
            }
        }
    }
}
