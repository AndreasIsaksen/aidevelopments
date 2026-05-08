import java.io.*;
import java.util.Scanner;

// WordBST: Binært søketre med ord og ordfrekvenser
public class WordBST
{
    // WordNode: Indre klasse for en node i søketreet
    class WordNode
    {
	String ord;
	int frekvens;
	WordNode venstre, høyre;

	WordNode(String ord) {
		this.ord = ord;
		this.frekvens = 1;
		this.venstre = null;
		this.høyre = null;
	}

	void print() {
		System.out.println(ord + ": " + frekvens);
	}
    }
    
    private WordNode rot; // Roten i hele søketreet
    private int n;        // Antall noder i hele treet

    // WordBST(): Konstruktør som lager et tomt søketre
    public void WordBST()
    {
	rot = null;
	n = 0;
    }

    // size(): Antall ord som er lagret i treet
    public int size()
    {
	return n;
    }

    // insert(): Setter inn ny forekomst av et ord
    public void insert(String ord)
    {
		rot = insertRekursivt(rot, ord);
	}

// Rekursiv innsetting
private WordNode insertRekursivt(WordNode node, String ord) {
    // Basis-tilfelle: Hvis vi har nådd et nullpunkt i treet, sett inn ny node
    if (node == null) {
        n++; // Øk antall unike ord
        return new WordNode(ord);
    }

    // Hvis ordet allerede finnes, øk frekvensen
    if (ord.equals(node.ord)) {
        node.frekvens++;
    }
    // Hvis ordet er alfabetisk mindre, gå til venstre barn
    else if (ord.compareTo(node.ord) < 0) {
        node.venstre = insertRekursivt(node.venstre, ord);
    }
    // Hvis ordet er alfabetisk større, gå til høyre barn
    else {
        node.høyre = insertRekursivt(node.høyre, ord);
    }

    return node; // Returner den (mulig oppdaterte) noden
}

    // search(): Søk etter et ord. Skriv ut ordet og ordfrekvensen
    // hvis det finnes i søketreet.
	public void search(String ord) {
		WordNode current = rot; // Start søket fra roten
	
		while (current != null) {
			if (ord.equals(current.ord)) {
				// Hvis ordet er funnet, skriv det ut med frekvensen
				System.out.println(current.ord + ": " + current.frekvens);
				return; // Avslutt søket
			}
			// Gå til venstre subtre hvis ordet er mindre (alfabetisk)
			else if (ord.compareTo(current.ord) < 0) {
				current = current.venstre;
			}
			// Gå til høyre subtre hvis ordet er større (alfabetisk)
			else {
				current = current.høyre;
			}
		}
		// Hvis vi kommer hit, er ordet ikke i treet. Ingen utskrift.
	}
		
    // print(): Alfabetisk utskrift av hele søketreet. Kaller en
    // rekursiv metode som gjør selve utskriften.
    public void print()
    {
	print(rot);
    }

    // print(): Rekursiv utskrift av hele søketreet med rot i "rot"
    private void print(WordNode node)
    {
		if (node == null) {
			return; // Hvis noden er null, stopp rekursjonen.
		}
	
		print(node.venstre); // Gå til venstre subtre.
		node.print();        // Skriv ut ordet og frekvensen.
		print(node.høyre);   // Gå til høyre subtre.
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
