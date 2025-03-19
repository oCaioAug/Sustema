using System.Security.Cryptography;

namespace Sustema.Api.Helpers
{
    /// <summary>
    /// Helper para Password
    /// </summary>
    public static class PasswordHelper
    {
        private const int SaltSize = 16; // 128 bits
        private const int KeySize = 32;  // 256 bits
        private const int Iterations = 10000;

        /// <summary>
        /// Gera um hash seguro para a senha informada.
        /// O formato retornado é: {iterations}.{saltBase64}.{hashBase64}
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        public static string HashPassword(string password)
        {
            using (var algorithm = new Rfc2898DeriveBytes(password, SaltSize, Iterations, HashAlgorithmName.SHA256))
            {
                var salt = algorithm.Salt;
                var key = algorithm.GetBytes(KeySize);

                return $"{Iterations}.{Convert.ToBase64String(salt)}.{Convert.ToBase64String(key)}";
            }
        }

        /// <summary>
        /// Verifica se a senha inserida é igual à hash da senha armazenada no banco de dados
        /// </summary>
        /// <param name="password"></param>
        /// <param name="hash"></param>
        /// <returns></returns>
        /// <exception cref="FormatException"></exception>
        public static bool VerifyPassword(string password, string hash)
        {
            var parts = hash.Split('.');

            if (parts.Length != 3)
            {
                throw new FormatException("Formato do hash inválido.");
            }

            int iterations = int.Parse(parts[0]);
            var salt = Convert.FromBase64String(parts[1]);
            var key = Convert.FromBase64String(parts[2]);

            using (var algorithm = new Rfc2898DeriveBytes(password, salt, iterations, HashAlgorithmName.SHA256))
            {
                var keyToCheck = algorithm.GetBytes(KeySize);

                return keyToCheck.Length == key.Length && keyToCheck.AsSpan().SequenceEqual(key);
            }
        }
    }
}
