using ConsoleTestSharp.Libraries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleTestSharp
{
    class Program
    {



        static void Main(string[] args)
        {
            string salt = "";
            string textNormal = "hola_";
            string textEncrip = "";

            salt = Guid.NewGuid().ToString();
            textEncrip = RijndaelManagedEncryption.EncryptRijndael(textNormal, salt);
            textNormal = RijndaelManagedEncryption.DecryptRijndael(textEncrip, salt);

            Console.WriteLine("---------------------------------------");
            Console.WriteLine("salt:" + salt);
            Console.WriteLine("textEncrip:" + textEncrip);
            Console.WriteLine("textNormal:" + textNormal);

            Console.WriteLine("---------------------------------------");
            Console.WriteLine("Usando AESAlgorithm:");
            textEncrip = AESAlgorithm.Encrypt(textNormal);
            //string otherTextEncript = AESAlgorithm.Encrypt("hola_");
            Console.WriteLine("textNormal:" + textNormal);
            Console.WriteLine("textEncrip:" + textEncrip);
            Console.WriteLine("textDecrip:" + AESAlgorithm.Decrypt(textEncrip));

            // Error padding code Base64 erroneo a proposito
            Console.WriteLine("textDecrip2:" + AESAlgorithm.Decrypt("pw7qE1E4o6/1QAKSPv8Jwg=="));

            Console.Read();
        }
    }
}
