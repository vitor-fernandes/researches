using System;
using System.Security.Cryptography;
using System.Text;

public class Exploit
{

    public static void Main(string[] args)
    {
        string password = "eZc123!@890B4@!&zp0~k4yv$y766eytas!@qqfhvA6AD9%dqtq22";
        string walletAddr = args.GetValue(0).ToString();
		string stage = args.GetValue(1).ToString();
		long ticks = DateTime.UtcNow.Ticks;
		string hash = "";

		if(string.IsNullOrEmpty(stage)){
			hash = ComputeSha256Hash(ticks + walletAddr + password);	
		}
		else {
			hash = ComputeSha256Hash(ticks + walletAddr + stage + password);
		}

        Console.WriteLine($"{ticks} {hash}");
    }

    private static string ComputeSha256Hash(string rawData)
	{
		using SHA256 sHA = SHA256.Create();
		return ToHex(sHA.ComputeHash(Encoding.UTF8.GetBytes(rawData)), upperCase: false);
	}

	private static string ToHex(byte[] bytes, bool upperCase)
	{
		StringBuilder stringBuilder = new StringBuilder(bytes.Length * 2);
		for (int i = 0; i < bytes.Length; i++)
		{
			stringBuilder.Append(bytes[i].ToString(upperCase ? "X2" : "x2"));
		}
		return stringBuilder.ToString();
	}
    
}