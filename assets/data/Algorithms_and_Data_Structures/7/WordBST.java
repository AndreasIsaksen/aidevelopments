import java.util.Scanner;
import java.util.TreeMap;
import java.util.Map;

// WordBST: Binært søketre med ord og ordfrekvenser
public class WordBST
{
	// Klasse variabel som holder på ord og frekvens
    private Map<String, Integer> wordMap;

	// Konstruktør for et TreeMap objekt
	public WordBST()
	{
		wordMap = new TreeMap<>();
	}

	// Metode som henter ut antall noder i treet.
    public int size()
	{
		return wordMap.size();
	}

    // insert(): Setter inn ny forekomst av et ord
    public void insert(String ord)
    {
		wordMap.put(ord, wordMap.getOrDefault(ord, 0) +1 );
	}

    // search(): Søk etter et ord. Skriv ut ordet og ordfrekvensen
    // hvis det finnes i søketreet.
	public void search(String ord)
	{
		Integer frekvens = wordMap.get(ord);
		if (frekvens != null)
		{
			System.out.println(ord + ": " + frekvens);
		}
	}
		
    // print(): Alfabetisk utskrift av hele søketreet. Kaller en
    // rekursiv metode som gjør selve utskriften.
    public void print()
    {
		for (Map.Entry<String, Integer> entry : wordMap.entrySet())
		{
			System.out.println(entry.getKey() + ": " + entry.getValue());
		}
    }

    // main(): Testprogram
    public static void main (String argv[])
    {
	// Leser filnavn fra bruker
	Scanner scan = new Scanner(System.in);
	System.out.print("File? ");
	String fileName = scan.next();

	// Oppretter ordleser og tomt søketre
	WordReader wR = new WordReader(fileName);
	WordBST wBST = new WordBST();

	// Leser alle ordene på filen og legger inn i treet
	String ord = wR.nextWord();
	while (ord != null)
	{
	    wBST.insert(ord);
	    ord = wR.nextWord();
	}
	// Skriver ut antall ulike ord som fantes i filen
	System.out.println(wBST.size() + " unique words " +
                    "read from file " + fileName);

	// Menyvalg for å teste programmet
	int valg = 0;
	while(valg != 3)
	{
	    System.out.print("\n1:Search, 2:Print, 3:Quit ? ");
	    valg = scan.nextInt();
	    if (valg == 1)
	    {
		System.out.print("Search for? ");
		ord = scan.next();
		wBST.search(ord.toLowerCase());
	    }
	    else if (valg == 2)
		wBST.print();
	}
    }
}
