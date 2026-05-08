import java.util.HashMap;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Collections;

// Endret navnet på klassen.
public class WordHash
{
	// Instansisrer HashMap med en String key og int value
	private HashMap<String, Integer> map;

	// Konstruktør som oppretter et tomt HashMap
	public WordHash()
	{
		map = new HashMap<>();
	}

	// Metode reutrnerer antall unike ord
	public int size()
	{
		return map.size();
	}

	// Ordene brukes til Hash indeksering og får en tilhørende verdi(antall forekomster av ordet).
	// Om ordet ikke finnes får den en ny plass i listen med verdi==1
	// Om ordet finnes, vil key bli overskrevet og verdi frekvensen får en +1 verdi.
	public void insert(String ord)
	{
		if (map.containsKey(ord))
		{
			map.put(ord.toLowerCase(), map.get(ord) + 1);
		}
		else
		{
			map.put(ord.toLowerCase(), 1);
		}
	}

	// Bruker Hash verdien til å søke etter ordert i listen.
	// Om det er en match printes ut ordet og frekvensen.
	// Om key verdien ikke finnes i listen printes at ordet ikke finnes.
	public void search(String ord)
	{
		if (map.containsKey(ord))
		{
			System.out.println(ord + ": " + map.get(ord));
		}
		else
		{
			System.out.println("'" + ord + "' finnes ikke i listen");
		}
	}

	// Lager en liste av alle ord i listen.
	// Listen sorteres for å få en alfabetisk print.
	// for loop printer ut den nye listen med tilhørende frekvens av ordet.
	public void print()
	{
		List<String> keys = new ArrayList<>(map.keySet());
		Collections.sort(keys);
		for (String ord : keys)
		{
			System.out.println(ord + ": " + map.get(ord));
		}
	}

	// Liten ekstra løsning som printer ut en liste over hvilke filer som er tilgjengelige.
	public static void fileList()
	{
		String dirPath = "data/";
		File dir = new File(dirPath);
		File[] files = dir.listFiles();
		if (files != null)
		{
			for (File file : files)
			{
				String filename = file.getName();
				int dot = filename.lastIndexOf(".");
				if (dot > 0)
				{
					filename = filename.substring(0, dot);
				}
				System.out.println(filename);
			}
		}
	}



	// Main programmet.
	public static void main(String[] args)
	{
		// Spør om bruker ønsker en liste over tilgjengelige filer.
		// I dette tilfellet vil alle andre valg enn y bli tolket som n.
		Scanner scan = new Scanner(System.in);
		System.out.println("List files?(y/n) ");
		String fList = scan.next();
		if(fList.equals("y"))
		{
			fileList();
		}
		
		// Spør bruker om ønsket fil.
		// Gjorde en liten endring i WordReader, slik at filnavn skrives inn uten fil suffix.
		System.out.println("File name? ");
		String filename = scan.next();

		// Leser inn fil
		WordReader wR = new WordReader(filename);
		// Oppretter HashMap
		WordHash H = new WordHash();

		// Setter ord fra fil inn i HashMap
		String ord = wR.nextWord();
		while (ord != null)
		{
			H.insert(ord);
			ord = wR.nextWord();
		}

		// Skriver ut antallet unike ord fra filen.
		System.out.println(H.size() + " unique words read from file " + filename);

		// Meny er lik som før, bare med kall mot HashMap istedet.
		int valg = 0;
		while (valg != 3)
		{
			System.out.println("\n1: Search, 2: Print, 3: Quit ? ");
			valg = scan.nextInt();
			if (valg == 1)
			{
				System.out.print("Search for? ");
				ord = scan.next();
				H.search(ord.toLowerCase());
			}
			else if (valg == 2)
			{
				H.print();
			}
		}
		scan.close();
	}
}